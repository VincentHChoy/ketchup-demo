import { gapi } from "gapi-script";
import { activeDocs, setDocId } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { setDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import React, { useState } from "react";
import Button from "../Button/Button";
import { AiOutlineCloseCircle } from "react-icons/ai";

function Docs(props) {
  const cid = useSelector((state) => state.cid);
  const isDocId = useSelector((state) => state.docId);
  const dispatch = useDispatch();
  const [link, setLink] = useState("");
  const [demoAlert, setDemoAlert] = useState(false);
  const docIdQuery = firestore.collection("chats").where("cid", "==", cid);

  const dbSetDocId = async (googleDocId) => {
    const docId = docIdQuery.get().then(async (querySnapshot) => {
      if (!querySnapshot.empty) {
        const snapshot = querySnapshot.docs[0]; // use only the first document, but there could be more
        const documentRef = snapshot.ref; // now you have a DocumentReference
        await setDoc(
          documentRef,
          {
            docId: googleDocId,
          },
          { merge: true }
        );
      }
    });
  };

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

        //gets doc Id and sets it
        dbSetDocId(val.documentId);
      });
  };

  const existingLink = (link) => {
    const docId = link
      .replace("https://docs.google.com/document/d/", "")
      .replace("/edit", "");
    dispatch(setDocId(docId));
    dbSetDocId(docId);
  };

  const clearId = () => {
    dispatch(setDocId(""));
    dbSetDocId("");
  };

  return (
    <>
      <main className="flex justify-center items-center">
        {props.signedIn && !isDocId && (
          <div className="h-72 flex flex-col justify-evenly items-center flex-1">
            <Button
              handleClick={() => {
                setDemoAlert(!demoAlert);
              }}
              message={`Create new Google document`}
            />
            {demoAlert && (
              <p>
                For demo purposes creating a document is not avaliable, click{" "}
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
              message={`Use exisiting Google document`}
            />
            {props.inputState && (
              <>
                <input
                  className="w-96 my-5 text-base text-black outline-none border-b-2 border-primary"
                  placeholder="https://docs.google.com/document/d/:docId/edit"
                  onChange={(e) => setLink(e.target.value)}
                />
                <Button handleClick={existingLink(link)} message={"Set"} />
              </>
            )}
          </div>
        )}
      </main>
      {isDocId && props.signedIn && (
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
            src={`https://docs.google.com/document/d/${isDocId}/edit`}
            title="Google Docs"
          ></iframe>
        </>
      )}
    </>
  );
}

export default Docs;
