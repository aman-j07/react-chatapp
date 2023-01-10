import React, { memo, useEffect, useRef } from "react";
import fireBaseApp from "../firebase";
import { getDatabase, ref, push } from "firebase/database";

interface Iprops {
  messages: {
    id: string;
    uid: string;
    userPic: string;
    txt: string;
    createdAt: string;
  }[];
  user: {
    uid: string;
    photoURL: string | null;
  };
}

const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",];

function Chat(props: Iprops) {
  const refChat=useRef<HTMLElement>(null)
  const refMessage = useRef<HTMLInputElement>(null);
  const db = getDatabase(fireBaseApp);
  const { user, messages } = props;

  console.log("messages - ", messages);

  const sendMessage = () => {
    if (refMessage.current !== null) {
      let date = `${new Date().getDate()} ${months[new Date().getMonth()]} ${new Date().getHours()}:${new Date().getMinutes()}`;
      push(ref(db, "/messages"), {
        uid: user.uid,
        userPic: user.photoURL,
        txt: refMessage.current.value,
        createdAt: date.toString(),
      });
      refMessage.current.value = "";
    }
  };

  useEffect(()=>{
    if (refChat.current !== null) 
    refChat.current.scrollTop = refChat.current.scrollHeight;
  },[messages])

  return (
    <>
      <section ref={refChat} className="flex-fill chat overflow-auto">
        {messages.map((ele) => {
          return (
            <span key={ele.id} className={`d-flex gap-2 mt-3 ${ele.uid===user.uid?'flex-row-reverse':''} align-items-start`}>
                {ele.uid===user.uid?'':<img className="userpic rounded-circle mt-2" alt="User Pic" src={ele.userPic} />}
              <span className="d-flex flex-column me-2">
              <span className={`vshrttxt text-muted mt-1 ${ele.uid===user.uid?'text-start':'text-end'}`}>{ele.createdAt}</span>
              <span className={`bg-secondary bg-gradient text-light msgcover ${ele.uid===user.uid?'msgcover--sent':'msgcover--received'} text-start p-2 shrttxt`}>{ele.txt}</span>
              </span>
            </span>
          );
        })}
      </section>
      <form className="d-flex gap-2 pt-2">
        <input
          className="flex-fill"
          ref={refMessage}
          placeholder="Enter message"
        />
        <button
          className="btn btn-secondary"
          onClick={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          Send
        </button>
      </form>
    </>
  );
}

export default memo(Chat);
