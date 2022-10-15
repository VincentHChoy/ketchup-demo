import React, { useEffect, useState } from "react";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import SignIn from "./components/SignIn/SignIn";
import Home from "./components/Home/Home";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const [user] = useAuthState(auth);
  const gid = useSelector((state) => state.gid);
  
  return (
    <div className="App">
      <BrowserRouter>
        <header></header>
        <section>
          {user || gid ? (
            <Home />
          ) : (
            <SignIn/>
          )}
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
