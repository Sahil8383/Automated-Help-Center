import React from "react";
import ChatBot from "./components/ChatBot";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ecommerce from "./components/Ecommerce";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ChatBot />} />
            <Route path="/ecommerce" element={<Ecommerce/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
