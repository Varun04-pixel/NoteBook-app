import "../App.css";
import { useContext, useState, useEffect, forwardRef, useRef } from "react";
import noteContext from "../Context/noteContext";
// eslint-disable-next-line
import AOS from "aos";
import "aos/dist/aos.css";

const Noteitems = forwardRef((props, ref) => {
  const { note, updateNote, setAlert } = props;
  const { deleteNote } = useContext(noteContext);
  const [highlight, setHighlight] = useState(false);
  const aosApplied = useRef(false);

  useEffect(() => {
    if (props.highlightTrigger === note._id) {
      setHighlight(true);

      // Remove highlight after animation
      setTimeout(() => setHighlight(false), 1200);
    }
  }, [props.highlightTrigger, note._id]);

  useEffect(() => {
    if (!aosApplied.current) {
      aosApplied.current = true;
    }
  }, []);

  const updatedTime = new Date(note.updatedAt).toLocaleString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleDelete = () => {
    deleteNote(note._id);
    setAlert({
      isAlert: true,
      msg: "Note deleted",
      color: "danger",
    });
  };

  const handleModal = () => {
    updateNote(note);
  };

  return (
    <>
      <div ref={ref} key={note._id} className={`col mt-2 ${highlight ? "highlight-flash" : ""}`} {...(!aosApplied.current && { "data-aos": "fade-up" })}
      >
        <div className="card my-3 mx-3 w-100 glass-effect text-light position-relative">
          <div className="card-body">

            <h5 className="card-title mb-3">{note.title}</h5>

            <p className="d-inline-flex gap-1">
              <button
                className="btn glass-effect"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapseExample${note._id}`}
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Description
              </button>
            </p>

            <div className="collapse" id={`collapseExample${note._id}`}>
              <div className="card card-body glass-effect">
                <p className="card-text">{note.description}</p>
              </div>
            </div>

            <p className="card-text">
              <small className="text-body-primary text-info opacity-75">
                Last updated : {updatedTime}
              </small>
            </p>

            <div className="d-flex justify-content-end">
              <i
                className="fa-solid fa-pen-to-square mx-4"
                onClick={handleModal}
              ></i>
              <i className="fa-solid fa-trash" onClick={handleDelete}></i>
            </div>

          </div>
        </div>
      </div>
    </>
  );
});

export default Noteitems;
