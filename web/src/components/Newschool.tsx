import { useState } from "react";
// oui oui
const Newschool = () => {
  const [Schoolname, SetSchoolname] = useState('')
  const [City, SetCity] = useState('')

  const fetchApi = (schoolname: any, location: any) => {
    return "token";
  }

    return (
      <>
    <form>
    <label>Email</label>
            <input value={Schoolname} onChange={(e)=>SetSchoolname(e.target.value)} id="schoolname" placeholder="International Academy" />
            <label>Password</label>
            <input value={City} onChange={(e)=>SetCity(e.target.value)} id="city" placeholder="Troy" />
            <button onClick={(e) => {
              sessionStorage.setItem('token', fetchApi(Schoolname, City));
            }} type="submit">Create School</button>
    </form>
    </>
  )
}

export default Newschool