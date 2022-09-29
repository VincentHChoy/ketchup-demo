import { useNavigate } from "react-router-dom";

function ChatTile(props) {
  const link = `/chat/${props.cid}`; 
  const navigate = useNavigate();
  return (
      <main className="flex flex-row py-2 px-2 h-15 hover:bg-primary cursor-pointer"
      onClick={() => { navigate(link)}}>
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
