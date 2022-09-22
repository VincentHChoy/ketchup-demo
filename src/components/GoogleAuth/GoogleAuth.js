import { gapi } from "gapi-script";
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import LogIn from "../Login/Login";
import LogOut from "../Logout/Logout";

function GoogleAuth() {
  const [signedIn, setSignedIn] = useState(false);
  const [createdFile, setCreatedFile] = useState(false);
  const [fileId, setFileId] = useState(false);
  const CLIENT_ID =
    "866320623023-g7mi0qumj5o3rjaedn9ciirsnft8n4eb.apps.googleusercontent.com";
  const API_KEY = "AIzaSyDPRc79fqSHurxm6_3RWiNSiOappeu80YU";
  const SCOPES = "https://www.googleapis.com/auth/drive";

  const createFile = (tag) => {
    const accessToken = gapi.auth.getToken().access_token;
    const fileName = tag + "Hello world";
    fetch("https://docs.googleapis.com/v1/documents?title=KetchUp", {
      method: "POST",
      headers: new Headers({ Authorization: "Bearer " + accessToken }),
    })
      .then((res) => {
        return res.json();
      })
      .then((val) => {
        console.log(val);
        console.log(val.documentId);
        setCreatedFile(true);
        setFileId(val.documentId);

        // <iframe style={{ marginLeft: '80px', width: '100%', height: '100vh' }} class='googleweb' src="https://docs.google.com/document/d/1TbQXeYswsVU67zXm8MCco2a38bjo_o-1kC-al4kvuqg/edit" title="Google Docs"></iframe>
      });
  };

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
      <div>
        {signedIn && !createdFile && (
          <Button
            handleClick={createFile}
            message={"Create new Google Document"}
          />
        )}
      </div>
      {signedIn && <LogOut />}
      {!signedIn && <LogIn />}
      {createdFile && signedIn &&(
        <iframe
          style={{ marginLeft: "80px", width: "100%", height: "100vh" }}
          class="googleweb"
          src={`https://docs.google.com/document/d/${fileId}/edit`}
          title="Google Docs"
        ></iframe>
      )}
    </>
  );
}

export default GoogleAuth;
