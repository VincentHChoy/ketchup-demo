import {auth} from '../../firebase'

function SignOut() {
  return (
    auth.currentUser && (
      <button style={{ zIndex: 234 }} onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

export default SignOut