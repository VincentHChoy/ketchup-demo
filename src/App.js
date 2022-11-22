import React, { useEffect, useState } from "react";
import { AiFillGithub, AiFillDownCircle } from "react-icons/ai";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import SignIn from "./components/SignIn/SignIn";
import Home from "./components/Home/Home";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const [user] = useAuthState(auth);
  const gid = useSelector((state) => state.gid);
  const sectionStyle =
    "flex flex-col md:flex-row items-center justify-around p-10 bg-secondary mt-1/2";

  return (
    <div className="App">
      <BrowserRouter>
        <header></header>
        <section>
          {user || gid ? (
            <Home />
          ) : (
            <main>
              <div className="h-screen bg-primary">
                <a
                    href="https://github.com/VincentHChoy/ketchup-demo"
                  target="_blank"
                >
                  <AiFillGithub
                    size={50}
                    className="text-black fixed top-0 right-0 opacity-80 cursor-pointer"
                  />
                </a>

                <main className="flex flex-col items-center justify-center h-5/6">
                  <h1 className="font-comfortaa text-black md:text-9xl text-6xl font-bold">
                    Ketchup
                  </h1>
                  <h1 className="font-comfortaa text-3xl text-center my-3 mx-6 md:w-1/3">
                    A realtime chat collaberation app with Google API
                    integration
                  </h1>
                  <SignIn />
                </main>
                <AiFillDownCircle
                  size={50}
                  className="text-secondary animate-bounce h-1/6 mx-auto"
                />
                <section className={`md:flex-row-reverse ${sectionStyle}`}>
                  <img
                    className="md:w-1/2 rounded-2xl my-10"
                    src="welcomePage.png"
                  />
                  <h1 className="text-center text-primary text-4xl break-words mx-5">
                    Generate a chatroom and start collaberating in seconds!
                  </h1>
                </section>
                <section className={`${sectionStyle}`}>
                  <img
                    className="rounded-2xl my-10 w-1/2 h-1/2"
                    src="chatroom.png"
                  />
                  <h1 className="text-center text-primary text-4xl break-words">
                    Collaberate with your peers with the realtime chat with
                    speech-to-text features!
                  </h1>
                </section>
                <section className={sectionStyle}>
                    <h1 className="text-center text-4xl break-words text-primary">
                      Collaborate with your peers using google docs and sheets all
                      within the same app.
                    </h1>
                    <div className="flex flex-row w-1/2 mx-10">
                    <img className="rounded-2xl w-1/2 m-1" src="doc.png"></img>
                    <img className="rounded-2xl w-1/2 m-1" src="sheet.png"></img>
                  </div>
                </section>
                <section
                  className={`flex flex-col bg-primary rounded-xl md:flex-col ${sectionStyle}`}
                >
                  <h1 className="text-center text-secondary text-4xl break-words py-10">
                        Lets Get Collaborating!
                  </h1>
                      <SignIn />
                </section>
              </div>
            </main>
          )}
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
