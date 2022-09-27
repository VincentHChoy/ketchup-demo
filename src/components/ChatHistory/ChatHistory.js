import { doc, getDoc } from "firebase/firestore";
import { auth, firebase, firestore } from "../../firebase";
import ChatTile from "./ChatTile";
import { AiOutlineCloseCircle } from "react-icons/ai";

function ChatHistory() {
  // const docRef = doc(firestore, "users", "SF");
  // const docSnap = await getDoc(docRef);

  // if (docSnap.exists()) {

  // } else {
  //   // doc.data() will be undefined in this case

  // }
  const chats = [
    {
      chatter: "Shawn",
      img: "https://cdn.slidesharecdn.com/profile-photo-ShawnThibodeau-96x96.jpg?cb=1523559870",
      message: "I am going on lunch break",
      id: "2Ax5Ym",
    },
    {
      chatter: "Walter White",
      img: "https://spiritofcontradiction.eu/wp-content/uploads/2013/12/walter-white-with-hat-128x128.jpg",
      message: "Wheres my money",
      id: "Ax5Ym",
    },
    {
      chatter: "Saul Goodman",
      img: "https://styles.redditmedia.com/t5_3a289z/styles/profileIcon_dppne87g62u51.jpg?width=256&height=256&frame=1&crop=256:256,smart&s=fa9caddedec070c183c1c111fdc49f05bffd59aa",
      message:
        "Hi, I’m Saul Goodman. Did you know that you have rights? The Constitution says you do. And so do I. I  ",
      id: "2Ax5Y",
    },
  ];

  return (
    <main className="overflow-y-auto fixed bottom-5 top-5 right-5 m-0 flex flex-col bg-white text-secondary shadow-lg z-20 w-fit">
      <header className="flex flex-row justify-between items-center mx-2 my-2">
        <h1 className="font-bold text-xl text-center">Chats</h1>

        <button
          onClick={''}
          className='bg-secondary text-primary hover:bg-primary hover:text-secondary rounded-3xl'
        >
          <AiOutlineCloseCircle size={28} />
        </button>
      </header>

      {chats &&
        chats.map((chat) => (
          <ChatTile
            key={chat.id}
            message={chat.message}
            chatter={chat.chatter}
            img={chat.img}
          />
        ))}
    </main>
  );
}

export default ChatHistory;
