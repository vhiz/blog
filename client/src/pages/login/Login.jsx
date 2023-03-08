import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import Google from "../../icon/google.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { CircularProgress } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
export default function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, loginGoogle } = useContext(AuthContext);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(inputs);
      navigate("/");
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
    <div className="login">
      <h1>Login</h1>
      <form>
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
        <button onClick={handleLogin}>
          {loading ? <CircularProgress /> : "LOGIN"}
        </button>
        <span>
          Don't have an account
          <Link to={"/register"}>
            register
          </Link>
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
