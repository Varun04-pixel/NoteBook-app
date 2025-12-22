import { useContext, useState, useEffect, useRef } from "react";
import noteContext from "../Context/noteContext";
import Noteitems from "./Noteitems";
import AOS from "aos";
import "aos/dist/aos.css";
import "../App.css";

function Notes(props) {
  const { notes, getNotes, editNote, searchQuery } = useContext(noteContext);
  const [showModal, setShowModal] = useState(false);
  const [currentNote, setCurrentNote] = useState({ id: "", etitle: "", edescription: "" });
  const [highlightId, setHighlightId] = useState(null);

  const refList = useRef({});

  useEffect(() => {
    if (searchQuery && refList.current[searchQuery]) {
      refList.current[searchQuery].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

      setHighlightId(searchQuery);
    }
  }, [searchQuery]);


  if (!localStorage.getItem("token")) {
    window.location = "/login";
  }

  useEffect(() => {
    getNotes();
    AOS.init({ duration: 800, offset: 100, once: true });
    // eslint-disable-next-line
  }, []);

  const handleUpdateClick = (note) => {
    setCurrentNote({
      id: note._id,
      etitle: note.title,
      edescription: note.description,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    editNote(currentNote.id, currentNote.etitle, currentNote.edescription);
    props.setAlert({ isAlert: true, msg: "Note edited", color: "info" });
    setShowModal(false);
  };

  return (
    <>
      <div className="container">
        <h1>Your Notes</h1>

        <div className="container row row-cols-lg-3">
          {notes.length === 0 ? (
            <div className="container ms-4">
              <h4 className="my-4 rounded-2 p-2 text-center glass-effect"><small>Add a note to see it here</small></h4>
            </div>
          ) : (
            notes.map((note) => (
              <Noteitems
                key={note._id}
                ref={(el) => refList.current[note._id] = el}
                highlightTrigger={highlightId}
                note={note}
                updateNote={handleUpdateClick} // pass state-controlled function
                setAlert={props.setAlert}
              />
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          {/* Backdrop */}
          <div
            className="modal-backdrop fade show"
            style={{ zIndex: 1040 }}
            onClick={() => setShowModal(false)}
          ></div>

          {/* Modal */}
          <div
            className="modal fade show"
            style={{ display: "block", zIndex: 1050 }}
          >
            <div className="modal-dialog">
              <div className="modal-content glass-effect">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Note</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control glass-effect"
                      id="etitle"
                      name="etitle"
                      value={currentNote.etitle}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control glass-effect"
                      id="edescription"
                      name="edescription"
                      value={currentNote.edescription}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button className="btn btn-primary" onClick={handleSave}>
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </>
  );
}

export default Notes;
