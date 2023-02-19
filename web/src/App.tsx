<<<<<<< HEAD
import { useEffect, useState } from "react";
import Home from "./components/home";
import Login from "./components/login";
import Nav from "./components/nav";
import Studentview from './components/studentview_assignment';
// import Home from './components/home';
=======

import { useEffect, useState } from 'react';
import Home from './components/home';
import Login from './components/login';
import Nav from './components/nav';
import Studentview from './components/studentview_assignment';
>>>>>>> 6a1c90ecf7f769f263c6633a349a29ed5b7e7371

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
  }, [page])

  return (
    <div>
    <Nav setPage={setPage} />
    <Studentview />
    {display}
    </div>
  );
}

export default App;
