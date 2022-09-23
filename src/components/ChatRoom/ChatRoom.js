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

import { useSpeechToText  } from "./useSpeechToText";

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

  const handleRecordButtonClick = () => {
    onmousedown = startRecording;
    onmouseup = stopRecording;
  }

  const readData = async () => {
    // attempts to fetch data for the referenced chart
    let messages = [];
    const q = query(collection(firestore, "message"), orderBy("createdAt"));
    
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      messages.push(doc.data());
    });

    setMessages(filterMessages(messages));
  };

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
        
           <button onClick={handleRecordButtonClick} style={{ opacity: isRecording ? 1 : 0.5 }} className="mr-5 ml-5"> <svg class="h-8 w-8 text-black"   fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
           </svg></button>
          <Button message={"Submit"} type="submit" />
           
        </section>
      </form>
    </main>
  );
};
export default ChatRoom;
