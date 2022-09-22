import React, { useEffect } from "react";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import SignIn from "./components/SignIn/SignIn";
import Home from "./components/Home/Home";
import { BrowserRouter } from "react-router-dom";


function App() {
  
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <BrowserRouter>
        <header></header>
        <section>{user ? <Home /> : <SignIn />}</section>
      </BrowserRouter>
    </div>
  );
}

export default App;
