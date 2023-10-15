import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Shared/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import MultipleInputs from "./Components/Shared/Form/MultipleInputs";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/complaintForm" element={<MultipleInputs />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
