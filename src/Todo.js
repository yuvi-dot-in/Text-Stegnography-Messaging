import { List, ListItem, ListItemText, Button } from '@material-ui/core'
import { DeleteRounded } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import Decode from './decode'
import db from './firebase'

function Todo(props) {
    const [decodedMsg, setDecodedMsg] = useState('');
    useEffect(() => {

        setDecodedMsg(Decode(props.todo.Encoded, props.orgImage));
    }, [props.todo.Encoded]);
    // const handleDecode = () => {
    //     setDecodedMsg(Decode(props.todo.Encoded, props.orgImage));
    // }

    return (
        <List className='todo_list'>
            <ListItem>

                <ListItemText primary={decodedMsg} secondary={"➖" + props.todo.username} />
                <img src={props.todo.Encoded} width='10%' hidden />
                {/* <Button onClick={handleDecode} variant="outlined" color="primary">
                    Reveal
                </Button> */}
                <DeleteRounded onClick={() => { db.collection(props.roomCode).doc(props.todo.id).delete(); }} />
                {/* <Button ></Button> */}
            </ListItem>
        </List>

        // <div>
        //     <li>{props.todo}</li>
        // </div>
    )
}

export default Todo
