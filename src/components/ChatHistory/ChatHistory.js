import { collection, doc, where, getDoc, query } from "firebase/firestore";
import { auth, firebase, firestore } from "../../firebase";
import ChatTile from "./ChatTile";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toggleChat } from "../../actions";
import { useEffect, useState } from "react";
import { async } from "@firebase/util";

function ChatHistory() {
  const chatVisible = useSelector((state) => state.toggleChat);
  const dispatch = useDispatch();
  const { uid } = auth.currentUser;
  const [chatrooms, setChatrooms] = useState(null);

  // const chatrooms = [
  //   {
  //     name: "Shawn",
  //     img: "https://cdn.slidesharecdn.com/profile-photo-ShawnThibodeau-96x96.jpg?cb=1523559870",
  //     lastMessage: "I am going on lunch break",
  //     messageTimestamp: "idk",
  //     cid: "bbbg",
  //   },
  //   {
  //     name: "Walter White",
  //     img: "https://spiritofcontradiction.eu/wp-content/uploads/2013/12/walter-white-with-hat-128x128.jpg",
  //     lastMessage: "you think that of me? No. I am the one who knocks!",
  //     cid: "brkngbd",
  //   },
  //   {
  //     name: "Saul Goodman",
  //     img: "https://styles.redditmedia.com/t5_3a289z/styles/profileIcon_dppne87g62u51.jpg?width=256&height=256&frame=1&crop=256:256,smart&s=fa9caddedec070c183c1c111fdc49f05bffd59aa",
  //     lastMessage:
  //       "Hi, I’m Saul Goodman. Did you know that you have rights? The Constitution says you do. And so do I. I  ",
  //     cid: "2Ax5Y",
  //   },
  //   {
  //     name: "Jesse Pinkman",
  //     img: "https://pm1.narvii.com/6320/9ac872a01a2bd2f956a64d3ff3506e96df282a15_128.jpg",
  //     lastMessage:
  //       "Some straight like you, age what - 60? You're just gonna break bad?",
  //     cid: "xyz",
  //   },
  // ];

  useEffect(() => {
    firestore
      .collection("chats")
      .where("users", "array-contains", uid)
      .onSnapshot((snap) => {
        let chats = [];
        snap.forEach((doc) => {
          chats.push(doc.data());
        });
        filterChatrooms(chats);
      });
  }, []);


  const filterChatrooms = async (chats) => {
    let filteredChats = [];
    for (const chat of chats) {
      if (chat.users.length > 1) {
       fetchUsers(chat.users).then((res)=>{
          filteredChats = [...filteredChats,{ ...chat, user: res }]
       }).then((res) => {
         setChatrooms(filteredChats);
      });
      }
    }
  };

  const fetchUsers = async (userArray) => {
    const filteruser = userArray.filter((x) => x !== uid)[0];
    const docRef = doc(firestore, "users", filteruser);
    const docSnap = await getDoc(docRef);
    return docSnap.data()
  };


  return (
    <>
      {chatVisible && (
        <main className="overflow-y-auto fixed bottom-5 top-5 right-5 m-0 flex flex-col bg-white text-secondary shadow-lg z-20 w-fit">
          <header className="flex flex-row justify-between items-center mx-2 my-2">
            <span className="font-bold text-xl text-center py-2 px-2">
              Chats
            </span>

            <button
              onClick={() => {
                dispatch(toggleChat());
              }}
              className="bg-secondary text-primary hover:bg-primary hover:text-secondary rounded-3xl"
            >
              <AiOutlineCloseCircle size={28} />
            </button>
          </header>
          {chatrooms && 
            chatrooms.map((chatroom) => (
              <ChatTile
                key={chatroom.user.uid}
                cid={chatroom.cid}
                lastMessage={chatroom.lastMessage}
                chatter={chatroom.user.name}
                img={chatroom.user.img}
                docId={chatroom.docId}
                sheetsId={chatroom.sheetsId}
              />
            ))}
        </main>
      )}
    </>
  );
}
export default ChatHistory;
