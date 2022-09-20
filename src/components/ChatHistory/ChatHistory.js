import { doc, getDoc } from "firebase/firestore";
import { auth, firebase, firestore } from "../../firebase";

import './ChatHistory.css'

function ChatHistory() {


  // const docRef = doc(firestore, "users", "SF");
  // const docSnap = await getDoc(docRef);

  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   // doc.data() will be undefined in this case
  //   console.log("No such document!");
  // }

  return (
    <div>
      <h1>Chat</h1>

    </div>
  )
}

export default ChatHistory