import { gapi } from "gapi-script";
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import LogIn from "../Login/Login";
import LogOut from "../Logout/Logout";

function Auth(props) {
  const [signedIn, setSignedIn] = useState(false);
  const [createdFile, setCreatedFile] = useState(false);
  const [fileId, setFileId] = useState(false);
  const CLIENT_ID =
    "866320623023-g7mi0qumj5o3rjaedn9ciirsnft8n4eb.apps.googleusercontent.com";
  const API_KEY = process.env.REACT_APP_GOOGLE_KEY;
  const SCOPES = "https://www.googleapis.com/auth/drive";

  const createFile = (tag) => {
    const accessToken = gapi.auth.getToken().access_token;
    fetch(props.route, {
      method: "POST",
      headers: new Headers({ Authorization: "Bearer " + accessToken }),
    })
      .then((res) => {
        return res.json();
      })
      .then((val) => {

        if (val.documentId) setFileId(val.documentId);
        if (val.spreadsheetId) setFileId(val.spreadsheetId);
        setCreatedFile(true);

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
            message={"Create new Google Sheet"}
          />
        )}
      </div>
      {signedIn && <LogOut />}
      {!signedIn && <LogIn />}
      {createdFile && signedIn &&(
        <iframe
          style={{ marginLeft: "80px", width: "100%", height: "100vh" }}
          className="googleweb"
          src={`https://docs.google.com/${props.type}/d/${fileId}/edit`}
          title="Google Docs"
        ></iframe>
      )}
    </>
  );
}

export default Auth;
