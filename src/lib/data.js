import { Post } from "./Posts";
import { User } from "./User";
import { connectToDB } from "./utils";

export const getPosts = async () => {
  try {
    connectToDB();
    const posts = await Post.find();

    return posts;
  } catch (error) {
    throw new Error(error);
  }
};

export const getPost = async (slug) => {
  try {
    connectToDB();
    const post = await Post.findOne({ slug });
    return post;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUser = async (id) => {
  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};
export const getUsers = async () => {
  try {
    connectToDB();
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error);
  }
};
