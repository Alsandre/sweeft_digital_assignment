import { Link } from "react-router-dom";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/history"}>History</Link>
          </li>
        </ul>
      </nav>
      {children}
    </>
  );
};

export default Layout;
