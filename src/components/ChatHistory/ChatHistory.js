import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import ChatTile from "./ChatTile";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toggleChat } from "../../actions";
import { useEffect, useState } from "react";
import Loading from "./Loading";

function ChatHistory() {
  const chatVisible = useSelector((state) => state.toggleChat);
  const dispatch = useDispatch();
  const { uid } = auth.currentUser;
  const [chatrooms, setChatrooms] = useState([]);
  const [loading, setLoading] = useState(true);

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
        fetchUsers(chat.users)
          .then((res) => {
            filteredChats = [...filteredChats, { ...chat, user: res }];
          })
          .then((res) => {
            setChatrooms(filteredChats);
            setLoading(false);
          });
      }
    }
  };

  const fetchUsers = async (userArray) => {
    const filteruser = userArray.filter((x) => x !== uid)[0];
    const docRef = doc(firestore, "users", filteruser);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };

  const emptyChat = chatrooms.length < 1 ? true : false;

  return (
    <>
      {chatVisible && (
        <main className="overflow-y-auto fixed bottom-5 top-5 right-5 m-0 flex flex-col bg-white text-secondary shadow-lg z-20 w-1/4">
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
          {loading && <Loading/>}
          {!loading &&
            (emptyChat ? (
              <h1 className="text-ellipsis overflow-hidden px-2 mx-2">
                Currently no chats,
                <br /> Send an email link to start collaborating
              </h1>
            ) : (
              chatrooms &&
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
              ))
            ))}
        </main>
      )}
    </>
  );
}
export default ChatHistory;
