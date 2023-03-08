import Edit from "../../icon/edit.png";
import Delete from "../../icon/delete.png";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Error from "@mui/icons-material/Error";
import { CircularProgress } from "@mui/material";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

export default function User({ userId, createdAt, postId, post }) {
  const { isLoading, error, data } = useQuery(["user", userId], async () => {
    const res = await makeRequest.get(`/users/find/${userId}`);
    return res.data;
  });
  const queryClient = new useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(
    () => {
      return makeRequest.delete(`/posts/${postId}`);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleDelete = async (e) => {
    e.preventDefault();
    mutation.mutate();
    navigate("/");
  };

  const { currentUser } = useContext(AuthContext);
  return (
    <div className="user">
      {error ? (
        <Error />
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <img
            src={
              data.img ||
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGsAAACUCAMAAACjpSfyAAAANlBMVEV1dXXAwMBycnLDw8O9vb1vb2+urq66urp8fHyAgICGhoaUlJSrq6t5eXmKioqioqK0tLScnJzUXQSAAAADAUlEQVRoge2aXbOjIAyGIQTxAxX//59dsD3r1lZIJbpzZvJeevNMQhKSoFIikUgkEolEoqcgSsENGAvtNM8+hOFKWuSM/eCdMRrRhO46klX9ElBHkNbotB+vMgtW0GqQXoVXnReoqVnt2YTXmAV2cjuSRo2D5UfZPkTXvaK009p4djfCsuf8yLiOFQaqMXgAi585UwxUMJ9BiZVgfIc2ZlAPP85cMPAFVIQxuRGGEinBJh6YI7C0axlIMBQ9uBrGcWS2IbG0Zij4cJTEe8MYwqOloTicCB3RhRwH1t7HotvV/C5WLyxhHbAmYQmrjoU8LMplGcej2+xiYXULkWV8JQsmTXJhsgtDX9VxkKMwjRC13U1H7KKSTJ1dqv2GVdn63skaSc38kzXWsSDQWVjZ+JK7+ahQm2C0VF5dWFs4oCebZZba4QFKs/Km6qGI3tvU1sMoO7+taz4qVEb8ahjtAjMLx9phPNrYvLJYFgHWkS5mjj2AsuVVSlTDst8gpTPT4oaUzqZlWhIR6m9gWutRnMi3QgyldOYyi1CnuFZ6K2x43ytvQs22qkzKFkXkWHttgiXDciy7w401Z06LmWX9fXbZXDpzs3JtIjcLc9nsGK7kf5QtHLys9vA5hZsFNl+kHN+zFEylLoDvxa3F8nsK0xMH5T2lvr9+yBKuSjMzsShjUe089FRL6bF5DgxmglloPAuLOJ3Xv8YC7fkLMUZi3dbGjkvKrbJlsYIZN7f2LA7U5PeP8hlWjA8ThvFEPAKMw9vzf1kG5+7L4gjQze5r0IOmm+GLnx/Avv078RXN4DLSTs6q6DzSKJnD+b5IS87D7beTs0r/yLi8K0F1vnx/UGXccpjfAL0nblxJisbpuf2U4WC7moD4oHSZx4Pr9gcXbWpyo8h5xQSfXmyzfaNZbXpVmP7md4w9Xu/tFfO7f6IGrM2nsvAR5+mKv5qFevUfX0JllVAnS+wJVvEPIT6WpfQtTKyRcr8zsYbLA3Bj3cQRlrCEJSxhCUtYwhKWsP4n6w+3eCwEOtgFDAAAAABJRU5ErkJggg=="
            }
            alt=""
          />
          <div className="info">
            <span>{data.username}</span>
            <p>Posted {moment(createdAt).fromNow()}</p>
          </div>
          {currentUser && (
            <>
              {currentUser._id === userId && (
                <div className="edit">
                  <Link to={`/write?edit=${post._id}`} state={post}>
                    <img src={Edit} alt="" />
                  </Link>
                  <img onClick={handleDelete} src={Delete} alt="" />
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
