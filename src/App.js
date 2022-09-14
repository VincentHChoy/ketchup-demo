import React, { useRef, useState } from 'react';
// import './App.css';

import moment from 'moment'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { async } from '@firebase/util';
import SigninPage from './SigninPage';

firebase.initializeApp({
  apiKey: "AIzaSyCHYJYYp5JIORcHCZmA1G1QXVeihuOvzls",
  authDomain: "forest-6c6a9.firebaseapp.com",
  databaseURL: "https://forest-6c6a9-default-rtdb.firebaseio.com",
  projectId: "forest-6c6a9",
  storageBucket: "forest-6c6a9.appspot.com",
  messagingSenderId: "974636094614",
  appId: "1:974636094614:web:731781a021724ba39adeb7",
  measurementId: "G-LTR1N6E6VB"
})

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header >
        
      </header>
      <section>
        {user ? <ChatRoom/>: <SignIn/>}
      </section>
     
    </div>
  );
}

 
function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <SigninPage signInWithGoogle={signInWithGoogle}/>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button style={{zIndex: 234}} onClick={()=> auth.signOut()}>Sign Out</button>
  )
}

  


function ChatRoom() {
  const dummy=useRef()
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('')
  
  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    
 //create new document in firestore
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });
    setFormValue('')
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      {SignOut()}
      <main>
        
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        <div ref={dummy}></div>
      </main>
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(event)=>setFormValue(event.target.value)}/>
        <button type = "submit">Submit</button>
      </form>
    </>
     
  )
}


function ChatMessage(props) {
  const { text, uid,photoURL, createdAt } = props.message;
  
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  const time = createdAt?.toDate()
 
const a = moment(time).fromNow();
  return (
    <>
      <span style={{color: 'white'}}>
        {a}
      </span>
      <div className={`message ${messageClass}`}>
       <img src={photoURL || 'https://4.bp.blogspot.com/-NiUcogaBYrk/UioQgTmkGuI/AAAAAAAAClg/YOdyn5RB4W4/s1600/minion_icon_image_picfishblogspotcom+%25287%2529.png'} />
        <p>{text}</p>
      </div>
      
    
    </>
  )
}

export default App;
