import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdOutlineMenu, MdDarkMode, MdOutlineLogout } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("currentMode") ?? "light"
  );
  useEffect(() => {
    if (theme === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }, [theme]);
  const { user, token, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("courses");
      navigate("/");
    }
  }

  return (
    <header className="flex">
      <button className="menu" onClick={() => setShowModal(!showModal)}>
        <MdOutlineMenu className="pop" />
      </button>
      <div />
      <nav>
        <ul className="flex">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/posts">Dashboard</Link>
          </li>
          <li>
            <form onSubmit={handleLogout}>
              <button className="log-out">
                <MdOutlineLogout className="log-out-button" />
                LogOut
              </button>
            </form>
          </li>
        </ul>
      </nav>
      {showModal && (
        <div className="fixed">
          <ul className="modal">
            <li>
              <button onClick={() => setShowModal(!showModal)}>
                <IoClose className="close" />
              </button>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/posts">Post</Link>
            </li>
            <li>
              <form onSubmit={handleLogout}>
                <button className="log-out">
                  <MdOutlineLogout className="log-out-button" />
                  LogOut
                </button>
              </form>
            </li>
          </ul>
        </div>
      )}
      <button
        onClick={() => {
          const newTheme = theme === "dark" ? "light" : "dark";
          localStorage.setItem("currentMode", newTheme);
          setTheme(newTheme);
        }}
        className="theme"
      >
        {theme === "dark" ? <MdDarkMode /> : <CiLight className="icon" />}
      </button>
    </header>
  );
};
export default Header;
