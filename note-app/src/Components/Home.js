import { useEffect, useState } from "react";
import Addnote from "./Addnote";
import Notes from "./Notes";
import { useRef } from "react";
import '../App.css'
import { ReactTyped } from "react-typed";

function Home(props) {
  const [username, setUsername] = useState("")
  const [userLoaded, setUserLoaded] = useState(false)
  const [loading, setLoading] = useState(true);
  let { setAlert } = props
  const target = useRef(null)
  const handleOnClick = () => {
    target.current.scrollIntoView({ behaviout: "smooth" })
  }
  const userDetails = async () => {
    if(userLoaded) return;
    try {
      let response = await fetch(`${process.env.REACT_APP_HOST}/auth/getuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });

      let data = await response.json();
      setUsername(data.username);
      setUserLoaded(true);
    } catch (error) {
      console.error(error);
      setAlert({
        isAlert: true,
        msg: "Server is waking up, please wait...",
        color: "info"
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    userDetails()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {loading && (
      <div className="backdrop-loader">
        <div className="loader-box text-center">
          <div className="spinner-border text-success mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-light mb-0">Waking up the server...<br/>Please wait !!</p>
        </div>
      </div>
    )}

      <div className="container min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center my-5">
          <h1 className="bg-transparent display-4 mb-5 fw-bold">
            <ReactTyped
              strings={[`Welcome ${username || "User"}`, "Your note-taking app is ready", "Create", "Organise", "Access"]}
              typeSpeed={60}
              backSpeed={30}
              showCursor={true}
              cursorChar="|"
              loop
            />
          </h1>
          {/* <h1 className="display-4 mb-5 fw-bold typing">Welcome {username}</h1> */}
          <p className="lead mb-4 mt-3">
            {username && `Hi, ${username}`} Your personal note-taking application is <strong>ready to use</strong>. Stay organized, capture
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
          <button onClick={handleOnClick} className="btn btn-success">Add note</button>
        </div>
      </div>

      <div className="container my-3" ref={target}>
        <Addnote setAlert={setAlert} />
        <div className="mt-5">
          <Notes setAlert={setAlert} />
        </div>
      </div>
    </>
  );
}

export default Home;
