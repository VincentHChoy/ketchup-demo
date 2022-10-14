import { auth, firebase, firestore } from "../../firebase";
import { collection, setDoc, getDoc, doc, addDoc } from "firebase/firestore";
import "./SignIn.css";
import Button from "../Button/Button";
import { populateData } from "./SignInHelpers";

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(async () => {
      const { uid, photoURL, displayName } = auth.currentUser;
      const usersRef = doc(firestore, "users", uid);
      const userData = {
        uid: uid,
        img: photoURL,
        name: displayName,
        chats: [""],
      };
      try {
        await setDoc(usersRef, userData, { merge: true });
        const newUser = await checkNewUser(uid);
        if (newUser) {
         populateData(uid)
        }
      } catch (e) {
        alert(e);
      }
    });
  };

  const checkNewUser = async (uid) => {
    const usersRef = doc(firestore, "users", uid);
    const docSnap = await getDoc(usersRef);
    return docSnap.exists();
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

