import { useContext, useState } from "react";
import noteContext from "../Context/noteContext";

function Addnote(props) {
    let { setAlert } = props
    const { addNote } = useContext(noteContext)
    const [note, setNote] = useState({ title: "", description: "" })

    const handleOnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description)
        setNote({ title: "", description: "" })
        setAlert({
            isAlert: true,
            msg: "Note added !!",
            color: "info"
        })
    }

    return (
        <>
            <div className="container border rounded-4 p-5 glass-effect">
                <h1>Add note</h1>
                <div className="container mt-3">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control glass-effect" value={note.title} name="title" onChange={handleOnChange} id="title" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" className="form-control glass-effect" value={note.description} name="description" onChange={handleOnChange} id="description" />
                        </div>
                        <button type="submit" className="btn btn-success" onClick={handleClick}>Add Note</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Addnote;