import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
<<<<<<< HEAD
=======
import { text } from 'stream/consumers';
>>>>>>> abf97b44de283e56bb955dbba331a122b374f93d
import { useState } from "react";
import './component.css';

const Studentview = () => {
<<<<<<< HEAD
  const [text, setText] = useState('');
  const fetchApi = (text: any) => {
=======
  const [txt, setEmail] = useState('');
  const fetchApi = (txt: any) => {
>>>>>>> abf97b44de283e56bb955dbba331a122b374f93d
    return "token";
  }
  return (
    <>
     <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    />
    <div>
    <div className='Text_Entry'>
    <TextField
          required
          id="outlined-required"// je suis ici
          label="Submit Assignment"
          defaultValue=""// qu'est-ce tu fait?
        />
    <Button variant="outlined" onClick={(e) => {
<<<<<<< HEAD
              sessionStorage.setText('token', fetchApi(text));
            }}>Submit</Button>
    </div>
=======
      sessionStorage.setItem('token', fetchApi(txt));}}>Submit</Button>
>>>>>>> abf97b44de283e56bb955dbba331a122b374f93d
    </div>
    </div>
    </>
  )
}

export default Studentview