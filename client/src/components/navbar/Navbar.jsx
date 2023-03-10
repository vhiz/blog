import "./navbar.scss";
import LogoLight from "../../icon/logol.png";
import LogoDark from "../../icon/logod.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkmodeContext";
import Sun from "../../icon/sun.png";
import Moon from "../../icon/dark.png";
import { AuthContext } from "../../context/authContext";

export default function Navbar() {
  const { darkMode, toggle } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();

    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="contanier">
        <div className="logo">
          <Link to={"/"}>
            {darkMode ? (
              <img src={LogoDark} alt="" />
            ) : (
              <img src={LogoLight} alt="" />
            )}
          </Link>
        </div>
        <div className="mode" onClick={toggle}>
          {darkMode ? <img src={Sun} alt="" /> : <img src={Moon} alt="" />}
        </div>
        {currentUser && (
          <div className="user">
            <img
              src={
                currentUser.img ||
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGsAAACUCAMAAACjpSfyAAAANlBMVEV1dXXAwMBycnLDw8O9vb1vb2+urq66urp8fHyAgICGhoaUlJSrq6t5eXmKioqioqK0tLScnJzUXQSAAAADAUlEQVRoge2aXbOjIAyGIQTxAxX//59dsD3r1lZIJbpzZvJeevNMQhKSoFIikUgkEolEoqcgSsENGAvtNM8+hOFKWuSM/eCdMRrRhO46klX9ElBHkNbotB+vMgtW0GqQXoVXnReoqVnt2YTXmAV2cjuSRo2D5UfZPkTXvaK009p4djfCsuf8yLiOFQaqMXgAi585UwxUMJ9BiZVgfIc2ZlAPP85cMPAFVIQxuRGGEinBJh6YI7C0axlIMBQ9uBrGcWS2IbG0Zij4cJTEe8MYwqOloTicCB3RhRwH1t7HotvV/C5WLyxhHbAmYQmrjoU8LMplGcej2+xiYXULkWV8JQsmTXJhsgtDX9VxkKMwjRC13U1H7KKSTJ1dqv2GVdn63skaSc38kzXWsSDQWVjZ+JK7+ahQm2C0VF5dWFs4oCebZZba4QFKs/Km6qGI3tvU1sMoO7+taz4qVEb8ahjtAjMLx9phPNrYvLJYFgHWkS5mjj2AsuVVSlTDst8gpTPT4oaUzqZlWhIR6m9gWutRnMi3QgyldOYyi1CnuFZ6K2x43ytvQs22qkzKFkXkWHttgiXDciy7w401Z06LmWX9fXbZXDpzs3JtIjcLc9nsGK7kf5QtHLys9vA5hZsFNl+kHN+zFEylLoDvxa3F8nsK0xMH5T2lvr9+yBKuSjMzsShjUe089FRL6bF5DgxmglloPAuLOJ3Xv8YC7fkLMUZi3dbGjkvKrbJlsYIZN7f2LA7U5PeP8hlWjA8ThvFEPAKMw9vzf1kG5+7L4gjQze5r0IOmm+GLnx/Avv078RXN4DLSTs6q6DzSKJnD+b5IS87D7beTs0r/yLi8K0F1vnx/UGXccpjfAL0nblxJisbpuf2U4WC7moD4oHSZx4Pr9gcXbWpyo8h5xQSfXmyzfaNZbXpVmP7md4w9Xu/tFfO7f6IGrM2nsvAR5+mKv5qFevUfX0JllVAnS+wJVvEPIT6WpfQtTKyRcr8zsYbLA3Bj3cQRlrCEJSxhCUtYwhKWsP4n6w+3eCwEOtgFDAAAAABJRU5ErkJggg=="
              }
              alt=""
            />
          </div>
        )}
        <div className="links">
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={"/?cat=art"}
          >
            <h6>ART</h6>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={"/?cat=science"}
          >
            <h6>SCIENCE</h6>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={"/?cat=technology"}
          >
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={"/?cat=cinema"}
          >
            <h6>CINEMA</h6>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={"/?cat=design"}
          >
            <h6>DESIGN</h6>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={"/?cat=food"}
          >
            <h6>FOOD</h6>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={"/?cat=sport"}
          >
            <h6>SPORT</h6>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={"/?cat=politics"}
          >
            <h6>POLITICS</h6>
          </Link>

          {currentUser ? (
            <>
              <span>{currentUser.username}</span>
              <span onClick={handleLogout}>Logout</span>
            </>
          ) : (
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={"/login"}
            >
              <span>Login</span>
            </Link>
          )}
          <span className="write">
            <Link
              to={"/write"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
