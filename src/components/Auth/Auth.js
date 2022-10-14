
import React, { useState } from "react";
import Docs from "../Iframe/Docs";
import Sheets from "../Iframe/Sheets";

function Auth(props) {
  const [signedIn, setSignedIn] = useState(false);
  const [toggleInput, setToggleInput] = useState(false)

  return (
    <>
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
