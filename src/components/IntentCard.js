import React, { useState } from "react";

const IntentCard = ({ intent }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Input Value:", inputValue);
  };

  return (
    <div className="flex justify-end mb-4 cursor-pointer">
      <div className="flex flex-col max-w-96 bg-indigo-500 text-white p-3 gap-3 rounded-lg">
        <div className="flex items-center justify-center ml-2 bg-indigo-400 rounded-lg">
          <h3>{intent.name}</h3>
        </div>
        <p>{intent.message}</p>
        <div>
          {
            intent === 'Order' && (
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Give me order ID."
                className="p-2 rounded-md border border-gray-400 focus:outline-none text-black focus:border-blue-500"
              />
            )
          }
          {
            intent === 'payment_issue' && (
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Give me payment ID."
                className="p-2 rounded-md border border-gray-400 focus:outline-none text-black focus:border-blue-500"
              />
            )
          }
          {
            intent === 'Shipment' && (
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Give me shipment ID."
                className="p-2 rounded-md border border-gray-400 focus:outline-none text-black focus:border-blue-500"
              />
            )
          }
          {
            intent === 'Refund' && (
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Give me refund ID."
                className="p-2 rounded-md border border-gray-400 focus:outline-none text-black focus:border-blue-500"
              />
            )
          }
          {
            intent === 'Return' && (
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Give me return ID."
                className="p-2 rounded-md border border-gray-400 focus:outline-none text-black focus:border-blue-500"
              />
            )
          }
          {
            intent === 'Complaint' && (
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Give me complaint ID."
                className="p-2 rounded-md border border-gray-400 focus:outline-none text-black focus:border-blue-500"
              />
            )
          }
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md ml-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntentCard;
