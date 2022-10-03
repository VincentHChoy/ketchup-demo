import React, { useEffect, useRef, useState } from "react";
import { auth, firebase, firestore } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { HiOutlineMicrophone } from "react-icons/hi";
import { AiFillDownCircle } from "react-icons/ai";
import { useParams, useLocation } from "react-router-dom";
import { collection, addDoc, setDoc, getDoc } from "firebase/firestore";


import ChatMessage from "../ChatMessage/ChatMessage";
import Sidebar from "../Sidebar/Sidebar";
import Button from "../Button/Button";
import "./ChatRoom.css";

import { useSpeechToText } from "./useSpeechToText";
import TextareaAutosize from "react-textarea-autosize";
import { useSelector } from "react-redux";


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
  const location = useLocation();
  const { chatId } = useParams();
  const [formValue, setFormValue] = useState("");
  const [messages, setMessages] = useState(null);

  const { startRecording, stopRecording, results, isRecording } =
    useSpeechToText();
  //firestore ref and query parameters
  const messagesRef = collection(firestore, "message");

  React.useEffect(() => {
    setFormValue(results);
  }, [results]);

  useEffect(() => {
    const unsub = firestore
      .collection("message")
      .orderBy("createdAt")
      .limit(10000)
      .onSnapshot((snap) => {
        let messages = [];
        snap.forEach((doc) => {
          messages.push(doc.data());
        });
        setMessages(filterMessages(messages));
        scrollToBottom();
      });

    return unsub;
  }, [location]);

  //focus on input box on load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  //add user on load
  useEffect(() => {
    const chatIdQuery = firestore.collection("chats").where("cid", "==", chatId);
    const { uid } = auth.currentUser;
    const chatQuery = chatIdQuery.get().then(async (querySnapshot) => {
      const snapshot = querySnapshot.docs[0]; // use only the first document, but there could be more
      const chatRef = snapshot.ref; // now you have a DocumentReference
      const chatSnap = await getDoc(chatRef);
      if (chatSnap.data().users.length < 2 && chatSnap.data().users[0] !== uid){
        await setDoc(
          chatRef,
          {
            users: [...chatSnap.data().users, uid]
          },
          { merge: true }
        );
      }
    });
  }, []);

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
  const chatVisible = useSelector((state) => state.toggleChat);
  const chatResize = chatVisible ? "w-2/3" : "";
  const inputResize = chatVisible ? "w-4/6" : "";

  return (
    <main className="chatroom">
      <main className={`chat ${chatResize}`}>
        <Sidebar />
        {messages &&
          messages.map((msg, index) => (
            <ChatMessage
              key={msg.id}
              previousMessage={messages[index - 1]}
              message={msg}
            />
          ))}
        <div ref={dummy}></div>

        <div
          className="fixed bottom-0 left-20 ml-5 mb-0 text-2xl pb-5 bg-white w-screen"
          onSubmit={sendMessage}
        >
          {isRecording && <div className="spin"></div>}

          <section
            className={`flex content-center justify-center ${inputResize}`}
          >
            <button
              className="icon fixed left-40 bottom-5 animate-bounce"
              onClick={scrollToBottom}
            >
              <AiFillDownCircle size={28} />
            </button>

            <TextareaAutosize
              value={formValue}
              onChange={(event) => setFormValue(event.target.value)}
              placeholder="ketchup message..."
              maxRows={5}
              style={{ resize: "none" }}
              className="input-message"
            />

            <button
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
              style={{ opacity: isRecording ? 1 : 0.5 }}
              className="mr-5 ml-5 text-red-500"
            >
              <HiOutlineMicrophone size={28} />
            </button>
            <Button
              style={{
                opacity: formValue ? 1 : 0.5,
                "pointer-events": formValue ? "auto" : "none",
              }}
              message={"Submit"}
              handleClick={sendMessage}
            />
          </section>
        </div>
      </main>
    </main>
  );
};
export default ChatRoom;
