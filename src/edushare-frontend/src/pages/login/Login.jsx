import { FaLock, FaUser } from "react-icons/fa";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { useContext, useState } from "react";

const Login = () => {
  const { setToken , user } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    national_id: "",
    password: "",
  });
  const [errors, setErrors] = useState();

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    if (data.message) {
      setErrors(data.message);
    } else {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("courses", JSON.stringify(data.courses));
      navigate("/home");
    }
  }
  return (
    <div className="login-background">
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="form-group">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={formData.national_id}
              onChange={(e) =>
                setFormData({ ...formData, national_id: e.target.value })
              }
            />
            <FaUser />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <FaLock />
          </div>
          {errors && <p className="error">{errors}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
