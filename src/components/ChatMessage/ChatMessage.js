import { auth } from "../../firebase";
import moment from "moment";
import "./ChatMessage.css";
import { useSelector } from "react-redux";

const TIMESTAMP_COOLDOWN_IN_MINUTES = 15;

function ChatMessage(props) {
  const { text, photoURL, createdAt, uid } = props.message;
  const gid = useSelector((state) => state.gid);
  let previousCreatedAt = props.previousMessage
    ? props.previousMessage.createdAt
    : null;
  const sameUser = gid ? gid : auth.currentUser.uid
  const messageClass =
    uid === sameUser ? "sent" : "received";

  let showTimestamp = true;

  if (previousCreatedAt) {
    const start = moment(previousCreatedAt.toDate());
    const end = moment(createdAt.toDate());

    let duration = moment.duration(end.diff(start));
    let minutes = duration.asMinutes();

    if (minutes < TIMESTAMP_COOLDOWN_IN_MINUTES) {
      showTimestamp = false;
    }
  }

  const time = createdAt.toDate();
  const age = moment(time).fromNow();

  return (
    <>
      {showTimestamp && <span className="time">{age}</span>}
      <div
        className={`message ${messageClass}`}
        style={{
          padding: "10px",
        }}
      >
        <img
          className="rounded-full w-10 mx-2"
          referrerPolicy="no-referrer"
          src={
            photoURL ||
            "https://4.bp.blogspot.com/-NiUcogaBYrk/UioQgTmkGuI/AAAAAAAAClg/YOdyn5RB4W4/s1600/minion_icon_image_picfishblogspotcom+%25287%2529.png"
          }
        />
        <p className="text-left">{text}</p>
      </div>
    </>
  );
}

export default ChatMessage;
