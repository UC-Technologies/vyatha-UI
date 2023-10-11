import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";


import Navbar from './Components/shared/Navbar/Navbar';
import Home from "./Pages/Home/Home";
import LoginPage from "./Components/FirstPage/FirstPage";
import LoginPage2 from "./Components/LoginPage/LoginPage";

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
              <Route path="/" element={<LoginPage/>} />
              <Route path="/login" element={<LoginPage2/>} ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App