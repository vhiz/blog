import "./single.scss";
import { useLocation } from "react-router-dom";
import Menu from "../../components/menu/Menu";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Error from "@mui/icons-material/Error";
import { CircularProgress } from "@mui/material";
import User from "./User";

export default function Single() {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const {
    isLoading,
    error,
    data: post,
  } = useQuery(["post", postId], async () => {
    const res = await makeRequest.get(`/posts/find/${postId}`);
    return res.data;
  });

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  return (
    <div className="single">
      {error ? (
        <Error />
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <div className="content">
            <img src={post.img} alt="" />
            <User
              userId={post.userId}
              createdAt={post.createdAt}
              postId={postId}
              post={post}
            />
            <h1>{post.title}</h1>
            <p>{getText(post.desc)}</p>
          </div>
          <Menu cat={post.cat} />
        </>
      )}
    </div>
  );
}
