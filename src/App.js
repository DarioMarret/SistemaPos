import React, {useState} from 'react'
import { withRouter } from 'react-router-dom'
import Cookies from 'universal-cookie'
import Login from './components/paginas/Login'
import Sidebar from './ui/Sidebar'
import Routes from '../src/Routes/Routes'

const cookie = new Cookies();

function App(props) {
  const {location} = props
  const [login, setlogin] = useState(null)
  let path = location.pathname;
  let id = path.split("/");
  let url = id[1];

  return (
    <>

        {login || cookie.get("usuario") ? (
          <div className="md:flex min-h-screen">
            {url !== 'platillos'
              ?
              <Sidebar /> : ''}
            <div className="md:w-3/5 xl:w-4/5 p-1">
              <Routes/>
            </div>
          </div>
      ) : <Login setlogin={setlogin}/>}

    

    </>


  );
}

export default withRouter(App);
