import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/Provider";

export const ConditionalLink = ({ to, children, ...props }) => {
  const { captchaVerified } = useContext(UserContext);
  const href = to;

  return captchaVerified === true ? (
    <a href={href} {...props}>
      {children}
    </a>
  ) : (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
};
