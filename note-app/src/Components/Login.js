import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import '../App.css'
// import VantaBackground from "./VantaBackground";

function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (credentials.email === "" || credentials.password === "") {
      props.setAlert({
        isAlert: true,
        msg: "Please fill your credentials",
        color: "danger"
      })
      return
    }
    let response = await fetch(`${process.env.REACT_APP_HOST}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    let data = await response.json();
    if (data.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', data.authToken);
      props.setLoggedIn(true)
      props.setAlert({
        isAlert: true,
        msg: "Successfully logged in",
        color: 'info'
      })
      navigate('/home');
    } else {
      // alert("Invalid Credentials");
      let errorMessage = "Something went wrong";

      if (data.errors) {
        if (Array.isArray(data.errors)) {
          errorMessage = data.errors.map(err => err.msg).join(", ");
        } else if (typeof data.errors === "string") {
          errorMessage = data.errors;
        }
      }
      props.setAlert({
        isAlert: true,
        msg: errorMessage,
        color: "danger"
      });
    }
  }

  const handleOnChange = (e) => {
    // Handle input changes here
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className="noscroll min-vh-100 app-theme d-flex align-items-center justify-content-center overflow-hidden bg-transparent default-theme">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          {/* Image column */}
          <div className="col-md-7 col-lg-6 d-none d-md-flex justify-content-center">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone illustration"
              style={{ maxHeight: "90vh" }}
            />
          </div>

          {/* Form column */}
          <div className="col-md-7 col-lg-5 col-xl-4">
            <div className="w-100 shadow p-4 rounded glass-effect">
              <h2 className="mb-4 text-center fs-2">Login</h2>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email" name="email">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  onChange={handleOnChange}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="password" name="password">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  onChange={handleOnChange}
                />
              </div>

              <div className="mb-3 text-center">
                <span>Don&apos;t have an account? </span>
                <Link style={{ color: "#185205ff" }} to="/signup">
                  Sign up
                </Link>
              </div>

              <button type="button" className="btn btn-success fs-5 w-100" onClick={handleClick}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
