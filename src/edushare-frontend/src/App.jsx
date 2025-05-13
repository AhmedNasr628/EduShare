import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/2-hero/Hero";
import Main from "./components/3-main/Main";
import Contact from "./components/4-contact/Contact";
import Login from "./pages/login/Login";
import { AppContext } from "./Context/AppContext";
import { useContext, useEffect } from "react";
import Post from "./pages/Posts/Post";
import Layout from "./Layout";
import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import PrivateRoute from "./PrivateRoute";

function App() {
  const { user } = useContext(AppContext);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setShowscrollBTN(true);
      } else {
        setShowscrollBTN(false);
      }
    });
  }, []);

  const [showscrollBTN, setShowscrollBTN] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <>
                  <Hero />
                  <div className="divider" />
                  <Main />
                  <div className="divider" />
                  <Contact />
                  <button
                    className="scroll-to-top"
                    onClick={() => window.scrollTo(0, 0)}
                    style={{
                      opacity: showscrollBTN ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <FaArrowUp />
                  </button>
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/posts"
            element={
              <PrivateRoute>
                <Post />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
