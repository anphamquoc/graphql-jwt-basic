const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("post", PostSchema);
