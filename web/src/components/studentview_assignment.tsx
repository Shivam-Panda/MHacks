import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import './component.css';

//import { Configuration, OpenAIApi } from "openai";
//const configuration = new Configuration({
//    organization: "org-1gnCAjr84jIVS6pho8agKwZu",
//    apiKey: process.env.OPENAI_API_KEY,
//});
//const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();

useEffect(()=> {
  document.addEventListener('keydown', detectKeyDown, true)
})
const detectKeyDown = (ev: any) => {
  console.log("Clicked Key:", ev.key)
}
const Studentview = () => {
  const [txt, setEmail] = useState('');
  const [state, setState] = useState('');
  const fetchApi = (txt: any) => {
    return "token";
  }
  const handler = (event: any) => {
    // changing the state to the name of the key
  // which is pressed
  setState(event.key);
};
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
    <input id="input"></input>
    <Button variant="outlined" onClick={(e) => {// je crois en toi
      sessionStorage.setItem('token', fetchApi(txt));}}>Submit</Button>
    </div>
    </div>
    </>
  )
}

export default Studentview

// api key : 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
// don't worry bb
//I would never delete it bb