import './Button.css'

function Button({ style, type = 'tooltip', handleClick, message }) {

  return (
    <button style={style} type={type} className="signin-button" onClick={handleClick}>{message}</button>
  )
}

export default Button