import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatRoom from "../../components/ChatRoom/ChatRoom";
import Sidebar from "../Sidebar/Sidebar";
import HomePage from "./Pages/index";
import './Pages/Home.css'
import GoogleAuth from "../GoogleAuth/GoogleAuth";

function Home() {

  return (
    <main style={{width:'100%', height: '100%', overflow: 'visible'}}className="flex flex-row justify-center item-center">
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="chat" element={<ChatRoom />} />
        <Route path="/chat/:chatId" element={<ChatRoom />} />
        <Route path="docs" element={<GoogleAuth/>

          // <iframe style={{ marginLeft: '80px', width: '100%', height: '100vh' }} class='googleweb' src="https://docs.google.com/document/d/1TbQXeYswsVU67zXm8MCco2a38bjo_o-1kC-al4kvuqg/edit" title="Google Docs"></iframe>

        } />

        <Route path="sheets" element={

          <iframe style={{ marginLeft: '80px', width: '100%', height: '100vh' }} class='googleweb' src="https://docs.google.com/spreadsheets/d/1afkoYrMWjT6DzmVvslWtReYWEDRqw13H7LP-Sz8f09M/edit#gid=0" title="Google Sheets"></iframe>

        } />
      </Routes>
    </main>
  );
}

export default Home;
