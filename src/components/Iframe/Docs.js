import { gapi } from "gapi-script";
import { activeDocs, setDocId } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { setDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import React from "react";
import Button from "../Button/Button";
import LogIn from "../Login/Login";
import LogOut from "../Logout/Logout";

function Docs(props) {
  const cid = useSelector((state) => state.cid);
  const isDocId = useSelector((state) => state.docId);
  const dispatch = useDispatch();

  const createFile = () => {
    const accessToken = gapi.auth.getToken().access_token;
    fetch(props.route, {
      method: "POST",
      headers: new Headers({ Authorization: "Bearer " + accessToken }),
    })
      .then((res) => {
        return res.json();
      })
      .then(async (val) => {
        dispatch(setDocId(val.documentId));

        //gets doc Id
        const docIdQuery = firestore
          .collection("chats")
          .where("cid", "==", cid);
        const docId = docIdQuery.get().then(async (querySnapshot) => {
          if (!querySnapshot.empty) {
            const snapshot = querySnapshot.docs[0]; // use only the first document, but there could be more
            const documentRef = snapshot.ref; // now you have a DocumentReference
            await setDoc(
              documentRef,
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
        {props.signedIn && !isDocId && (
          <div className="h-72 flex flex-col justify-evenly items-center flex-1">
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
      {isDocId && props.signedIn && (
        <iframe
          style={{ marginLeft: "80px", width: "100%", height: "100vh" }}
          className="googleweb"
          src={`https://docs.google.com/document/d/${isDocId}/edit`}
          title="Google Docs"
        ></iframe>
      )}
    </>
  );
}

export default Docs;
