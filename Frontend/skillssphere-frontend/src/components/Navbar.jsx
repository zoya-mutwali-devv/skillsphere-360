import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-item">
          Home
        </Link>

        <Link to="/create" className="nav-item create-btn-nav">
          + Create
        </Link>
      </div>
    </div>
  );
};

export default Navbar;