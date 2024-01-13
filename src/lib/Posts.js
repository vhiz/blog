const { Schema, model, models } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
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
    slug: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export const Post = models.Post || model("Post", postSchema);
