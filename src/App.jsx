import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";


import Navbar from './Components/shared/Navbar/Navbar'
import Home from "./Pages/Home/Home";
import Login from "./Components/LoginComponent/Login"
import Captcha from "./Components/CaptchaComponent/Captcha"


function App() {

  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/student/Login" element={<Login />} />
            <Route exact path="/Captcha/Login" element={<Captcha />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App