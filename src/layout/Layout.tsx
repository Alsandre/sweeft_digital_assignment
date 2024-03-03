import { Link } from "react-router-dom";
import styles from './laayout.module.css'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <nav className={styles.navigation}>
        <ul className={styles.links}>
          <li className={styles.link}>
            <Link to={"/"}>Home</Link>
          </li>
          <li className={styles.link}>
            <Link to={"/history"}>History</Link>
          </li>
        </ul>
      </nav>
      {children}
    </>
  );
};

export default Layout;
