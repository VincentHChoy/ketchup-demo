import React from 'react'

function SideBarIcon({icon, text = 'tooltip',handleClick = () => console.log('hello world')}) {
  return (
    <button className='sidebar-icon group' onClick={handleClick}>
      {icon}
      <span className='sidebar-tooltip group-hover:scale-100'>
        {text}
      </span>
      </button>
  )
}

export default SideBarIcon
