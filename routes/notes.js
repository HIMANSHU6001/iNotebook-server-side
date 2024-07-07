const express = require('express')
const router = express.Router();
const fetchuser = require("../middleware/fetchuser")
const Note = require("../models/Note")
const { body, validationResult } = require("express-validator");
const { useLinkClickHandler } = require('react-router-dom');



// ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: "Internal Server Error" })
    }
})

// ROUTE 2: Add a new note using: POST "/api/notes/addnote". Login Required
router.post('/addnote', fetchuser, [
    //authenticating inputs
    body('title', "Enter a Valid Title.").isLength({ min: 3 }),
    body('description', "Description must be atleast 5 charecters").isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        //If there are errors, return Bad request and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();

        res.json(savedNote);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" })
    }
}
)

// ROUTE 3: Update an existing note using: PUT "/api/notes/updatenote". Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        
        const { title, description, tag, like } = req.body;
        const newNote = {};
        console.log("updating", like);
        // setting values to be updated
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }
        if (like || !like) { newNote.fav = like }

        // finding the note to be updated
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.send(note)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" })
    }
})

// ROUTE 4: Delete an existing note using: DELETE "/api/notes/deletenote". Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // finding the note to be delete
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        // allow deletion only if user owns this note
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", "note": note })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" })
    }

})

// // ROUTE 5: Update an existing note using: PUT "/api/notes/updatenote". Login Required
// router.put('/likenote/:id', fetchuser, async (req, res) => {
//     try {
//         const { like } = req.body;
//         const userId = req.params.id;
//         let note = await Note.findById(userId);
//         if (!user) { return res.status(404).send("Not Found") }
//         if (user.id.toString() !== userId) { return res.status(401).send("Not Allowed"); }
//         note.set(fav, like)
//         note.save()
//         res.send(note)
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: "Internal Server Error" })
//     }
// })


module.exports = router 