import './SigninPage.css'
import logo from './logo.svg';




export default function SigninPage({ signInWithGoogle }) {
   
  return (
    <section class='grid h-screen place-items-center'> 
        <div class="pb-30">
        <img src={logo} alt='logo' class='logo animate-ping' />
        
      </div>
      <h1 class='flag'>no slogn yet</h1>
     
   
      <button class="signin-button" onClick={signInWithGoogle}>Sign in with Google</button>
      
    </section>
    
    
  )
}