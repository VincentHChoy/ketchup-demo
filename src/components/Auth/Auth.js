import { gapi } from "gapi-script";
import React, { useEffect, useState } from "react";
import LogIn from "../Login/Login";
import LogOut from "../Logout/Logout";
import Docs from "../Iframe/Docs";
import Sheets from "../Iframe/Sheets";

function Auth(props) {
  const [signedIn, setSignedIn] = useState(false);
  const [toggleInput, setToggleInput] = useState(false)

  const CLIENT_ID =
    "866320623023-drd2mfasp5obtv8get3nkhtl17gagnh2.apps.googleusercontent.com";
  const API_KEY = process.env.REACT_APP_GOOGLE_KEY;
  const SCOPES = "https://www.googleapis.com/auth/drive";

  const toggleInputBox = () =>{
    console.log('toggle input box');
    setToggleInput(!toggleInput)
  }

  useEffect(() => {
    function start() {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES,
        })
        .then(function () {
          setSignedIn(gapi.auth2.getAuthInstance().isSignedIn.get());
          gapi.auth2.getAuthInstance().isSignedIn.listen(checkSignedIn);
        });
    }

    gapi.load("client:auth2", start);
  }, [signedIn]);

  const checkSignedIn = () => {
    setSignedIn(gapi.auth2.getAuthInstance().isSignedIn.get());
  };

  return (
    <>
      {signedIn && <LogOut />}
      {!signedIn && <LogIn />}
      {props.doc && 
      <Docs 
        signedIn={signedIn}
        route={props.route}
        toggleInputBox={toggleInputBox}
        inputState={toggleInput}
        />}
      {props.sheet &&
        <Sheets
          signedIn={signedIn}
          route={props.route} 
          toggleInputBox={toggleInputBox}
          inputState={toggleInput}
          />}
    </>
  );
}

export default Auth;
