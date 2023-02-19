import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './component.css';
const Studentview = () => {
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
          id="outlined-required"
          label="Submit Assignment"
          defaultValue=""
        />
    <Button variant="outlined">Submit</Button>
    </div>
    </div>
    </div>
  )
}

export default Studentview