import "./write.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import Upload from "../../icon/upload.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { makeRequest } from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function Write() {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, settitle] = useState(state?.title || "");
  const [header, setHeader] = useState(state?.header || "");
  const [cat, setCat] = useState(state?.cat || "");
  const [imgPrec, setImgPerc] = useState(0);
  const [img, setImg] = useState(null);
  const [posts, setPosts] = useState("");
  const navigate = useNavigate();

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new window.Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImgPerc(Math.round(progress));

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPosts((prev) => ({ ...prev, [urlType]: downloadURL }));
        });
      }
    );
  };

  useEffect(() => {
    img && uploadFile(img, "img");
  }, [img]);

  const queryClient = new useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post(`/posts`, newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const update = useMutation(
    (updatePost) => {
      return makeRequest.put(`/posts/${state._id}`, updatePost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();

    const newPost = {
      desc: value,
      img: posts.img,
      title: title,
      cat: cat,
      header: header,
    };

    const updatePost = {
      desc: value,
      img: posts.img || state.img,
      title: title,
      cat: cat,
      header: header,
    };
    try {
      state ? update.mutate(updatePost) : mutation.mutate(newPost);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => settitle(e.target.value)}
          name="title"
          value={title}
        />
        <input
          type="text"
          placeholder="Header"
          onChange={(e) => setHeader(e.target.value)}
          name="header"
          value={header}
        />
        <div className="editorContanier">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b>Draft
          </span>
          <span>
            <b>Visibility: </b>Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            name=""
            id="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
          {imgPrec > 0 ? (
            "Uploading:" + imgPrec + "%"
          ) : (
            <label className="file" htmlFor="file">
              <img src={Upload} alt="" />
            </label>
          )}
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>
              {state ? "UPDATE" : "PUBLISH"}
            </button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              id="art"
              value="art"
              onChange={(e) => setCat(e.target.value)}
              checked={cat === "art"}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              id="science"
              value="science"
              onChange={(e) => setCat(e.target.value)}
              checked={cat === "science"}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              id="technology"
              value="technology"
              onChange={(e) => setCat(e.target.value)}
              checked={cat === "technology"}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              id="cinema"
              value="cinema"
              onChange={(e) => setCat(e.target.value)}
              checked={cat === "cinema"}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              id="design"
              value="design"
              onChange={(e) => setCat(e.target.value)}
              checked={cat === "design"}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              id="food"
              value="food"
              onChange={(e) => setCat(e.target.value)}
              checked={cat === "food"}
            />
            <label htmlFor="food">Food</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              id="sport"
              value="sport"
              onChange={(e) => setCat(e.target.value)}
              checked={cat === "sport"}
            />
            <label htmlFor="sport">Sport</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              id="politics"
              value="politics"
              onChange={(e) => setCat(e.target.value)}
              checked={cat === "politics"}
            />
            <label htmlFor="politics">Politics</label>
          </div>
        </div>
      </div>
    </div>
  );
}
