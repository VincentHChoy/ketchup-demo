import React, { useEffect, useRef, useState } from "react";
import { auth, firebase, firestore } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { AiFillDownCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  addDoc,
} from "firebase/firestore";

import ChatMessage from "../ChatMessage/ChatMessage";
import Sidebar from "../Sidebar/Sidebar";
import Button from "../Button/Button";
import "./ChatRoom.css";

const dummyData = [
  {
    text: "hello world",
    createdAt: "september",
    uid: "111111",
    photoURL:
      "https://www.savacations.com/wp-content/uploads/2021/02/Blog-Capybara-Pantanal-Brazil3.jpg",
    displayName: "Capybara",
    cid: "bbbg",
  },
  {
    text: "hello world",
    createdAt: "september",
    uid: "mRtLOMQ8bGZcdbZFzC6phQi3n083",
    photoURL:
      "https://lh3.googleusercontent.com/a/AItbvmkIu-ES_oxt2wwInQNIKDWW1fZ62SuoPdSeHMgp=s96-c",
    displayName: "Vincent",
    cid: "bbbg",
  },
];

const ChatRoom = () => {
  //ref point for scroll to bottom
  const dummy = useRef();
  const inputRef = useRef();
  const { chatId } = useParams();
  const [formValue, setFormValue] = useState("");
  const [messages, setMessages] = useState(null);

  //firestore ref and query parameters
  const messagesRef = collection(firestore, "message");

  const readData = async () => {
    // attempts to fetch data for the referenced chart
    let messages = [];
    const q = query(collection(firestore, "message"), orderBy("createdAt"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      messages.push(doc.data());
    });
    console.log("readData loaded");
    setMessages(filterMessages(messages));
  };

  useEffect(() => {
    readData()
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const filterMessages = (messages) => {
    return messages.filter((message) => {
      return message.cid === chatId;
    });
  };

  const scrollToBottom = () => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
    console.log("scrolling to bottom");
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL, displayName } = auth.currentUser;
    const messageData = {
      text: formValue,
      createdAt: firebase.firestore.Timestamp.now(),
      uid,
      photoURL,
      displayName,
      cid: chatId,
    };
    console.log(messageData.createdAt);

    try {
      // await addDoc(messagesRef, messageData);
      console.log(messageData);
    } catch (e) {
      alert(e);
    }
    setMessages([...messages, messageData]);
    setFormValue("");
    
    setTimeout(() => {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }, 0);

  };

  return (
    <main className="chatroom">
      <main className="chat">
        <Sidebar />
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <div ref={dummy}></div>
      </main>
      <button
        className="icon fixed inset-x-0 mx-auto animate-bounce bottom-24"
        onClick={scrollToBottom}
      >
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
};
export default ChatRoom;
