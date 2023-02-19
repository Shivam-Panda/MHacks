import { Pages } from '../App';
import './nav.css';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<Pages>>
}

const nav = (props: Props) => {
  return (
    <>  
    <div className='Nav'>
      <ul className='navdiv'>  
        <li>
          <p id="title" onClick={() => props.setPage(Pages.HOME)}>OpenDesk</p>
        </li>
        <li>
          <p id="element" onClick={() => props.setPage(Pages.LOGIN)}>Login</p>
        </li>
        <li>
          <p id="element" onClick={() => props.setPage(Pages.STUDENTVIEW)}>Studentview</p>
        </li>
      </ul>
    </div>
    </>
  )
}

export default nav;