import { useEffect, useState } from 'react';
import './component.css';
import Newschool from './Newschool';
export enum Pages {
  HOME, 
  SCHOOL
}

const Home = () => {
  const [page, setPage] = useState<Pages>(Pages.HOME);
  const [display, setDisplay] = useState<JSX.Element>(<Home />)

  useEffect(() => {
    switch(page) {
      case Pages.HOME: 
        setDisplay(<Home />)
        break;
      case Pages.SCHOOL:
        setDisplay(<Newschool />)
        break;// 
      default:
        break;
    }
  }, [page])
  return (
    <div className="App">
    <div className='Body'>
      <h1 id='intro'>School. Redefined</h1>
    </div>
    <div>
      <button onClick={() => setPage(Pages.SCHOOL)} >Create New School</button>
    {display}
    </div>
  </div>
  )
}

export default Home