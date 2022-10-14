import { gapi } from "gapi-script";
import { firestore } from "../../firebase";
import { activeSheets, setSheetsId } from "../../actions";
import { setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import Button from "../Button/Button";
import { AiOutlineCloseCircle } from "react-icons/ai";

function Sheets(props) {
  const isSheetsId = useSelector((state) => state.sheetsId);
  const cid = useSelector((state) => state.cid);
  const dispatch = useDispatch();
  const [link, setLink] = useState("");
  const [demoAlert, setDemoAlert] = useState(false);
  const sheetIdQuery = firestore.collection("chats").where("cid", "==", cid);

  const dbSetDocId = async (googleSheetId) => {
    const sheetId = sheetIdQuery.get().then(async (querySnapshot) => {
      if (!querySnapshot.empty) {
        const snapshot = querySnapshot.docs[0]; // use only the first document, but there could be more
        const sheetsRef = snapshot.ref; // now you have a DocumentReference
        await setDoc(
          sheetsRef,
          {
            sheetsId: googleSheetId,
          },
          { merge: true }
        );
      }
    });
  };

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
        dispatch(setSheetsId(val.spreadsheetId));

        //gets sheet Id and sets sheet Id in db
        dbSetDocId(val.spreadsheetId);
      });
  };

  const clearId = () => {
    dispatch(setSheetsId(''));
    dbSetDocId('');
  };

  const existingLink = (link) => {
    const sheetId = link
      .replace("https://docs.google.com/spreadsheets/d/", "")
      .replace("/edit#gid=0", "");
    dispatch(setSheetsId(sheetId));
    dbSetDocId(sheetId);
  };

  return (
    <>
      <main className="flex justify-center items-center">
        {props.signedIn && !isSheetsId && (
          <div className="h-72 flex flex-col justify-evenly items-center">
            <Button
              handleClick={() => {
                setDemoAlert(!demoAlert);
              }}
              message={`Create new Google sheet`}
            />
            {demoAlert && (
              <p>
                For demo purposes creating a sheet is not avaliable, click{" "}
                <a
                  className="text-blue-500"
                  href="https://github.com/VincentHChoy/ketchup-demo#demo-changes"
                >
                  here
                </a>{" "}
                for more information
              </p>
            )}
            <Button
              handleClick={props.toggleInputBox}
              message={`Use exisiting Google sheet`}
            />
            {props.inputState && (
              <>
                <input
                  className="w-96 my-5 text-base text-black outline-none border-b-2 border-primary"
                  placeholder="https://docs.google.com/spreadsheets/d/:sheetId/edit#gid=0"
                  onChange={(e) => setLink(e.target.value)}
                />
                <Button
                  handleClick={() => {
                    existingLink(link);
                  }}
                  message={"Set"}
                />
              </>
            )}
          </div>
        )}
      </main>
      {/* {props.signedIn && <LogOut />}
      {!props.signedIn && <LogIn />} */}
      {isSheetsId && props.signedIn && (
        <>
          <button
            onClick={clearId}
            className="bg-secondary text-primary hover:bg-primary hover:text-secondary rounded-3xl fixed left-24 top-2"
          >
            <AiOutlineCloseCircle size={19} />
          </button>

          <iframe
            style={{ marginLeft: "80px", width: "100%", height: "100vh" }}
            className="googleweb"
            src={`https://docs.google.com/spreadsheets/d/${isSheetsId}/edit`}
            title="Google Sheets"
          ></iframe>
        </>
      )}
    </>
  );
}

export default Sheets;
