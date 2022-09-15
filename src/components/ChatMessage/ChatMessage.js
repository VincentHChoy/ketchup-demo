import { auth} from '../../firebase'
import moment from "moment";
import "./ChatMessage.css";


function ChatMessage(props) {
  const { text, uid, photoURL, createdAt } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  const time = createdAt?.toDate();

  const a = moment(time).fromNow();
  return (
    <>
      <span class='time'>{a}</span>
      <div className={`message ${messageClass}`}>
        <img class='rounded-full w-10 ' 
          src={
            photoURL ||
            "https://4.bp.blogspot.com/-NiUcogaBYrk/UioQgTmkGuI/AAAAAAAAClg/YOdyn5RB4W4/s1600/minion_icon_image_picfishblogspotcom+%25287%2529.png"
          }
        />
        <p> {text}</p>
      </div>
    </>
  );
}


export default ChatMessage