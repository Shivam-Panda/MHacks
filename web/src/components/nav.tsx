import './nav.css';
import { Outlet, Link } from "react-router-dom";
const nav = () => {
  return (
    <>
    <div className='Nav'>
    <ul id='nav'>  
      <li>
        <a id="title" href="/home">OpenDesk</a>
      </li>
      <li>
        <a id="interface" href="/login">Login</a>
      </li>
    </ul>
    </div>
    <Outlet />
    </>
  )
}

export default nav