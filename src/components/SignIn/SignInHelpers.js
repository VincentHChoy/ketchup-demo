import { collection, setDoc, getDoc, doc, addDoc } from "firebase/firestore";
import { auth, firebase, firestore } from "../../firebase";

export const populateData = async(uid) => {
  const chatRef = doc(collection(firestore, "chats"));
  const messagesRef = collection(firestore, "message");

  await addDoc(collection(firestore, "chats"), {
    cid: chatRef.id,
    users: [uid, "d7jgcWY1GQIBbk5smjQt"],
    lastMessage:
      "Who are you talking to right now? Who is it you think you see? Do you know how much I make a year? I mean, even if I told you, you wouldn't believe it.Do you know what would happen if I suddenly decided to stop going into work? A business big enough that it could be listed on the NASDAQ goes belly up. Disappears! It ceases to exist without me. No, you clearly don't know who you're talking to, so let me clue you in.I am not in danger",
    messageTimeStamp: null,
    docId: null,
    sheetsId: "15EUWRiW1PV9LA3Po1NToBo5x6yd5cdrM5SPJ6AEpJc0",
  });

  await addDoc(messagesRef, {
    text: "Who are you talking to right now? Who is it you think you see? Do you know how much I make a year? I mean, even if I told you, you wouldn't believe it.Do you know what would happen if I suddenly decided to stop going into work? A business big enough that it could be listed on the NASDAQ goes belly up. Disappears! It ceases to exist without me. No, you clearly don't know who you're talking to, so let me clue you in.I am not in danger",
    createdAt: firebase.firestore.Timestamp.now(),
    uid: "d7jgcWY1GQIBbk5smjQt",
    photoURL:
      "https://spiritofcontradiction.eu/wp-content/uploads/2013/12/walter-white-with-hat-128x128.jpg",
    displayName: "Walter White",
    cid: chatRef.id,
  });

  await addDoc(collection(firestore, "chats"), {
    cid: chatRef.id + "xyz",
    users: [uid, "kNKcHqhXqbbr4p6K74mG"],
    lastMessage: "yo you have any strong magnets?",
    messageTimeStamp: null,
    docId: "1y6-ObKsEZbFl32BowexCeTHtCZO9WFbP5K2QLYYvgjU",
    sheetsId: null,
  });

  await addDoc(messagesRef, {
    text: "yo you have any strong magnets?",
    createdAt: firebase.firestore.Timestamp.now(),
    uid: "kNKcHqhXqbbr4p6K74mG",
    photoURL:
      "https://pm1.narvii.com/6320/9ac872a01a2bd2f956a64d3ff3506e96df282a15_128.jpg",
    displayName: "Jesse Pinkman",
    cid: chatRef.id + 'xyz',
  });
}