import { useContext, useState, useEffect, useRef } from "react";
import noteContext from "../Context/noteContext";
import Noteitems from "./Noteitems";
import AOS from "aos";
import "aos/dist/aos.css";

function Notes(props) {
  // eslint-disable-next-line
  const { notes, getNotes, editNote } = useContext(noteContext);
  if (!localStorage.getItem("token")) {
    window.location = "/login";
  }
  useEffect(() => {
    getNotes();
    AOS.init({ duration: 800, offset: 100, once: true });
    // eslint-disable-next-line
  }, []);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "" });
  const ref = useRef(null);
  const refclose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description
    });
  };
  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription);
    refclose.current.click();
    props.setAlert({
      isAlert: true,
      msg: "Note edited",
      color: "info"
    })
  };
  return (
    <>
      <div className="container">
        <h1 className="">Your Notes</h1>
        <button
          type="button"
          ref={ref}
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Update
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content glass-effect">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Modal title
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control glass-effect"
                      name="etitle"
                      value={note.etitle}
                      onChange={handleOnChange}
                      id="etitle"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control glass-effect"
                      name="edescription"
                      value={note.edescription}
                      onChange={handleOnChange}
                      id="edescription"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  ref={refclose}
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container row row-cols-lg-3">
          {notes.length === 0 ? <h3>Add a note to see it here</h3> : notes.map((note) => {
            return (
              <Noteitems key={note._id} note={note} updateNote={updateNote} setAlert={props.setAlert} />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Notes;
