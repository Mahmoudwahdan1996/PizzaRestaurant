import classes from "../../styles/login.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const LoginPage = () => {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      console.log(process.env.NODE_ENV);
      await axios.post(`/api/login`, {
        userName,
        password,
      });
      router.push("/admin");
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h1>Admin Dashboard</h1>
        <input
          placeholder="user name"
          type="text"
          required
          className={classes.input}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          placeholder="password"
          type="password"
          required
          className={classes.input}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit} className={classes.button}>
          Log In
        </button>

        {error && <span className={classes.error}>Wrong Credential</span>}
      </div>
    </div>
  );
};

export default LoginPage;
