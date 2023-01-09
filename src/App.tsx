import React,{useEffect, useState} from 'react';
import fireBaseApp,{auth} from './firebase'
import { GoogleAuthProvider, signInWithPopup,signOut } from 'firebase/auth'
import {getDatabase,onValue,ref} from 'firebase/database' 
import './App.css';
import Chat from './components/Chat';

interface message{
  id:string,
  uid: string,
  userPic:string,
  txt: string,
  createdAt: string,
}

function App() {
  const db=getDatabase(fireBaseApp)
  const [messages,setMessages]=useState<message[]>([])
  const [user,setUser]=useState(auth.currentUser)

  useEffect(() => {
    const messagesRef = ref(db, "/messages");
    onValue(messagesRef, (snapshot) => {
      const messages = snapshot.val();
      const temp:message[] = [];
      for (let id in messages) {
        temp.push({ id, ...messages[id] });
      }
      setMessages(temp)
    });
  }, [db]);

  const signInWithGoogle=()=>{
    const provider=new GoogleAuthProvider();
    signInWithPopup(auth,provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if(credential!==null){
      const token = credential.accessToken;
      setUser(result.user);
    }})
  }

  const signOutWithGoogle=()=>{
    signOut(auth).then(() => {
      setUser(null)
    })
  }

  console.log('user - ',user)

  return (
    <div className="App container d-flex flex-column py-2">

      {user===null?<button className='btn btn-secondary' onClick={signInWithGoogle}>Sign In with <i className="bi bi-google"></i></button>:''}
      {user===null?'':<><div>User - {user.displayName}<button className='btn' onClick={signOutWithGoogle}>Sign Out</button></div><Chat user={user} messages={messages}/></>}
      
    </div>
  );
}

export default App;
