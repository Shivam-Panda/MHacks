<<<<<<< HEAD
import { useEffect, useState } from "react";
import Home from "./components/home";
import Login from "./components/login";
import Nav from "./components/nav";
=======
import { useEffect, useState } from 'react';
import Home from './components/home';
import Login from './components/login';
import Nav from './components/nav';
import Studentview from './components/studentview_assignment';
// import Home from './components/home';
>>>>>>> f0b55a25943e9267d78b9e46ae0de12f9e486406

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
    Hello
    </div>
  );
}

export default App;
