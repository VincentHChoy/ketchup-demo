import React, { useRef, useState } from "react";
import { auth, firebase, firestore } from '../../firebase'
import { useCollectionData } from "react-firebase-hooks/firestore";
import SignOut from '../SignOut/SignOut'
import ChatMessage from '../ChatMessage/ChatMessage'


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    //create new document in firestore
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {SignOut()}
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <div ref={dummy}></div>
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(event) => setFormValue(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
export default ChatRoom