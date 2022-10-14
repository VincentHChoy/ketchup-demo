import React from "react";
import { auth, firestore } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, doc } from "firebase/firestore";
import Button from "../../Button/Button";

const FALLBACK_PHOTO_URL =
  "https://4.bp.blogspot.com/-NiUcogaBYrk/UioQgTmkGuI/AAAAAAAAClg/YOdyn5RB4W4/s1600/minion_icon_image_picfishblogspotcom+%25287%2529.png";

function Home() {


  const { photoURL, displayName, uid } = auth.currentUser;
  const navigate = useNavigate();

  const createChat = async () => {
    // Add a new document with a generated id.
    const chatRef = doc(collection(firestore, "chats"));
    await addDoc(collection(firestore, "chats"), {
      cid: chatRef.id,
      users: [uid],
      lastMessage: '',
      messageTimeStamp: null,
      docId:null,
      sheetsId: null
    });

   const link = `/chat/${chatRef.id}`;
    navigate(link);
  };


  return (
    <section className="flex flex-col justify-center items-center place-content-center space-y-5 mt-52">
      <h1 className="font-sans text-6xl font-bold ">Ketch Up</h1>
      <h1 className="font-sans text-2xl animate-fade-in-down-1">
        {" "}
        Hello {displayName}!
      </h1>
      <h1 className="font-sans text-xl animate-fade-in-down-2">
        {" "}
        Ready to Ketch Up?
      </h1>

      <span className="relative inline-flex">
        {photoURL ? (
          <img
            alt="pic"
            className="rounded-full w-32 shadow-lg"
            src={photoURL || FALLBACK_PHOTO_URL}
            referrerPolicy="no-referrer"
          />
        ) : null}
        <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3  bg-green-500"></span>
        </span>
      </span>

      <section className="flex flex-col content-center justify-center mt-24">
        <Button
          handleClick={createChat}
          message={"Start Collaborating"}
        />
      </section>
    </section>
  );
}
export default Home;
