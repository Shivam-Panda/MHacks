import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { text } from 'stream/consumers';
import { useState } from "react";
import './component.css';

const Studentview = () => {
  const [txt, setEmail] = useState('');
  const fetchApi = (txt: any) => {
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
          required// hey
          id="outlined-required"
          label="Submit Assignment"
          defaultValue=""
        />
    <Button variant="outlined" onClick={(e) => {
      sessionStorage.setItem('token', fetchApi(txt));}}>Submit</Button>
    </div>
    </div>
    </>
  )
}

export default Studentview

// api key : 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
// i would never delete it bb
// don't worry bb