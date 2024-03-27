import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import History from "./History";
import IntentCard from "./IntentCard";

const systemMessage =
	"You are Kelly Bot! An AI assistant for the Dunder Mifflin Infinity Ecommerce Store. Dunder Mifflin is a paper company. You must help the users by answering their queries. Pay close attention to their previous instructions and responses for context and judje their intent.";
const toggleHistory = true;

const Chat = () => {
	const [intentData, setIntentData] = useState({
		name: "INVOICE",
		message: "View your invoice",
	});
	const [error, setError] = useState(null);
	const [messages, setMessages] = useState([
		{
			type: "ai",
			message: "Hello! How may I help you?",
			recorded: false,
		},
		// {
		// 	type: "user",
		// 	message: "I am a dumb user!",
		// },
	]);
	const [userInput, setUserInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchIntentData = async () => {
			try {
				const response = await fetch("API_ENDPOINT");
				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}
				const data = await response.json();
				setIntentData(data);
			} catch (error) {
				setError(error.message);
			}
		};

		fetchIntentData();
	}, []);

	return (
		<>
			<div className="flex h-screen overflow-hidden">
				<div className="flex-1">
					<header className="bg-white p-4 text-gray-700">
						<h1 className="text-2xl font-semibold">
							Dunder Mifflin Infinity (Kelly Bot)
							{isLoading && (
								<span className="text-gray-500 italic text-2xl inline-block px-5">
									Typing...
								</span>
							)}
						</h1>
					</header>

					<div className="h-screen overflow-y-auto p-4 pb-36">
						{/* <AiMessage message={"Hello! How may I help you?"} />

						<UserMessage message={"I am a dumb user!"} /> */}

						{messages.map((message, index) => {
							if (message.type === "ai") {
								return (
									<AiMessage
										message={message.message}
										intent={message.intent}
										recorded={message.recorded}
										messages={messages}
										totalMessages={messages.length}
										index={index}
										key={index}
									/>
								);
							} else {
								return (
									<UserMessage
										message={message.message}
										key={index}
									/>
								);
							}
						})}

						{/* <IntentCard intent={intentData} /> */}
					</div>

					<footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-full">
						<div className="flex items-center">
							<input
								type="text"
								id="userInput"
								placeholder="Type a message..."
								className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
								value={userInput}
								autoComplete="off"
								onChange={(e) => setUserInput(e.target.value)}
							/>
							<button
								className={`${
									!userInput || isLoading
										? "bg-gray-500"
										: "bg-indigo-500"
								}  text-white px-4 py-2 rounded-md ml-2`}
								disabled={!userInput || isLoading}
								onClick={async () => {
									if (!userInput) return;
									if (isLoading) return;

									setIsLoading(true);
									try {
										setMessages([
											...messages,
											{
												type: "user",
												message: userInput,
												recorded: true,
											},
										]);
										setUserInput("");

										// send user input to the server
										console.log(
											"sending user input to the server"
										);
										const history = messages
											.filter((msg) => msg.recorded)
											.map((msg) => {
												if (msg.type === "ai")
													return `###Response: ${msg.message}####Intent: ${msg.intent}\n`;
												else
													return `###Instruction: ${msg.message}\n`;
											})
											.join("");

										const prompt = `${systemMessage}${
											toggleHistory ? history : ""
										}\n###Instruction: ${userInput}\n###Response: `;

										console.log(prompt);
										const response = await axios.post(
											`${
												localStorage.AIURL ||
												"http://localhost:8000/ai"
											}`,
											{ prompt }
										);
										const data = response.data;
										console.log(data);
										const aiResponse = data.response;
										const aiReply = aiResponse
											.split("###Response:")
											.slice(-1)[0]
											.split("###")[0]
											.trim();
										const aiIntent = aiResponse
											.split("###Response:")
											.slice(-1)[0]
											.split("###Intent:")
											.slice(-1)[0]
											.trim();

										console.log({ aiReply, aiIntent });

										setMessages((prevState) => [
											...prevState,
											{
												type: "ai",
												message: aiReply,
												intent: aiIntent,
												recorded: true,
											},
										]);

										console.log(data);
									} catch (error) {
										console.error(error);
										alert("something went wrong");
									} finally {
										setIsLoading(false);
										// user focus on #userInput
										document
											.getElementById("userInput")
											.focus();
									}
								}}
							>
								Send
							</button>
						</div>
					</footer>
				</div>
			</div>
		</>
	);
};

const AiMessage = ({
	message,
	intent,
	recorded,
	history,
	totalMessages,
	index,
}) => {
	return (
		<>
			<div className="flex mb-4">
				<div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
					<img
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUwYLT6QJDE4G0JHfEhqhd8aNTP_2h2Hz3VA&usqp=CAU"
						alt="User Avatar"
						className="w-8 h-8 rounded-full"
					/>
				</div>
				<div className="flex-1 no-max-w-96 bg-white rounded-lg p-3 gap-3">
					<p className="text-gray-700">{message}</p>
					{recorded && index === totalMessages - 1 && (
						<button className="inline-block bg-indigo-500 text-white px-4 py-2 rounded-md mt-2">
							Escalate {intent}
						</button>
					)}
				</div>
			</div>
		</>
	);
};

const UserMessage = ({ message }) => (
	<>
		<div className="flex justify-end mb-4">
			<div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
				<p>{message}</p>
			</div>
			<div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
				<img
					src="https://external-preview.redd.it/zwxkNhLpQCbhgqMS1yF1AESF_5y7unCmDy24e6pNliQ.jpg?auto=webp&s=6df3272f7301b39af1dc8dab07b7e5f4fcddd2d7"
					alt="My Avatar"
					className="w-8 h-8 rounded-full"
				/>
			</div>
		</div>
	</>
);

export default Chat;
