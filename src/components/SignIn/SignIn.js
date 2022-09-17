import './SignIn.css'
import { auth, firebase } from '../../firebase'
import Button from '../Button/Button'


const SignIn = () => {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <section className='grid h-screen place-items-center'>
      <div className="pb-30">
        <img src="logo.svg" alt='logo' class='logo' />

      </div>

      <Button message={"Sign in with Google"} handleClick={signInWithGoogle} />
      
    </section>


  )
}
export default SignIn