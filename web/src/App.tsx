import { useEffect, useState } from 'react';
import Home from './components/home';
import Login from './components/login';
import Nav from './components/nav';
// import Home from './components/home';

export enum Pages {
  HOME,
  LOGIN
}

const App = (): JSX.Element => {
  const [page, setPage] = useState<Pages>(Pages.HOME);
  const [display, setDisplay] = useState<JSX.Element>(<Home />)

  useEffect(() => {
    switch(page) {
      case Pages.HOME: 
        setDisplay(<Home />)
        break;
      case Pages.LOGIN:
        setDisplay(<Login />)
        break;
      default:
        break;
    }
    console.log(page);  
  }, [page])

  return (
    <div>
    <Nav setPage={setPage} />
    {display}
    </div>
  );
}

export default App;
