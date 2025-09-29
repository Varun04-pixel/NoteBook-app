import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup(props) {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  }
  const handleOnClick = async (e) => {
    e.preventDefault();
    if (credentials.name === "" || credentials.email === "" || credentials.password === "") {
      props.setAlert({
        isAlert: true,
        msg: "Please fill your credentials",
        color: "danger"
      })
      return
    }
    let response = await fetch(`${process.env.REACT_APP_HOST}/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: credentials.name, email: credentials.email, password: credentials.password })
    });
    let data = await response.json();
    if (data.succes) {
      // Save the auth token and redirect
      localStorage.setItem('token', data.authToken)
      props.setLoggedIn(true)
      props.setAlert({
        isAlert: true,
        msg: "Successfully Signed up",
        color: 'info'
      })
      navigate('/home');
    } else {
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

  return (
    <>
      <section className="vh-100 app-theme bg-transparent">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-white glass-effect" style={{ borderRadius: "25px" }}>
                <div className="card-body">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-4 mx-1 mx-md-4">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <label className="form-label" htmlFor="name">
                              Your Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              className="form-control"
                              placeholder="Enter your name"
                              minLength={3}
                              onChange={handleOnChange}
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <label className="form-label" htmlFor="email">
                              Your Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className="form-control"
                              placeholder="Enter a valid email address"
                              onChange={handleOnChange}
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <label className="form-label" htmlFor="password">
                              Password
                            </label>
                            <input
                              type="password"
                              id="password"
                              name="password"
                              className="form-control"
                              placeholder="Enter password"
                              minLength={5}
                              onChange={handleOnChange}
                            />
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-3">
                          <label className="form-check-label" htmlFor="form2Example3">
                            Already have an account <Link style={{ color: "#4EB931" }} to="/login">Login</Link>
                          </label>
                        </div>

                        {/* Sign up button */}
                        <div className="d-flex justify-content-center mx-4 mb-2 mb-lg-4">
                          <button className="btn btn-success fs-5" onClick={handleOnClick}>Sign up</button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample illustration"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;
