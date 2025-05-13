import { useState } from "react";
import "./main.css";
import { FaArrowRight } from "react-icons/fa";
import { useEffect } from "react";

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getPosts();
    const savedUser = localStorage.getItem("user");
    const savedCourses = localStorage.getItem("courses");

    if (savedUser && savedCourses) {
      setUser(JSON.parse(savedUser));
      setCourses(JSON.parse(savedCourses));
    }
  }, []);
  async function getPosts() {
    const res = await fetch("api/posts");
    const data = await res.json();
    if (res.ok) {
      setPosts(data);
    }
  }

  const [activeCourse, setActiveCourse] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState([]);
  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  useEffect(() => {
    if (courses.length > 0) {
      setActiveCourse(courses[0].id);
    }
  }, [courses]);

  return (
    <main className="flex main">
      <section className="left-section">
        {courses.map((course) => (
          <button
            key={course.id}
            onClick={() => setActiveCourse(course.id)}
            className={activeCourse === course.id ? "active" : null}
          >
            {course.code}
          </button>
        ))}
      </section>

      <section className="right-section flex">
        <div className="filter-box">
          <select
            onChange={(e) => {
              const filter =
                e.target.value === "ALL"
                  ? posts
                  : posts.filter((post) => post.type === e.target.value);
              setFilteredPosts(filter);
            }}
          >
            <option value="ALL">All</option>
            <option value="pdf">PDF</option>
            <option value="ppt">PPT</option>
            <option value="mp4">MP4</option>
          </select>
        </div>

        {filteredPosts
          .filter((post) => post.course_id === activeCourse)
          .map((post) => {
            return (
              <div key={post.id}>
                <article className="card">
                  {post.file_path && (
                    <a
                      href={`http://127.0.0.1:8000/storage/${post.file_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        width={200}
                        src={
                          post.image_path
                            ? `http://127.0.0.1:8000/storage/${post.image_path}`
                            : `http://127.0.0.1:8000/default/${post.type}.png`
                        }
                        alt="Lecture"
                      />
                    </a>
                  )}
                  <div style={{ width: 200 }} className="box">
                    <h2 className="title">{post.title}</h2>
                    <p className="sub-title">{post.body}</p>
                    <a className="icon flex" href="#">
                      <span>
                        <p>
                          Posted by: {post.user?.first_name}{" "}
                          {post.user?.last_name}
                        </p>
                      </span>
                    </a>
                  </div>
                </article>
              </div>
            );
          })}
      </section>
    </main>
  );
};
export default Main;
