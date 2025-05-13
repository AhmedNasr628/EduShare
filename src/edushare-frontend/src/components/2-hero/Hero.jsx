import "./hero.css";

import Lottie from "lottie-react";
import deveAnimation from "../../animation/deve.json";
import { useEffect, useState } from "react";

const Hero = () => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedCourses = localStorage.getItem("courses");

    if (savedUser && savedCourses) {
      setUser(JSON.parse(savedUser));
      setCourses(JSON.parse(savedCourses));
    }
  }, []);
  return (
    <section className="hero flex">
      <div className="hero-left">
        <div className="image flex">
          <img src="./edu.png" alt="Logo" />
        </div>
        {user ? (
          <>
            <h1 className="title">Welcome, {user.first_name} to EduShare.</h1>
            <p className="subtitle">
              EduShare is a simple and collaborative platform where college
              students can upload and share their own lecture summaries,
              <br /> helping each other study better through shared notes and
              videos.
            </p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="hero-right">
        <Lottie
          className="animation-hero"
          style={{ height: 350 }}
          animationData={deveAnimation}
        />
      </div>
    </section>
  );
};
export default Hero;
