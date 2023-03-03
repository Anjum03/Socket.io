import './App.css';
import io from 'socket.io-client'
import {nanoid} from "nanoid";

import {useState, useEffect} from 'react'



const socket = io.connect("http://localhost:5000")
const userName = nanoid(4);

function App() {

  const [message, setmessage] = useState('')
  const [chat, setchat] = useState([])
  
const sendchat = (e)=>{
  e.preventDefault()
  socket.emit("chat", {message, userName})
  setmessage('')
}

useEffect(()=>{
  socket.on("chat", (payload)=>{
    setchat([...chat, payload])
  })
})

  return (
    <div className="App">
      <header className="App-header">
       <h1>Join he chat</h1>

      {chat.map((payload, index)=>{
        return (
          <p key={index}>{payload.message} <span>id:{payload.userName} </span> </p>
        )
      })}

       <form onSubmit={sendchat}>
        <input type="text" name="chat"
         placeholder='Message'
          value={message}  onChange={(e)=>{
            setmessage(e.target.value)
          }} />
          <button type='submit'>Send</button>
       </form>
      </header>
    </div>
  );
}

export default App;
