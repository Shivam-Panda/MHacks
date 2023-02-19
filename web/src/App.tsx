import { useEffect, useState } from 'react';
import Home from './components/home';
import Login from './components/login';
import Nav from './components/nav';
import Studentview from './components/studentview_assignment';

export enum Pages {
  HOME,
  LOGIN,
  STUDENTVIEW
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
        case Pages.STUDENTVIEW:
          setDisplay(<Studentview />)
          break;
      default:
        break;
    }
  }, [page])

  return (
    <div>
    <Nav setPage={setPage} />
    {display}
    </div>
  );
}

export default App;
