import React, { useEffect } from "react";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import SignIn from "./components/SignIn/SignIn";
import Home from "./components/Home/Home";
import { BrowserRouter } from "react-router-dom";
import LogIn from "./components/Login/Login";
import LogOut from "./components/Logout/Logout";
import { gapi } from "gapi-script";

function App() {
  
  const [user] = useAuthState(auth);
  const CLIENT_ID = "866320623023-g7mi0qumj5o3rjaedn9ciirsnft8n4eb.apps.googleusercontent.com";
  const API_KEY = "AIzaSyDPRc79fqSHurxm6_3RWiNSiOappeu80YU";
  const SCOPES = "https://www.googleapis.com/auth/drive"

  useEffect(() => {
    function start(){
      gapi.client.init({
        apiKey:API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES
      })
    }

    gapi.load('client:auth2',start)

  })

  function createFile(tag){
    const accessToken = gapi.auth.getToken().access_token;
    const fileName = tag + "Hello world"
    fetch('https://docs.googleapis.com/v1/documents?title=' + fileName, {
      method: "POST",
      headers: new Headers({ 'Authorization': 'Bearer ' + accessToken})
    }).then((res)=>{
      return res.json()
    }).then((val)=>{
      console.log(val);
      console.log(val.documentId);
    })
  }

  return (
    <div className="App">
      <BrowserRouter>
        <header></header>
        <section>{user ? <Home /> : <SignIn />}</section>
      </BrowserRouter>
      <LogIn />
      <LogOut />
      <button onClick={() => createFile('CPTS 223')}>create CPTS 233 notes</button>
    </div>
  );
}

export default App;
