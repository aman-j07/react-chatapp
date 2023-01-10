import React, { useEffect, useState } from "react";
import fireBaseApp, { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import "./App.css";
import Chat from "./components/Chat";

interface message {
  id: string;
  uid: string;
  userPic: string;
  txt: string;
  createdAt: string;
}

function App() {
  const db = getDatabase(fireBaseApp);
  const [messages, setMessages] = useState<message[]>([]);
  const [user, setUser] = useState<any>(auth.currentUser);

  useEffect(() => {
    const messagesRef = ref(db, "/messages");
    onValue(messagesRef, (snapshot) => {
      const messages = snapshot.val();
      const temp: message[] = [];
      for (let id in messages) {
        temp.push({ id, ...messages[id] });
      }
      setMessages(temp);
    });
  }, [db]);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential !== null) {
        setUser(result.user);
      }
    });
  };

  const signOutWithGoogle = () => {
    signOut(auth).then(() => {
      setUser(null);
    });
  };

  return (
    <div className="App container d-flex flex-column p-2">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">
            Chatify
          </span>
          {user === null ? (
        <button className="btn text-light" onClick={signInWithGoogle}>
          Sign In with <i className="bi bi-google"></i>
        </button>
      ) : (
        <span className="d-flex align-items-center text-light"><img src={user.photoURL} className='userpic me-2' alt='userpic'/>{user.displayName}
        <button className="btn ms-2 text-light" onClick={signOutWithGoogle}>
              Sign Out
            </button></span>
      )}
        </div>
      </nav>
      {user === null ? <div className="flex-fill d-flex align-items-center justify-content-center"><h2>Sign In to join the chat!! :)</h2></div> : <Chat user={user} messages={messages} />}
    </div>
  );
}

export default App;
