import { Link, useNavigate, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import noteContext from "../Context/noteContext";
import "../App.css";

function Navbar(props) {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const { searchNote } = useContext(noteContext);
  let { loggedIn, setLoggedIn, setAlert } = props;

  const handleLogout = (e) => {
    if (e) e.preventDefault();
    e.stopPropagation();

    // Clear token and update state
    localStorage.removeItem("token");
    setLoggedIn(false);

    // Show alert
    setAlert({
      isAlert: true,
      msg: "Logged out !!",
      color: "info"
    });

    // Navigate to login page
    navigate("/");
  };

  const handleOnChange = (e) => {
    setInput(e.target.value);
  }

  const handleOnSearch = async () => {
    if (!input.trim()) return;

    const isFound = await searchNote(input.trim());

    if (!isFound) {
      // show alert
      setAlert({
        isAlert: true,
        msg: "No match found !!",
        color: "danger",
      });
    }
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg glass-effect sticky-top mx-5 border-none rounded-3">
        <div className="container-fluid">
          <NavLink className="navbar-brand text-light" to="/">
            NoteX
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-3">
              <li className="nav-item mx-3">
                <NavLink
                  className={({ isActive }) =>
                    "text-light nav-link" +
                    (isActive || window.location.pathname === "/home"
                      ? " active"
                      : "")
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    "text-light nav-link" + (isActive ? " active" : "")
                  }
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    "text-light nav-link" + (isActive ? " active" : "")
                  }
                  to="/contact"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
            <div className="d-flex mt-2" role="search">
              <form className="d-flex me-4" role="search">
                <input className="form-control me-2 glass-effect placeholder-wave" value={input} onChange={handleOnChange} onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleOnSearch();
                  }
                }} type="search" placeholder="Search notes ..." aria-label="Search" />
                <button type="button" onClick={handleOnSearch} className="btn btn-outline-success">Search</button>
              </form>
              {!loggedIn ? (
                <>
                  <Link className="btn btn-success mx-1" to="/login" role="button">
                    Login
                  </Link>
                  <Link className="btn btn-success mx-1" to="/signup" role="button">
                    SignUp
                  </Link>
                </>
              ) : (
                <button
                  type="button"
                  className="btn btn-success mx-1"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
