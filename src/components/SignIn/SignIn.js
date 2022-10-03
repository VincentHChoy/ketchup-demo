import { auth, firebase, firestore } from "../../firebase";
import { collection, setDoc, addDoc, doc } from "firebase/firestore";
import "./SignIn.css";
import Button from "../Button/Button";

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then(async () => {
        const { uid, photoURL, displayName } = auth.currentUser;
        const usersRef = doc(firestore, "users", uid);
        console.log(usersRef);
        const userData = {
          uid: uid,
          img: photoURL,
          name: displayName,
          chats: ['dogs'],
        };
        try {
          await setDoc(usersRef, userData, { merge: true });
          console.log("something went right");
        } catch (e) {
          alert(e);
        }
      })
      .catch(() => {
        console.log("something went wrong");
      });
  };

  return (
    <section className="grid h-screen place-items-center">
      <div className="pb-30">
        <img src="/logo.svg" alt="logo" className="logo" />
      </div>

      <Button message={"Sign in with Google"} handleClick={signInWithGoogle} />
    </section>
  );
};
export default SignIn;
