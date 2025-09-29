import "../App.css";
import { useContext, useEffect } from "react";
import noteContext from "../Context/noteContext";
import AOS from "aos";
import "aos/dist/aos.css";

function Noteitems(props) {
  const { note, updateNote, setAlert } = props;
  const { deleteNote } = useContext(noteContext);
  const updatedTime = new Date(note.updatedAt).toLocaleString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  useEffect(() => {
    AOS.init({ duration: 800, offset: 100, once: true });
  }, []);
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
      <div key={note._id} className="col mt-2" data-aos="fade-up">
        <div className="card my-3 mx-3 w-100 glass-effect text-light position-relative">
          <div className="card-body">
            {/* <span className="position-absolute top-0 end-0 p-2 badge rounded-2 bg-dark opacity-75 badge-slit">
                        <i class="fa-solid fa-hashtag"></i> General
                    </span> */}

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
}

export default Noteitems;
