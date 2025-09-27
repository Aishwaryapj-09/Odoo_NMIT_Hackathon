const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/mydb")
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password:String,
  number: String,
  image: String
});

module.exports = mongoose.model("User", userSchema);
