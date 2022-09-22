import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatRoom from "../../components/ChatRoom/ChatRoom";
import Sidebar from "../Sidebar/Sidebar";
import HomePage from "./Pages/index";
import './Pages/Home.css'
import Auth from "../Auth/Auth";

function Home() {

  return (
    <main style={{width:'100%', height: '100%', overflow: 'visible'}}className="flex flex-row justify-center item-center">
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="chat" element={<ChatRoom />} />
        <Route path="/chat/:chatId" element={<ChatRoom />} />
        <Route path="docs" element=
        {<Auth
          route={"https://docs.googleapis.com/v1/documents?title=KetchUp"}
          type ={'document'}
        />

        } />

        <Route path="sheets" element=
          {<Auth
          route={"https://sheets.googleapis.com/v4/spreadsheets"}
          type={'spreadsheets'}
          />

          } />
      </Routes>
    </main>
  );
}

export default Home;
