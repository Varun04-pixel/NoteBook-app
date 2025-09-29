import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactTyped } from "react-typed";
import '../App.css'

function Defaultpage() {
  const navigate = useNavigate();
  const checkToken = () => {
    if (!!localStorage.getItem("token")) {
      navigate("/home");
    }
  };
  useEffect(() => {
    checkToken();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="container noscroll min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center text-light">
          <h1 className="display-4 mb-5 fw-bold">
            <ReactTyped
              strings={["Welcome to NoteX", "Create", "Organise", "Access"]}
              typeSpeed={60}
              backSpeed={30}
              showCursor={true}
              cursorChar="|"
              loop
            />
          </h1>
          <p className="lead mb-4 mt-3">
            Your personal note-taking application. Stay organized, capture
            ideas, and manage your tasks effortlessly.
          </p>

          <div className="mb-4">
            <p>
              <strong>Create Notes:</strong> Quickly jot down your thoughts,
              to-dos, or reminders.
            </p>
            <p>
              <strong>Organize:</strong> Categorize and manage your notes
              efficiently.
            </p>
            <p>
              <strong>Search & Access:</strong> Easily find any note whenever
              you need it.
            </p>
          </div>

          <p className="mb-4">
            Start by adding a new note or explore your existing notes. Your
            productivity starts here!
          </p>

          <Link to="/signup" className="btn btn-success btn-lg">
            Sign up now
          </Link>
        </div>
      </div>
    </>
  );
}

export default Defaultpage;
