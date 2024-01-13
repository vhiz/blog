"use server";
import { signIn, signOut } from "@/lib/auth";
import { connectToDB } from "./utils";
import { User } from "./User";
import bcrypt from "bcryptjs";
import { Post } from "./Posts";
import { revalidatePath } from "next/cache";

export const handleGithubLogin = async (e) => {
  await signIn("github");
};
export const handleGoogleLogin = async (e) => {
  await signIn("google");
};
export const handleLogout = async (e) => {
  await signOut();
};

export const register = async (previousState, formData) => {
  const { username, email, password, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Password Do Not Match" };
  }
  const salt = bcrypt.genSaltSync(13);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    connectToDB();
    const user = await User.findOne({ email });
    if (user) {
      return { error: "User Already Exist" };
    }
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    newUser.save();
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something Went Wrong" };
  }
};

export const login = async (previousState, formData) => {
  const { username, password } = Object.fromEntries(formData);
  try {
    await signIn("credentials", { username, password });
  } catch (error) {
    if (error.message.includes("CredentialsSignin")) {
      return { error: "Invalid Credentials" };
    }
    throw error;
  }
};
export const addPost = async (previousState, formData) => {
  const { title, desc, email, img } = Object.fromEntries(formData);
  try {
    connectToDB();
    const user = await User.findOne({ email: email });
    console.log(email);
    const slug =
      Math.random().toString(36).substring(2) + Date.now().toString(36);

    const newPost = new Post({
      title,
      desc,
      slug,
      img,
      userId: user.id,
    });

    await newPost.save();
    revalidatePath("/blog");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.log(error.message);
    return { error: "Something Went Wrong" };
  }
};
export const deletePost = async (id) => {
  try {
    connectToDB();

    await Post.findByIdAndDelete(id);
    revalidatePath("/blog");
    revalidatePath("/blog/[slug]");
  } catch (error) {
    return { error: "Something Went Wrong" };
  }
  // console.log(id);
};
export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDB();
    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    revalidatePath("/admin");
    revalidatePath("/blog");
  } catch (error) {
    return { error: "Something Went Wrong" };
  }
};
