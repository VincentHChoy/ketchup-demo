//https://react-icons.github.io/react-icons/
import React from "react";
import { GoSignOut } from "react-icons/go";
import { SiGooglesheets, SiGooglechat, SiReadthedocs } from "react-icons/si";
import SignOut from "../SignOut/SignOut";
import SideBarIcon from "./SideBarIcon";
import { auth } from '../../firebase'



function Sidebar(props) {
  return (
    <div className="fixed top-0 right-0 h-5/6 w-20 m-0 flex flex-col bg-white text-primary shadow-lg">
      
      <SideBarIcon
        icon={<SiGooglechat size={28} />}
        text={"Chat"}>
      </SideBarIcon>

      <SideBarIcon 
      icon={<SiGooglesheets size={28}/>} 
      text={"Google Sheets"}
      >
      </SideBarIcon>

      <SideBarIcon 
      icon={<SiReadthedocs size={28}/>}
      text={"Google Docs"}
      >
      </SideBarIcon>
 
      <div className="mt-auto">
      <SideBarIcon
        icon={<GoSignOut size={28} />}
        text={"Sign Out"}
        handleClick={() => auth.signOut()}
        >
      </SideBarIcon>
      </div>
    </div>
  );
}

export default Sidebar