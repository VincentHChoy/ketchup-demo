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
import { useDispatch, useSelector } from "react-redux";
import { setCID } from "../../actions";

const ChatRoom = () => {
  //ref point for scroll to bottom
  const dummy = useRef();
  const inputRef = useRef();
  const location = useLocation();
  const { chatId } = useParams();
  const [formValue, setFormValue] = useState("");
  const [messages, setMessages] = useState(null);
  const [chatRef, setChatRef] = useState(null);
  const cid = useSelector((state) => state.cid);
  const dispatch = useDispatch();

  const { startRecording, stopRecording, results, isRecording } =
    useSpeechToText();
  //firestore ref and query parameters
  const messagesRef = collection(firestore, "message");

  React.useEffect(() => {
    setFormValue(results);
  }, [results]);

  useEffect(() => {
    const q = firestore
      .collection("message")
      .where("cid", "<=", chatId)
      .where("cid", ">=", chatId)
      .orderBy("cid")
      .orderBy("createdAt")
      .limit(1000);
    const unsub = q.onSnapshot((snap) => {
      let messages = [];
      snap.forEach((doc) => {
        messages.push(doc.data());
      });
      setMessages(messages);
    });

    return unsub;
  }, [location]);

  //focus on input box on load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  //set cid on load
  useEffect(() => {
    dispatch(setCID(chatId));
  }, []);

  //add user on load
  useEffect(() => {
    //sets CID
    console.log("hello");

    //adds user when they click onto the email link
    const chatIdQuery = firestore
      .collection("chats")
      .where("cid", "==", chatId);
    const { uid } = auth.currentUser;
    const chatQuery = chatIdQuery.get().then(async (querySnapshot) => {
      const snapshot = querySnapshot.docs[0]; // use only the first document, but there could be more
      const chatRef = snapshot.ref; // now you have a DocumentReference
      setChatRef(chatRef);
      const chatSnap = await getDoc(chatRef);
      if (
        chatSnap.data().users.length < 2 &&
        chatSnap.data().users[0] !== uid
      ) {
        await setDoc(
          chatRef,
          {
            users: [...chatSnap.data().users, uid],
          },
          { merge: true }
        );
      }
    });
  }, [cid]);

  const scrollToBottom = () => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (e) => {
    const value = formValue;
    e.preventDefault();
    setFormValue("");

    const { uid, photoURL, displayName } = auth.currentUser;
    const messageData = {
      text: value,
      createdAt: firebase.firestore.Timestamp.now(),
      uid,
      photoURL,
      displayName,
      cid: chatId,
    };
    try {
      await addDoc(messagesRef, messageData);
      //adds last message to chat tile
      await setDoc(chatRef, { lastMessage: messageData.text }, { merge: true });
    } catch (e) {
      setFormValue(value);
    }
    setMessages([...messages, messageData]);

    setTimeout(() => {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  const handleInputKeyup = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      sendMessage(e);
    }
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
              onKeyUp={handleInputKeyup}
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
