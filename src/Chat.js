import React, { useState, useEffect } from 'react';
import './App.css';
import Todo from './Todo'
import { SendRounded } from '@material-ui/icons'
import { List, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import db from './firebase'
import firebase from 'firebase'
import Encode from './encode';
import Decode from './decode';

function Chat(props) {
  const [msgPackets, setMsgPackets] = useState([]);
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [encryptedImageUri, setEncryptedImageUri] = useState(null);

  useEffect(() => {
    db.collection(props.roomCode).orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setMsgPackets(snapshot.docs.map(doc => ({ id: doc.id, Encoded: doc.data().Encoded, username: doc.data().username })))
    })



  }, []);



  const readUrl = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (e) => {

        // console.log(e.target.readAsText)
        setImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);

    }



  }

  const handleHideText = () => {
    // var result = hideText(input, image);

    var sampleMsg = "Hello";
    setEncryptedImageUri(Encode(input, image));



  }

  const addTodo = (event) => {
    event.preventDefault()
    if (input.length > 0) {
      db.collection(props.roomCode).add({
        Encoded: encryptedImageUri,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        username: props.userName
      })
      setMsgPackets([...msgPackets, input])

    }
    setInput('');
    setEncryptedImageUri('')
  }
  return (
    <div className='chat'>
      <h1>Personal Message App</h1>
      {image &&
        <><h3>Your Image</h3><img src={image} width="50%" alt="preview image" /></>
      }
      <form>

        {!image && <Button variant="contained" component='label'>
          Upload File
          <input
            type="file"
            accept="image/png"
            hidden
            onChange={readUrl}

          />
        </Button>}
        <br /><br />
        <FormControl>
          <InputLabel htmlFor="my-input">Type here</InputLabel>
          <Input value={input} autoComplete='off' onChange={event => setInput(event.target.value)} id="my-input" aria-describedby="my-helper-text" />
        </FormControl>
        {image && (!encryptedImageUri) && <Button onClick={handleHideText} variant="outlined" color="primary">
          Hide
        </Button>}
        <Button onClick={addTodo} type='submit' variant="contained" color="primary">
          Send  <SendRounded className='send-icon' />
        </Button><br />




      </form>

      {image && <List>
        {msgPackets.map((packet) => (
          <Todo roomCode={props.roomCode} orgImage={image} userName={props.userName} todo={packet} />
        ))}
      </List>}
      {encryptedImageUri &&
        <><h3>Your Text is Encrypted</h3>
          <img src={encryptedImageUri} width="50%" alt="preview image" />
          <canavas hidden></canavas>
        </>
      }
    </div>
  )
}

export default Chat
