const router = require("express").Router();
const {
  getAll,
  getOne,
  addPost,
  deletePost,
  UpdatePost,
} = require("../controllers/post");

router.get("/", getAll);
router.get("/find/:id", getOne);
router.post("/:id", addPost);
router.delete("/:id", deletePost);
router.put("/:id", UpdatePost);

module.exports = router;
