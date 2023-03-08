import { signInWithPopup } from "firebase/auth";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { auth, provider } from "../../firebase";
import "./register.scss";
import { CircularProgress } from "@mui/material";
import Google from "../../icon/google.png";

export default function Register() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { loginGoogle, register } = useContext(AuthContext);
  const [info, setInfo] = useState({
    email: "",
    password: "",
    username: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await register(info);
      navigate("/login");
    } catch (error) {
      setError(error.response.data);
    }

    setLoading(false);
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    const google = await signInWithPopup(auth, provider);
    const info = {
      username: google.user.displayName,
      email: google.user.email,
      img: google.user.photoURL,
    };
    try {
      setLoading(true);
      await loginGoogle(info);
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }

    setLoading(false);
  };
  return (
    <div className="register">
      <h1>Register</h1>
      <form>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          required
        />
        <button onClick={handleRegister}>
          {loading ? <CircularProgress /> : "REGISTER"}
        </button>
        <span>
          Don't have an account
          <Link to={"/login"}> login</Link>
        </span>
        <div className="google" onClick={handleGoogle}>
          <img src={Google} alt="" />
          Signin With Google
        </div>
        <p>{error && error}</p>
      </form>
    </div>
  );
}
