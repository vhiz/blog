import "./home.scss";
import { Link, useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../icon/loading.gif";
import ErrorIcon from "@mui/icons-material/Error";

export default function Home() {
  const location = useLocation();
  const cat = location.search;
  const {
    isLoading,
    error,
    data: posts,
  } = useQuery(["posts", cat], async () => {
    const res = await makeRequest.get(`/posts${cat}`);
    return res.data;
  });

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  return (
    <div className="home">
      {error ? (
        <ErrorIcon />
      ) : isLoading ? (
        <img src={Loading} alt="" className="loading" />
      ) : (
        <div className="posts">
          {posts.map((post) => (
            <div className="post" key={post._id}>
              <div className="img">
                <img src={post.img} alt="" />
              </div>
              <div className="contentH">
                <Link
                  to={`/post/${post._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h1>{post.title}</h1>
                </Link>
                <p>{getText(post.header)}</p>
                <button>
                  <Link
                    to={`/post/${post._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Read More
                  </Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
