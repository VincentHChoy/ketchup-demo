import { gapi } from "gapi-script";
import React, { useEffect, useState } from "react";
import Docs from "../Iframe/Docs";
import Sheets from "../Iframe/Sheets";

function Auth(props) {
  const [toggleInput, setToggleInput] = useState(false)

  const toggleInputBox = () =>{
    setToggleInput(!toggleInput)
  }


  return (
    <>
      {/* {signedIn && <LogOut />}
      {!signedIn && <LogIn />} */}
      {props.doc && 
      <Docs 
        route={props.route}
        toggleInputBox={toggleInputBox}
        inputState={toggleInput}
        />}
      {props.sheet &&
        <Sheets
          route={props.route} 
          toggleInputBox={toggleInputBox}
          inputState={toggleInput}
          />}
    </>
  );
}

export default Auth;
