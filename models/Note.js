const mongoose = require('mongoose')
const { Schema } = mongoose;
const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,  //Like a forign key. Links the note with the associated user.
        ref: 'user'
    },  
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tag:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    },
    fav:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('notes',NotesSchema)