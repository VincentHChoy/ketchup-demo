import React from "react";
import { auth } from "../../../firebase";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "../../Sidebar/Sidebar";
import Button from "../../Button/Button";

const FALLBACK_PHOTO_URL = "https://4.bp.blogspot.com/-NiUcogaBYrk/UioQgTmkGuI/AAAAAAAAClg/YOdyn5RB4W4/s1600/minion_icon_image_picfishblogspotcom+%25287%2529.png"

function Home() {

  const { photoURL, displayName } = auth.currentUser;

  return (
  
      <main className="flex flex-col justify-center items-center h-screen space-y-5">
        <h1>
          Hello <strong>{displayName}!</strong>
        </h1>
        <span class="relative inline-flex">
          <img alt='pic'
            class="rounded-full w-32 shadow-lg"
            src={photoURL || FALLBACK_PHOTO_URL}
          />
          <span class="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3  bg-green-500"></span>
          </span>
        </span>

        <form className="left-20 text-2xl pb-5 bg-white" onSubmit={""}>
          <section className="flex flex-col content-center justify-center mt-24">
            <input
              className="w-96 my-5 text-base text-primary outline-none border-b-2 border-rgb(83, 82, 82)"
              placeholder="type in your colleagues email to start collaborating"
            />
            <Button message={"Send"} type="submit" />
          </section>
        </form>
      </main>
 
  );
}
export default Home;
