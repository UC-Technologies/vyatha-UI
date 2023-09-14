import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";


import Navbar from './Components/shared/Navbar/Navbar'
import Home from "./Pages/Home/Home";
import Login from "./Components/Login/login"
import "./Components/Login/login.scss"

function App() {

  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Components/Login/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App