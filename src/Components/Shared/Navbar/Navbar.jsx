// eslint-disable-next-line import/no-unresolved
// import Vite from './public/vite.svg'
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <h1 className={styles.myh1}>
      <img src="/vite.svg" alt="" />
    </h1>
  );
};

export default Navbar;
