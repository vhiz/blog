const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    header: {
      type: String,
      required: true
    },
    cat: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);
module.exports = { Post };
