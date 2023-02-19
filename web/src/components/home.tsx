import { useEffect, useState } from 'react';
import './component.css';
export enum Pages {
  HOME, 
  SCHOOL
}

const Home = () => {
  const [page, setPage] = useState<Pages>(Pages.HOME);
  const [display, setDisplay] = useState<JSX.Element>(<Home />)


  return (
    <>
    <div id='Body'>
      <h1>School. Redefined.</h1>
      <br/>
      <h1 className='Enter'>Enter the future of schooling today, Open Desk</h1>
      <p className='Paragraph'>Opendesk is a LMS (Learning Management System), but its so much more. <br/> From automatic scheduling, to teacher announcements, Opendesk can do it all <br/> Furthermore, our AI-based "inspirations" can put students on the right path of creativity <br/> Make school better, make life easier.</p>
    </div>
    </>
  )
}

export default Home