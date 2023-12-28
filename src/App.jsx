// import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toaster } from "sonner";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Shared/Navbar/Navbar";
import Footer from "./Components/Shared/Footer/Footer";
import Home from "./Pages/Home/Home";

import Auth from "./Pages/Auth/Auth";
import About from "./Pages/AboutUs/About";
import Login from "./Pages/Auth/Login/Login";
import Signup from "./Pages/Auth/Signup/Signup";
import Profile from "./Pages/Profile/Profile";
import ComplaintForm from "./Pages/RegisterComplaint/ComplaintForm";

import NotFound from "./Pages/NotFound/NotFound";
import Verify from "./Pages/Auth/VerifyEmail/Verify";
import EditProfile from "./Pages/Profile/EditProfile";
// import AllComplaints from "./Pages/Dashboard/AllRegisteredComplaints/AllComplaints";
import IndividualComplaint from "./Pages/Dashboard/AllRegisteredComplaints/IndividualComplaint";
import ForgotPwd from "./Pages/Auth/ForgotPassword/ForgotPwd";
import ResetPwd from "./Pages/Auth/ForgotPassword/ResetPwd";
import Dashboard from "./Pages/Dashboard/AllRegisteredComplaints/Dashboard";
import AllComplaints from "./Pages/Dashboard/AllRegisteredComplaints/AllComplaints";
import Logout from "./Pages/Auth/Logout/Logout";
import Team from "./Pages/Team/Team";
import Scrolling from "./Components/Scrolling/Scrolling";
import AllSignups from "./Pages/Dashboard/SuperAdmin/AllSignups/AllSignups";
import IndividualProfile from "./Pages/Dashboard/SuperAdmin/AllSignups/IndividualProfile";
import AllIssues from "./Pages/Dashboard/SuperAdmin/AllIssues/AllIssues";
import IndividualIssue from "./Pages/Dashboard/SuperAdmin/AllIssues/IndividualIssue";
import IndividualHostel from "./Pages/Dashboard/SuperAdmin/AllIssues/IndividualHostel";
import HostelWise from "./Pages/Dashboard/SuperAdmin/AllIssues/AllHostel";
import ClosedIssues from "./Pages/Dashboard/SuperAdmin/AllIssues/ClosedIssues";
// import HostelWise from "./Pages/Dashboard/SuperAdmin/AllIssues/AllHostel";
// import { UserContext } from "./Context/Provider";

const App = () => {
  // const isLoggedIn = useContext(UserContext)
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Scrolling>
          <div>
            <Routes>
              {/* {isLoggedIn ? (<h1>logged in</h1>) : (<p>Not Logged In</p>)} */}
              <Route exact path="/" element={<Home />} />
              {/* about us route */}
              <Route exact path="/about" element={<About />} />
              {/* first page to display login and signup buttons */}
              <Route exact path="/auth" element={<Auth />} />
              <Route exact path="/auth/login" element={<Login />} />
              <Route exact path="/auth/signup" element={<Signup />} />
              {/* verify email after signup */}
              <Route exact path="/verifyemail/:token" element={<Verify />} />{" "}
              {/* token */}
              {/* dashboard will contain all regsitered complaints so no need to have all complaints page */}
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/:role/allcomplaints" element={<AllComplaints />} />
              {/* register complaint */}
              <Route exact path="/register_complaint" element={<ComplaintForm />} />
              {/* individual complaint */}
              <Route
                exact
                path="/:role/complaint/:key"
                element={<IndividualComplaint />}
              />
              {/* profile */}
              <Route exact path="/profile" element={<Profile />} />
              {/* edit profile */}
              <Route exact path="/profile/edit" element={<EditProfile />} />
              <Route exact path="/logout" element={<Logout />} />
              {/* forgot password (it will ask for email)  */}
              <Route exact path="/forgotpassword" element={<ForgotPwd />} />
              {/*  after the user clicks on link sent on email for reseting password, it will ask for new password */}
              <Route exact path="/resetpassword/:token" element={<ResetPwd />} />
              {/* team page route */}
              <Route exact path="/team" element={<Team />} />
              {/*  SUPERADMIN ROUTES ONLY */}
              <Route exact path="/superadmin/allsignups" element={<AllSignups />} />
              <Route exact path="/superadmin/allissues" element={<AllIssues />} />
              <Route exact path="/superadmin/hostelwise" element={<HostelWise />} />
              <Route
                exact
                path="/superadmin/issues/:hostel"
                element={<IndividualHostel />}
              />
              <Route
                exact
                path="/superadmin/issues/closed/:hostel"
                element={<ClosedIssues />}
              />
              <Route exact path="/superadmin/issue/:_id" element={<IndividualIssue />} />
              <Route exact path="/profile/:_id" element={<IndividualProfile />} />
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Scrolling>

        <Footer />
      </BrowserRouter>
      <ToastContainer />
      <Toaster />
    </>
  );
};

export default App;
