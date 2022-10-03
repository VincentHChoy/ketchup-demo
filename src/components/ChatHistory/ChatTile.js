import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDocId, setSheetsId ,setCID } from "../../actions";

function ChatTile(props) {
  const link = `/chat/${props.cid}`; 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cid = useSelector((state) => state.cid);
  const messageClass = cid === props.cid ? "bg-primary" : "";


  return (
      <main className={`flex flex-row py-2 px-2 h-15 hover:bg-primary cursor-pointer ${messageClass}`}
      onClick={() => {
        dispatch(setCID(props.cid))
        dispatch(setDocId(props.docId))
        dispatch(setSheetsId(props.sheetsId))
        navigate(link)
        }}>
        <img
          className="rounded-full w-16"
          referrerPolicy="no-referrer"
          src={props.img}
        />
        <div className="flex flex-col mx-2">
          <h2 className="font-bold">{props.chatter}</h2>
          <p className="text-left px-1 py-1 mr-2 truncate text-sm max-w-xs">
            {" "}
            {props.lastMessage}
          </p>
        </div>
      </main>
  );
}

export default ChatTile;
