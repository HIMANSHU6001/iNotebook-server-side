const mongoose = require("mongoose");
const { Schema } = mongoose;

let tags = {
  Business: "#F88F15",
  Personal: "#37B7FF",
  Project: "#D8D360",
};

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: Map,
    of: String,
    default: tags,
  },
  image: {
    type: String,
    default: null,
  },
});
const User = mongoose.model("user", UserSchema);
User.createIndexes();
module.exports = User;
