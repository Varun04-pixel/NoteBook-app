import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    let initialNotes = [];

    const [notes, setNotes] = useState(initialNotes);
    // Fetch all Notes
    const getNotes = async () => {
        let response = await fetch(`${process.env.REACT_APP_HOST}/notes/getnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        let data = await response.json();
        setNotes(data);
    }

    // Add note
    const addNote = async (title, description) => {
        let response = await fetch(`${process.env.REACT_APP_HOST}/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description })
        })
        let data = await response.json();
        setNotes(notes.concat(data));
    }

    // Delete a note
    const deleteNote = async (id) => {
        let response = await fetch(`${process.env.REACT_APP_HOST}/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        // eslint-disable-next-line
        let data = await response.json();
        setNotes(notes.filter((note) => { return note._id !== id }));
    }

    // Edit note
    const editNote = async (id, title, description) => {
        let response = await fetch(`${process.env.REACT_APP_HOST}/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description })
        });
        let data = await response.json();
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === data._id) {
                element.title = data.title;
                element.description = data.description;
                element.updatedAt = data.updatedAt;
                break;
            }
        }
        setNotes([...notes]);
    }

    return (
        <noteContext.Provider value={{ notes, setNotes, getNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </noteContext.Provider>
    );
};

export default NoteState;