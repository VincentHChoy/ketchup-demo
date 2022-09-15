import './Button.css'

function Button(props) {
  return (
    <button class="signin-button" onClick={props.function}>{props.message}</button>
  )
}

export default Button