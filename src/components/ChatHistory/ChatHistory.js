import { doc, getDoc } from "firebase/firestore";
import { auth, firebase, firestore } from "../../firebase";
import ChatTile from "./ChatTile";

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
    {
      chatter: 'Shawn',
      img: 'https://cdn.slidesharecdn.com/profile-photo-ShawnThibodeau-96x96.jpg?cb=1523559870',
      message: 'I am going on lunch break',
      id: '2Ax5Ym'
    },
    {
      chatter: 'Walter White',
      img: 'https://spiritofcontradiction.eu/wp-content/uploads/2013/12/walter-white-with-hat-128x128.jpg',
      message: 'Wheres my money',
      id: 'Ax5Ym'
    },
    {
      chatter: 'Saul Goodman',
      img: 'https://styles.redditmedia.com/t5_3a289z/styles/profileIcon_dppne87g62u51.jpg?width=256&height=256&frame=1&crop=256:256,smart&s=fa9caddedec070c183c1c111fdc49f05bffd59aa',
      message: 'Hi, I’m Saul Goodman. Did you know that you have rights? The Constitution says you do. And so do I. I  ',
      id: '2Ax5Y'
    },
    {
      chatter: 'Shawn',
      img: 'https://cdn.slidesharecdn.com/profile-photo-ShawnThibodeau-96x96.jpg?cb=1523559870',
      message: 'I am going on lunch break',
      id: '2Ax5Ym'
    },
    {
      chatter: 'Walter White',
      img: 'https://spiritofcontradiction.eu/wp-content/uploads/2013/12/walter-white-with-hat-128x128.jpg',
      message: 'Wheres my money',
      id: 'Ax5Ym'
    },
    {
      chatter: 'Saul Goodman',
      img: 'https://styles.redditmedia.com/t5_3a289z/styles/profileIcon_dppne87g62u51.jpg?width=256&height=256&frame=1&crop=256:256,smart&s=fa9caddedec070c183c1c111fdc49f05bffd59aa',
      message: 'Hi, I’m Saul Goodman. Did you know that you have rights? The Constitution says you do. And so do I. I  ',
      id: '2Ax5Y'
    },
    {
      chatter: 'Shawn',
      img: 'https://cdn.slidesharecdn.com/profile-photo-ShawnThibodeau-96x96.jpg?cb=1523559870',
      message: 'I am going on lunch break',
      id: '2Ax5Ym'
    },
    {
      chatter: 'Walter White',
      img: 'https://spiritofcontradiction.eu/wp-content/uploads/2013/12/walter-white-with-hat-128x128.jpg',
      message: 'Wheres my money',
      id: 'Ax5Ym'
    },
    {
      chatter: 'Shawn',
      img: 'https://cdn.slidesharecdn.com/profile-photo-ShawnThibodeau-96x96.jpg?cb=1523559870',
      message: 'I am going on lunch break',
      id: '2Ax5Ym'
    },
    {
      chatter: 'Walter White',
      img: 'https://spiritofcontradiction.eu/wp-content/uploads/2013/12/walter-white-with-hat-128x128.jpg',
      message: 'Wheres my money',
      id: 'Ax5Ym'
    },
    
  ]; 
  //overflow-auto h-72 relative max-w-sm mx-auto bg-white dark:bg-slate-800 dark:highlight-white/5 shadow-lg ring-1 ring-black/5 rounded-xl flex flex-col divide-y dark:divide-slate-200/5

  return (
    <main className="overflow-y-auto fixed bottom-0 top-0 right-0 m-0 flex flex-col bg-white text-secondary shadow-lg z-20 w-auto">
      <h1 className="font-bold text-xl text-center">Chats</h1>
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
