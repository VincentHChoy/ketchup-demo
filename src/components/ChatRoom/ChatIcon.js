import React from 'react'

function ChatIcon({icon, text = 'tooltip',handleClick = () => console.log('hello world'), position}) {
  return (
    <button
      className={`icon group fixed ${position} bottom-5`}
      onClick={handleClick}
    >
      <span className="icon-tooltip group-hover:scale-100 z-10">
        {text}
      </span>
      {icon}
    </button>
  )
}

export default ChatIcon
