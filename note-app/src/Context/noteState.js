import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    let initialNotes = [];

    const [notes, setNotes] = useState(initialNotes);
    const [searchQuery, setSearchQuery] = useState(null);
    const [user, setUser] = useState(null);
    const [userLoaded, setUserLoaded] = useState(false);

    const getUser = async () => {
        if (userLoaded) return; // already fetched check

        try {
            const res = await fetch(`${process.env.REACT_APP_HOST}/auth/getuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                }
            });

            const data = await res.json();
            setUser(data);
            setUserLoaded(true);
        } catch (err) {
            console.error(err);
        }
    };

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

    // Search Notes
    const searchNote = async (query) => {
        let response = await fetch(`${process.env.REACT_APP_HOST}/notes/searchnotes?q=${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        let data = await response.json();

        if (data.length > 0) {
            setSearchQuery(null);
            setTimeout(() => {
                setSearchQuery(data[0]._id);
            }, 0);
        } else {
            setSearchQuery(null);
        }

        return data.length > 0;
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
        <noteContext.Provider value={{ notes, setNotes, getNotes, addNote, deleteNote, editNote, searchQuery, searchNote, user, userLoaded, getUser }}>
            {props.children}
        </noteContext.Provider>
    );
};

export default NoteState;