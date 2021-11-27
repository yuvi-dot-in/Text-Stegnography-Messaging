import React, { useState, useEffect } from 'react';
import { List, Button, ListItem, ListItemText, FormControl, Input, InputLabel } from '@material-ui/core'
import db from './firebase'
import { SendRounded } from '@material-ui/icons'
import Chat from './Chat'
import randomString from 'random-string'
function App() {


  const [room, setRoom] = useState('')
  const [verified, setVerified] = useState(false)
  const [user, setUser] = useState('')

  const createRoom = (event) => {
    event.preventDefault();
    setVerified(true);
  }
  const closeRoom = (event) => {
    setVerified(false);
  }
  const deleteChat = (event) => {

    db.collection(room).onSnapshot(snapshot => {
      snapshot.docs.forEach(doc => {
        db.collection(room).doc(doc.id).delete()
          .catch(err => console.log(err))
      })
      setVerified(false)
    })

  }


  return (
    <div className="App">

      <h1>Chat Room Code</h1>
      <form>
        <FormControl>
          <InputLabel htmlFor="my-input">Room code</InputLabel>
          <Input value={room} autoComplete='off' onChange={event => setRoom(event.target.value)} id="my-input" aria-describedby="my-helper-text" />
        </FormControl><br />
        <FormControl>
          <InputLabel htmlFor="user">Your Name</InputLabel>
          <Input value={user} autoComplete='off' onChange={event => setUser(event.target.value)} id="user" />
        </FormControl><br />
        <Button disabled={verified} type="submit" onClick={createRoom} variant="contained" color="primary">
          Go
        </Button>
      </form>

      {verified ? <Chat roomCode={room} userName={user} /> : <h1>Enter Valid Room Code</h1>}
      {verified ? null : <h4>
        <List>
          <ListItem>
            <ListItemText primary='New user! Then enter A new code acording to your wish' />
          </ListItem>
          <ListItem>
            <ListItemText primary='Use the same code when you come back again or If refreshed your page' secondary='Your previous chat will be loaded' />
          </ListItem>
          <ListItem>
            <ListItemText primary='Delete the chat if you dont need it in future' />
          </ListItem>

        </List>
      </h4>}

      <Button disabled={!verified} onClick={closeRoom} variant="contained" color="primary">
        Close Chat
      </Button>
      <Button disabled={!verified} onClick={deleteChat} variant='contained' color='secondary' >Delete Chat</Button>
      <br />
      <br />



    </div>
  );
}

export default App;
