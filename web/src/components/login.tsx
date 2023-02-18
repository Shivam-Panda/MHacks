import { useState } from 'react';

const Login = () => {
   const [email, setEmail] = useState('');
   const [pass, setPass] = useState('');

  return (
    <>
        <form>
            <label>Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)}id="email_login" placeholder="youremail@gmail.com" />
            <label>Password</label>
            <input value={pass} onChange={(e)=>setPass(e.target.value)}id="password_login" placeholder="*******" />
            <button type="submit">Log In</button>
        </form>
    </>
  )
}

export default Login