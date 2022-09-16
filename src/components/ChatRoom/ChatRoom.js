import React, { useRef, useState } from "react";
import { auth, firebase, firestore } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

import ChatMessage from "../ChatMessage/ChatMessage";
import Sidebar from "../Sidebar/Sidebar";
import Button from "../Button/Button";

import "./ChatRoom.css";

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
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
    <main className="chatroom">
      <main className="chat">
        <Sidebar />
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

          <div ref={dummy}></div>
          

      </main>
        <form 
        className="fixed bottom-0 left-20 ml-5 mb-0 text-2xl pb-5 bg-white w-screen" 
        onSubmit={sendMessage}>
          <section className="flex content-center justify-center">
            <input
              className="input-message"
              placeholder="ketchup message..."
              value={formValue}
              onChange={(event) => setFormValue(event.target.value)}
            />
            <Button message={"Submit"} type="submit" />
          </section>
        </form>

    </main>
  );
}
export default ChatRoom;
