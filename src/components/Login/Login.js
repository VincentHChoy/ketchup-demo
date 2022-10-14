import React from 'react'
import { GoogleLogin } from 'react-google-login'


const clientId = "866320623023-g7mi0qumj5o3rjaedn9ciirsnft8n4eb.apps.googleusercontent.com";
function LogIn() {
  const onSuccess = (res) =>{
  }

  const onFailure = (res) => {

  }
  return (
    <div id='signInButton' className="fixed top-1/2 right-1/2">
        <GoogleLogin
        clientId={clientId}
        buttonText="Login" 
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        />

      </div>
  )
}

export default LogIn