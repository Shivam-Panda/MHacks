import { Pages } from '../App';
import './nav.css';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<Pages>>
}

const nav = (props: Props) => {
  return ( 
    <div className='nav'>
      <ul>  
        <li>
          <a className='title' onClick={() => props.setPage(Pages.HOME)}>OpenDesk</a>
        </li>
        <li>
          <a className='element'onClick={() => props.setPage(Pages.LOGIN)}>Login</a>
        </li>
        <li>
          <a id='element' onClick={() => props.setPage(Pages.STUDENTVIEW)}>Studentview</a>
        </li>
      </ul>
    </div>
  )
}

export default nav;