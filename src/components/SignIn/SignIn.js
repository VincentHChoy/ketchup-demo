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
      console.log('uid',uid);
      try {
        const user = await existingUser(uid);
        console.log(user);
        if (!user) {
          console.log('im a new user');
           populateData(uid)
        }
        await setDoc(usersRef, userData, { merge: true });
      } catch (e) {
        alert(e);
      }
    });
  };

  const existingUser = async (uid) => {
    const usersRef = doc(firestore, "users", uid);
    const docSnap = await getDoc(usersRef);
    console.log(docSnap.exists());
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

