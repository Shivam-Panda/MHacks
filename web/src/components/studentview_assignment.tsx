import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import './component.css';
const Studentview = () => {
  const [text, setText] = useState('');
  const fetchApi = (text: any) => {
import { useEffect, useState } from "react";
import { tokenToString } from 'typescript';
import './component.css';

import { Configuration, OpenAIApi } from "openai";
import { Tab } from '@mui/material';
  const configuration = new Configuration({
   organization: "org-1gnCAjr84jIVS6pho8agKwZu",
   apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = async() => {
  await openai.listEngines();
}


const Studentview = () => {

  const [message, setMessage] = useState('')

  const [updated, setUpdated] = useState(message)

  const [txt, setText] = useState('');

  const [state, setState] = useState('');
  const detectKeyDown = (ev: any) => {
    const TabCheck = ev.key;
    if (TabCheck === "0")
    getMessage() 
  }

  const getMessage = () => {
    const msg = setUpdated(message)
    console.log(msg)
  }
/* Open AI integration.
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response =  async(msg: any) => {await openai.createCompletion({
  model: "text-davinci-003",
  prompt: msg,
  max_tokens: 1000,
  temperature: 0,
})};
*/


  useEffect(()=> {
    document.addEventListener('keydown', detectKeyDown, true)
  })

  useEffect(()=> {
    document.addEventListener('keydown', detectKeyDown, true)
  })


  const fetchApi = (txt: any) => {
    return "token";
  }

  return (
    <div>
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
        <Button variant="outlined" onClick={(e) => { // ou t'est?
                  sessionStorage.setText('token', fetchApi(text));
                }}>Submit</Button>
        <input id="input" defaultValue={message}/>
        <Button variant="outlined" onClick={(e) => {// je crois en toi
          sessionStorage.setItem('token', fetchApi(txt));}}>Submit</Button>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Studentview