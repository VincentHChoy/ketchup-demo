import React from "react";
import { auth } from "../../../firebase";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "../../Sidebar/Sidebar";
import Button from "../../Button/Button";

const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 

const EMAIL_JS_SERVICE_ID = 'service_z3ywa1s';
const EMAIL_JS_TEMPLATE_ID = 'template_ep7mphh';
const EMAIL_JS_PUBLIC_KEY = 'EKnx5SInPFQG3jWSG';

const FALLBACK_PHOTO_URL = "https://4.bp.blogspot.com/-NiUcogaBYrk/UioQgTmkGuI/AAAAAAAAClg/YOdyn5RB4W4/s1600/minion_icon_image_picfishblogspotcom+%25287%2529.png"

function Home() {
  const [email, setEmail] = React.useState('');

  const { photoURL, displayName } = auth.currentUser;



  const sendEmail = () => {
    if (!email_regex.test(email)) {
      alert('invalid email')
    } else {
      // eslint-disable-next-line no-undef
      emailjs.send(EMAIL_JS_SERVICE_ID, EMAIL_JS_TEMPLATE_ID, {
        link: 'localhost:3000',
        user_email: email,
      }, EMAIL_JS_PUBLIC_KEY);

    }
  }

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

          <section className="flex flex-col content-center justify-center mt-24">
        <input
          onChange={(e) => setEmail(e.target.value)}
              className="w-96 my-5 text-base text-primary outline-none border-b-2 border-rgb(83, 82, 82)"
              placeholder="type in your colleagues email to start collaborating"
            />
            <Button handleClick={sendEmail} message={"Send"} />
          </section>
      </main>
 
  );
}
export default Home;
