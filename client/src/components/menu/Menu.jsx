import Error from "@mui/icons-material/Error";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";
import "./menu.scss";

export default function Menu({ cat }) {
  const {
    isLoading,
    error,
    data: posts,
  } = useQuery(["postsmenu", cat], async () => {
    const res = await makeRequest.get(`/posts?cat=${cat}`);
    return res.data;
  });

  return (
    <>
      {error ? (
        <Error />
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        <div className="menu">
          <h1>Other posts you may like</h1>
          {posts.map((post) => (
            <div className="post" key={post._id}>
              <img src={post.img} alt="" />
              <h2>{post.title}</h2>
              <button>
                <Link
                  to={`/post/${post._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Read More
                </Link>
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
