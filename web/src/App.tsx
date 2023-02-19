import { gql } from '@apollo/client/core';
import { useQuery } from '@apollo/client/react';
const DATA_QUERY = gql`
query {
  allSchools {
    id
  }
}
`

export enum Pages {
  HOME,
  LOGIN,
  STUDENTVIEW
}

const App = (): JSX.Element => {
  // const [page, setPage] = useState<Pages>(Pages.HOME);
  // const [display, setDisplay] = useState<JSX.Element>(<Home />)

  const { loading, error, data } = useQuery(DATA_QUERY)
  
  if(loading) return <p>Loading...</p>
  if(error) return <p>{error.message}</p>
  if(data) {
    console.log(data)
    return (
      <div>
        Works
      </div>
    )
  }

  return (
    <div>
      Hello
    </div>
  )
  


  // useEffect(() => {
  //   switch(page) {
  //     case Pages.HOME: 
  //       setDisplay(<Home />)
  //       break;
  //     case Pages.LOGIN:
  //       setDisplay(<Login />)
  //       break;
  //       case Pages.STUDENTVIEW:
  //         setDisplay(<div></div>)
  //         break;
  //     default:
  //       break;
  //   }
  // }, [page])

  // return (
  //   <div>
  //   <Nav setPage={setPage} />
  //   {display}
  //   </div>
  // );
}

export default App;
