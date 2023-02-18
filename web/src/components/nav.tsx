import { Pages } from '../App';
import './nav.css';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<Pages>>
}

const nav = (props: Props) => {
  return (
    <div className='Nav'>
      <ul id='nav'>  
        <li>
          <p id="title" onClick={() => props.setPage(Pages.HOME)}>OpenDesk</p>
        </li>
        <li>
          <p id="title" onClick={() => props.setPage(Pages.LOGIN)}>Login</p>
        </li>
      </ul>
    </div>
  )
}

export default nav;