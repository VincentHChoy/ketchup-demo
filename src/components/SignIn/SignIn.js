import { auth, firebase, firestore } from "../../firebase";
import { setDoc, getDoc, doc } from "firebase/firestore";
import "./SignIn.css";
import Button from "../Button/Button";
import { populateData } from "./SignInHelpers";
import { setGID } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const dispatch = useDispatch()
  const gid = useSelector((state) => state.gid);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(async () => {
      const { uid, photoURL, displayName } = auth.currentUser;
      const usersRef = doc(firestore, "users", uid);
      const userData = {
        uid: uid,
        img: photoURL,
        name: displayName,
      };
      try {
        const user = await existingUser(uid);
        console.log(user);
        if (!user) {
          populateData(uid);
        }
        await setDoc(usersRef, userData, { merge: true });
      } catch (e) {
        alert(e);
      }
    });
  };

  const SignInWithGuest = async () => {
    const uid = Date.now().toString()
      const usersRef = doc(firestore, "users", uid);
      const userData = {
        uid,
        img: "https://pbs.twimg.com/profile_images/3600372629/a82319a4ccf4843e777393d5b3954dce_400x400.jpeg",
        name: "Guest",
        chats: [""]
      }
      dispatch(setGID(uid));
      await setDoc(usersRef, userData, { merge: true });
      populateData(uid);
  }

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
      <a className="text-secondary cursor-pointer" onClick={SignInWithGuest} >Sign in as Guest</a>
    </section>
  );
};
export default SignIn;
