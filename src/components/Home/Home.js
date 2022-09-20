import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatRoom from "../../components/ChatRoom/ChatRoom";
import Sidebar from "../Sidebar/Sidebar";
import HomePage from "./Pages/index";

function Home() {
  return (
    <main className="flex flex-row justify-center item-center">
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="chat" element={<ChatRoom />} />
        <Route path="/chat/:chatId" element={<ChatRoom />} />
        <Route path="docs" element={<div>Docs Placeholder</div>} />
        <Route path="sheets" element={<div>Sheets Placeholder</div>} />
      </Routes>
    </main>
  );
}

export default Home;
