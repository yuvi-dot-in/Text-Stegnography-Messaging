import React, { useState, useEffect } from 'react';
import './App.css';
import Todo from './Todo'
import { SendRounded } from '@material-ui/icons'
import { List, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import db from './firebase'
import firebase from 'firebase'
import { hideText, decode } from "./Stegno"

function Chat(props) {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [encryptedImage, setEncryptedImage] = useState(null);
  const [temp, setTemp] = useState('')

  useEffect(() => {
    db.collection(props.roomCode).orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().Text, username: doc.data().username })))
    })

  }, []);

  const readUrl = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        // console.log(e.target.result)
        // console.log(e.target.readAsText)
        setImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const handleHideText = () => {
    var result = hideText(input, image);
    setEncryptedImage(result);
    console.log(decode(result));
  }

  const addTodo = (event) => {
    event.preventDefault()
    if (input.length > 0) {
      db.collection(props.roomCode).add({
        Text: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        username: props.userName
      })
      setTodos([...todos, input])

    }
    setInput('');
  }
  return (
    <div className='chat'>
      <h1>Personal Message App</h1>
      {image &&
        <><h3>Your Image</h3><img src={image} width="50%" alt="preview image" /></>
      }
      <form>

        <Button variant="contained" component='label'>
          Upload File
          <input
            type="file"
            accept="image/png"
            hidden
            onChange={readUrl}

          />
        </Button>
        {image && <Button onClick={handleHideText} variant="outlined" color="primary">
          Hide
        </Button>}<br /><br />
        <FormControl>
          <InputLabel htmlFor="my-input">Type here</InputLabel>
          <Input value={input} autoComplete='off' onChange={event => setInput(event.target.value)} id="my-input" aria-describedby="my-helper-text" />
        </FormControl>
        <Button onClick={addTodo} type='submit' variant="contained" color="primary">
          Send  <SendRounded className='send-icon' />
        </Button><br />

        {/* <input value={input} onChange={event => setInput(event.target.value)} /> */}
        {/* <button type='submit' onClick={addTodo} >Add Todo</button> */}

      </form>

      {/* <List>
        {todos.map((todo) => (
          <Todo roomCode={props.roomCode} userName={props.userName} todo={todo} />
        ))}
      </List> */}
      {encryptedImage &&
        <><h3>Your Image</h3><img src={encryptedImage} width="50%" alt="preview image" /></>
      }
    </div>
  )
}

export default Chat
