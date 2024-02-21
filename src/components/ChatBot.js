import React from "react";
import History from "./History";

const Chat = () => {
  return (
    <>
      <div class="flex h-screen overflow-hidden">
        <div class="w-1/4 bg-white border-r border-gray-300">
          <header class="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
            <h1 class="text-2xl font-semibold">Chat Web</h1>
          </header>

          <div class="overflow-y-auto h-screen p-3 mb-9 pb-20">
            <History />
          </div>
        </div>

        <div class="flex-1">
          <header class="bg-white p-4 text-gray-700">
            <h1 class="text-2xl font-semibold">Alice</h1>
          </header>

          <div class="h-screen overflow-y-auto p-4 pb-36">
            <div class="flex mb-4 cursor-pointer">
              <div class="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                <img
                  src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="User Avatar"
                  class="w-8 h-8 rounded-full"
                />
              </div>
              <div class="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                <p class="text-gray-700">Hey Bob, how's it going?</p>
              </div>
            </div>

            <div class="flex justify-end mb-4 cursor-pointer">
              <div class="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                <p>
                  Hi Alice! I'm good, just finished a great book. How about you?
                </p>
              </div>
              <div class="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                <img
                  src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="My Avatar"
                  class="w-8 h-8 rounded-full"
                />
              </div>
            </div>
          </div>

          <footer class="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
            <div class="flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                class="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button class="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
                Send
              </button>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Chat;
