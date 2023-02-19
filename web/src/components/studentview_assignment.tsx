import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
    
    <TextField
          required// hey
          id="outlined-required"
          label="Submit Assignment"
          defaultValue="Hello World"
        />
    </div>
    </div>
  )
}

export default Studentview