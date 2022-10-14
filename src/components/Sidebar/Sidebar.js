//https://react-icons.github.io/react-icons/
import React from "react";
import { GoSignOut } from "react-icons/go";
import { SiGooglesheets, SiGooglechat, SiReadthedocs } from "react-icons/si";
import SideBarIcon from "./SideBarIcon";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleChat } from "../../actions";

function Sidebar() {
  const cid = useSelector((state) => state.cid);
  const dispatch = useDispatch();

  return (
    <div className="fixed top-0 left-0 h-screen w-20 m-0 flex flex-col bg-white text-primary shadow-lg z-20">
      <Link to="/">
        <img
          src="/logo-cropped.jpg"
          alt="logo"
          className="py-5 mx-auto w-1/2 hover:animate-bounce cursor-pointer hover:animate-ping"
        />
      </Link>
      <SideBarIcon
        icon={<SiGooglechat size={28} />}
        text={"Chat"}
        handleClick={() => dispatch(toggleChat())}
      ></SideBarIcon>

      {cid && (
        <>
          <Link to="/docs">
            <div className={"animate-fade-in-down-1"}>
              <SideBarIcon
                icon={<SiReadthedocs size={28} />}
                text={"Google Docs"}
              ></SideBarIcon>
            </div>
          </Link>
          <Link to="/sheets">
            <div className={"animate-fade-in-down-2"}>
              <SideBarIcon
                icon={<SiGooglesheets size={28} />}
                text={"Google Sheets"}
              ></SideBarIcon>
            </div>
          </Link>
        </>
      )}

      <div className="mt-auto mb-5">
        <SideBarIcon
          icon={<GoSignOut size={28} />}
          text={"Sign Out"}
          handleClick={() => auth.signOut()}
        ></SideBarIcon>
      </div>
    </div>
  );
}

export default Sidebar;
