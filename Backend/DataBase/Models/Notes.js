import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "",
        trim: true
    }
},
    { timestamps: true })

const Notes = mongoose.model("Notes", notesSchema);
export default Notes;