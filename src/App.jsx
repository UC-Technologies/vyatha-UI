import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Shared/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import StudentSignUp from "./Components/StudentSignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup/student" element={<StudentSignUp />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
