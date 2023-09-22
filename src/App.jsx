import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Shared/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import StudentLogin from "./Components/StudentLogin";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login/student" element={<StudentLogin />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
