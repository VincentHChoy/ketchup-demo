import { gapi } from "gapi-script";
import { firestore } from "../../firebase";
import { activeSheets, setSheetsId } from "../../actions";
import { setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import Button from "../Button/Button";
import LogIn from "../Login/Login";
import LogOut from "../Logout/Logout";

function Docs(props) {
  const activeSheet = useSelector((state) => state.isSheets);
  const isSheetsId = useSelector((state) => state.sheetsId);
  const cid = useSelector((state) => state.cid);
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

        //gets sheet Id
        const docIdQuery = firestore
          .collection("chats")
          .where("cid", "==", cid);
        const sheetId = docIdQuery.get().then(async (querySnapshot) => {
          if (!querySnapshot.empty) {
            const snapshot = querySnapshot.docs[0]; // use only the first document, but there could be more
            const sheetsRef = snapshot.ref; // now you have a DocumentReference
            await setDoc(
              sheetsRef,
              {
                docId: val.documentId,
              },
              { merge: true }
            );
          }
        });
      });
  };

  return (
    <>
      <main className="flex justify-center items-center">
        {props.signedIn && !isSheetsId && (
          <div className="h-72 flex flex-col justify-evenly items-center">
            <Button
              handleClick={createFile}
              message={`Create new Google sheet`}
            />
            <Button handleClick={""} message={`Use exisiting Google sheet`} />
          </div>
        )}
      </main>
      {props.signedIn && <LogOut />}
      {!props.signedIn && <LogIn />}
      {isSheetsId && props.signedIn && (
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
