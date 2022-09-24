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

import { useSpeechToText } from "./useSpeechToText";


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


  const { startRecording, stopRecording, results, isRecording } = useSpeechToText();
  //firestore ref and query parameters
  const messagesRef = collection(firestore, "message");

  React.useEffect(() => {
    setFormValue(results);
  }, [results])


  // const readData = async () => {
  //   // attempts to fetch data for the referenced chart
  //   let messages = [];
  //   const q = query(collection(firestore, "message"), orderBy("createdAt"));
    
  //   const querySnapshot = await getDocs(q);

  //   querySnapshot.forEach((doc) => {
  //     messages.push(doc.data());
  //   });

  //   setMessages(filterMessages(messages));
  // };

  useEffect(() => {
    const unsub = firestore.collection('message').orderBy('createdAt').limit(10000).onSnapshot((snap) => {
      let messages = []
      snap.forEach((doc) => {
        messages.push(doc.data());
        
      });
      setMessages(filterMessages(messages));
    })

    return unsub;
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
    try {
      await addDoc(messagesRef, messageData);

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
     
         
      <div
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
        
          <button  onMouseDown={startRecording} onMouseUp={stopRecording}  style={{ opacity: isRecording ? 1 : 0.5 }} className="mr-5 ml-5" >
            <svg class="h-8 w-8 text-red-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
          </svg>
          </button>
          <Button message={"Submit"} handleClick={sendMessage} />
           
        </section>
      </div>
    </main>
  );
};
export default ChatRoom;
