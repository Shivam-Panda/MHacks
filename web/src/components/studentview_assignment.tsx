import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../components/component.css'
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
          required
          id="outlined-required"
          label="Submit Assignment"
          defaultValue="Start Typing Here"
        />
    </div>
    </div>
  )
}

export default Studentview