import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/Provider";

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    document.title = "Home | Vyatha";
    if (isLoggedIn === true) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  return <div>Home</div>;
};

export default Home;
