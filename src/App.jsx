import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Shared/Navbar/Navbar";
import Home from "./Pages/Home/Home";

import Auth from "./Pages/Auth/Auth";

import Student from "./Pages/Auth/Student/Student";
import Admin from "./Pages/Auth/Admin/Admin";

import StudentLogin from "./Pages/Auth/Student/Login/StudentLogin";
import StudentSignup from "./Pages/Auth/Student/Signup/StudentSignup";

import AdminLogin from "./Pages/Auth/Admin/Login/AdminLogin";
import AdminSignup from "./Pages/Auth/Admin/Signup/AdminSignup";

import ComplaintForm from "./Pages/RegisterComplaint/ComplaintForm";
import About from "./Pages/AboutUs/About";

import StudentProfile from "./Pages/Profile/Student/StudentProfile";
import StudentEditProfile from "./Pages/Profile/Student/StudentEditProfile";

import AdminProfile from "./Pages/Profile/Admin/AdminProfile";
import AdminEditProfile from "./Pages/Profile/Admin/AdminEditProfile";

import ComplaintDashboardA from "./Pages/RegisteredComplaint/Admin/ComplaintDashboardA";
import ComplaintDashboardS from "./Pages/RegisteredComplaint/Student/ComplaintDashboardS";

import IndividualComplaintS from "./Pages/RegisteredComplaint/Student/IndividualComplaintS";
import IndividualComplaintA from "./Pages/RegisteredComplaint/Admin/IndividualComplaintA";

import NotFound from "./Pages/NotFound/NotFound";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />

            {/* about us route */}
            <Route exact path="/about" element={<About />} />

            <Route exact path="/auth" element={<Auth />} />

            {/* student routes */}
            <Route exact path="/auth/student" element={<Student />} />
            <Route exact path="/auth/student/login" element={<StudentLogin />} />
            <Route exact path="/auth/student/signup" element={<StudentSignup />} />

            <Route exact path="/student/profile" element={<StudentProfile />} />
            <Route exact path="/student/profile/edit" element={<StudentEditProfile />} />

            <Route
              exact
              path="/student/dashboard/allcomplaints"
              element={<ComplaintDashboardS />}
            />
            <Route
              exact
              path="/student/dashboard/complaint/:id"
              element={<IndividualComplaintS />}
            />

            {/* admin routes */}
            <Route exact path="/auth/admin" element={<Admin />} />
            <Route exact path="/auth/admin/login" element={<AdminLogin />} />
            <Route exact path="/auth/admin/signup" element={<AdminSignup />} />

            <Route exact path="/admin/profile" element={<AdminProfile />} />
            <Route exact path="/admin/profile/edit" element={<AdminEditProfile />} />

            <Route
              exact
              path="/admin/dashboard/allcomplaints"
              element={<ComplaintDashboardA />}
            />
            <Route
              exact
              path="/admin/dashboard/complaint/:id"
              element={<IndividualComplaintA />}
            />

            {/* register complaint route */}
            <Route exact path="/register/complaint" element={<ComplaintForm />} />

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
