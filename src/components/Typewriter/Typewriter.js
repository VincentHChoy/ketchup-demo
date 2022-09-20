import React from 'react'
import './Typewriter.css'

function Typewriter(props) {
  let firstName = ''
  if(props.name){
    const firstName = props.name.split(' ')[0] + '!'
  }
  return (
    <h1 className="mb-2 font-sans text-xl text-black md:text-2xl">
      <span className="relative">
        {props.name && <span className="h-10 pt-2 overflow-x-hidden whitespace-nowrap text-brand-accent">
          Hello <strong>{firstName} </strong>
        </span>}
        {props.msg && <span className="h-10 pt-2 overflow-x-hidden whitespace-nowrap text-brand-accent">
          {props.msg}
        </span>}

        <span
          className="cursor absolute -bottom-0 left-0 -top-1 inline-block bg-white w-full animate-type will-change"
        ></span>
      </span>
    </h1>
  )
}

export default Typewriter