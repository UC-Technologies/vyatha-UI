import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";


import Navbar from './Components/shared/Navbar/Navbar'
import Home from "./Pages/Home/Home";
import LoginPage from "./Components/LoginPage/LoginPage";

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div>
        <LoginPage/>
          <Routes>
           
            <Route exact path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App