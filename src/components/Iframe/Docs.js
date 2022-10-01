import { gapi } from "gapi-script";
import { activeDocs, setDocId } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { collection, addDoc, doc } from "firebase/firestore";
import { auth, firebase, firestore } from "../../firebase";
import React from "react";
import Button from "../Button/Button";
import LogIn from "../Login/Login";
import LogOut from "../Logout/Logout";

function Docs(props) {
  // const chatsRef = doc(firestore, "chats", cid);
  const activeDoc = useSelector((state) => state.isDoc);
  const isDocId = useSelector((state) => state.docId);
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
        dispatch(activeDocs());
        dispatch(setDocId(val.documentId));

        //     const userData = {
        //       uid: uid,
        //       img: photoURL,
        //       name: displayName,
        //       chats: []
        //     };
        //     try {
        //       await setDoc(usersRef, userData, { merge: true });
        //       console.log('something went right');
        //     } catch (e) {
        //       alert(e);
        //     }


        //   }).catch(() => {
        //     console.log('something went wrong');
        //   });
        // }
      });
  };

  return (
    <>
      <main className="flex justify-center items-center">
        {props.signedIn && !activeDoc && (
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
      {activeDoc && props.signedIn && (
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
