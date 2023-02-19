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
    <h1>School.</h1>
  )
}

export default Home