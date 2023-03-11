const { Post } = require("../model/Post");
const { verify } = require("jsonwebtoken");

const getAll = async (req, res) => {
  try {
    if (req.query.cat) {
      const posts = await Post.find({ cat: req.query.cat });
      res.status(200).json(posts.sort((a, b) => b.createdAt - a.createdAt));
    } else {
      const posts = await Post.find();
      res.status(200).json(posts.sort((a, b) => b.createdAt - a.createdAt));
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getOne = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const addPost = async (req, res) => {
  const token = req.cookies.__session;
  if (!token) return res.status(401).json("Not Authenticated");

  verify(token, process.env.KEY, async (err, payload) => {
    if (err) return res.status(403).json("Token Not Valid");
    const userId = payload.id;

    try {
      await Post.create({
        ...req.body,
        userId: userId,
      });

      res.status(201).json("Post created");
    } catch (error) {
      res.status(500).json(error.message);
    }
  });
};

const deletePost = async (req, res) => {
  const token = req.cookies.__session;
  if (!token) return res.status(401).json("Not Authenticated");

  verify(token, process.env.KEY, async (err, payload) => {
    if (err) return res.status(403).json("Token Not Valid");

    const post = await Post.findById(req.params.id);
    const userId = payload.id;

    if (post.userId !== userId)
      return res.status(403).json("You can delete only your post");

    try {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json("deleted post");
    } catch (error) {
      res.status(400).json(error.message);
    }
  });
};
const UpdatePost = async (req, res) => {
  const token = req.cookies.__session;
  if (!token) return res.status(401).json("Not Authenticated");

  verify(token, process.env.KEY, async (err, payload) => {
    if (err) return res.status(403).json("Token Not Valid");

    const post = await Post.findById(req.params.id);
    const userId = payload.id;

    if (post.userId !== userId)
      return res.status(403).json("You can update only your post");
    try {
      await Post.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("updated post");
    } catch (error) {
      res.status(400).json(error.message);
    }
  });
};

module.exports = { getAll, getOne, addPost, deletePost, UpdatePost };
