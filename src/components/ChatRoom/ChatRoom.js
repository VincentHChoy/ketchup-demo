import React, { useEffect, useRef, useState } from "react";
import { auth, firebase, firestore } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { AiFillDownCircle } from "react-icons/ai";
import { useParams } from 'react-router-dom'
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";


import ChatMessage from "../ChatMessage/ChatMessage";
import Sidebar from "../Sidebar/Sidebar";
import Button from "../Button/Button";
import "./ChatRoom.css";

const ChatRoom = () => {
  //ref point for scroll to bottom
  const dummy = useRef();
  const { chatId } = useParams();
  //firestore ref and query parameters
  const messagesRef = firestore
    .collection("message")
    const [messages, setMessages] = useState(null)

  // const messagesRef = doc(firestore, "message");

  // const query = messagesRef
  // .orderBy("createdAt").limit(1000);
  // .where("cid", "==", "bbbg")
  // .orderBy('createdAt')
  // const q = query(collection(firestore, "message"), where("cid", "==", "bbbg") )

  const readData = async () => {
    
    // attempts to fetch data for the referenced chart
    let messages = []
    const q = query(collection(firestore, "message"), orderBy("createdAt") )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      messages.push(doc.data())  
    })
    setMessages(filterMessages(messages)) 
  };

  useEffect(() => {
    readData()
  }, [messages])

  const filterMessages = (messages) => {
    return messages.filter((message) => {
      return message.cid === chatId
    })

  }

  const [formValue, setFormValue] = useState("");

  const scrollToBottom = () => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };


  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL, displayName } = auth.currentUser;
    try {
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
        displayName,
        cid: chatId
      });
    } catch (e) {
      alert(e)
    }
    setFormValue("");
    scrollToBottom();
  };




  return (
    <main className="chatroom">
      <main className="chat">
        <Sidebar />
        {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <div ref={dummy}></div>
      </main>
      <button className="icon fixed bottom-0 right-0 z-20 mr-32 mb-5 animate-bounce" onClick={scrollToBottom}>
          <AiFillDownCircle size={28} />
        </button>

        <form
          className="fixed bottom-0 left-20 ml-5 mb-0 text-2xl pb-5 bg-white w-screen"
          onSubmit={sendMessage}
        >
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
