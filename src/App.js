import React from "react";
// import './App.css';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
// import { async } from "@firebase/util";
// import { waitForPendingWrites } from "firebase/firestore";
import {auth } from "./firebase";
import SignIn from "./components/SignIn/SignIn";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./components/Home/Home";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header></header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}


export default App;
