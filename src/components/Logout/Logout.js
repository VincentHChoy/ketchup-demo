import React from "react";
import { GoogleLogout } from "react-google-login";

const clientId =
  "866320623023-g7mi0qumj5o3rjaedn9ciirsnft8n4eb.apps.googleusercontent.com";

function LogOut() {
  const onSuccess = () => {
  };

  return (
    <div id="signOutButton" className="fixed bottom-0 right-1/2">
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default LogOut;
