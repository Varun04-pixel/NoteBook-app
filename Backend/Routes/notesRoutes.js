import Notes from "../DataBase/Models/Notes.js";
import express from "express";
import fetchUser from "../Middleware/fetchUser.js";

const notesRouter = express.Router();

// Get all notes of a user
notesRouter.get("/getnotes", fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user_id: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Add a new note
notesRouter.post("/addnote", fetchUser, async (req, res) => {
    try {
        const { title, description } = req.body;
        console.log(req.user.id);
        const note = await Notes.create({
            user_id: req.user.id,
            title,
            description
        })
        res.json(note)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Update an existing note
notesRouter.put("/updatenote/:id", fetchUser, async (req, res) => {
    try {
        const { title, description } = req.body;
        const newNote = {};
        if (title) {
            newNote.title = title
        }
        if (description) {
            newNote.description = description
        }
        const note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        if (note.user_id.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        const updatedNote = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(updatedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Delete an existing note
notesRouter.delete("/deletenote/:id", fetchUser, async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        if (note.user_id.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

export default notesRouter;