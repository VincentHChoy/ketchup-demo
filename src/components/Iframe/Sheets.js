import { gapi } from "gapi-script";
import React from "react";
import Button from "../Button/Button";
import LogIn from "../Login/Login";
import LogOut from "../Logout/Logout";
import {  activeSheets, setSheetsId } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

function Docs(props) {

  const activeSheet = useSelector((state) => state.isSheets);
  const isSheetsId = useSelector((state) => state.sheetsId);
  const dispatch = useDispatch();

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
        dispatch(activeSheets());
        dispatch(setSheetsId(val.spreadsheetId));
      });
  };

  return (
    <>
      <main className="flex justify-center items-center h-screen">
        {props.signedIn && !activeSheet && (
          <div className="h-72 flex flex-col justify-evenly items-center">
            <Button
              handleClick={createFile}
              message={`Create new Google document`}
            />
            <Button
              handleClick={""}
              message={`Use exisiting Google document`}
            />
          </div>
        )}
      </main>
      {props.signedIn && <LogOut />}
      {!props.signedIn && <LogIn />}
      {activeSheet && props.signedIn && (
        <iframe
          style={{ marginLeft: "80px", width: "100%", height: "100vh" }}
          className="googleweb"
          src={`https://docs.google.com/spreadsheets/d/${isSheetsId}/edit`}
          title="Google Sheets"
        ></iframe>
      )}
    </>
  );
}

export default Docs;
