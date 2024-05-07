from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from peft import PeftModel
from transformers import AutoModelForCausalLM, AutoTokenizer, LlamaTokenizer, StoppingCriteria, StoppingCriteriaList, TextIteratorStreamer


model_name = "TinyPixel/Llama-2-7B-bf16-sharded"
adapters_name = "pranav301102/llma2test"

print(f"Starting to load the model {model_name} into memory")

m = AutoModelForCausalLM.from_pretrained(
    model_name,
    device_map="auto",
    # device_map={"": 0},
    torch_dtype='auto',
    offload_folder='./'
)
m = PeftModel.from_pretrained(m, adapters_name,offload_folder='./')
m = m.merge_and_unload()
tok = LlamaTokenizer.from_pretrained(model_name)
tok.bos_token_id = 1

stop_token_ids = [0]

print(f"Successfully loaded the model {model_name} into memory")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextRequest(BaseModel):
    prompt: str

@app.post("/ai/")
async def ai(text_request: TextRequest):
    try:
        prompt = text_request.prompt
        print("new prompt:",prompt)
    
        device = "cuda:0"
        inputs = tok(prompt, return_tensors="pt").to(device)
        outputs = m.generate(**inputs, max_new_tokens=300)
        response = tok.decode(outputs[0], skip_special_tokens=True)
        
        print(response)
        
        return {'prompt': prompt, 'response': response}
        # return JSONResponse(content={'prompt': prompt, 'response': response})

    except Exception as e:
        print(e)
        return {'error': str(e)}
 
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
