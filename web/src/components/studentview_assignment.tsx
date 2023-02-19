import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import './component.css';
const Studentview = () => {
  const [text, setText] = useState('');
  const fetchApi = (text: any) => {
    return "token";
  }
  return (
    <div>
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
              sessionStorage.setText('token', fetchApi(text));
            }}>Submit</Button>
    </div>
    </div>
    </div>
  )
}

export default Studentview