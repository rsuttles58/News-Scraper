const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let NoteSchema = ({
    title:String,
    body:String
})

const Note = mongoose.model("Note",NoteSchema);

module.exports = Note;