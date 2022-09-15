import './Button.css'

function Button({type = 'tooltip', handleClick , message }) {

  return (
    <button type={type} class="signin-button" onClick={handleClick}>{message}</button>
  )
}

export default Button