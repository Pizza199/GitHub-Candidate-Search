import { NavLink } from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li className="nav-item">
          <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/SavedCandidates">Potential Candidates</NavLink>
        </li>
      </ul>
    </nav>
  )
};

export default Nav;
