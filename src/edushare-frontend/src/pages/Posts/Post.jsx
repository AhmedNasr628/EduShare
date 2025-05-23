import { useCallback, useState } from "react";
import "./post.css";
import { AppContext } from "../../Context/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Post = () => {
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();
  const { token , user } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    type: "",
    file: null,
    course_id: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedCourses = localStorage.getItem("courses");

    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    }
  }, []);

  async function handlePost(e) {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("body", formData.body);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("file", formData.file);
    formDataToSend.append("course_id", formData.course_id);

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataToSend,
    });
    const data = await res.json();
    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/home");
    }
  }

  return (
    <section className="post">
      <h1 className="title">Create a new post</h1>

      <form onSubmit={handlePost} className="form-group-post">
        <div>
          
          <select
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          >
            <option value="" disabled>
              Select The Lecture
            </option>
            <option value="Lecture 1">Lecture 1</option>
            <option value="Lecture 2">Lecture 2</option>
            <option value="Lecture 3">Lecture 3</option>
            <option value="Lecture 4">Lecture 4</option>
            <option value="Lecture 5">Lecture 5</option>
            <option value="Lecture 6">Lecture 6</option>
            <option value="Lecture 7">Lecture 7</option>
            <option value="Lecture 8">Lecture 8</option>
            <option value="Lecture 9">Lecture 9</option>
            <option value="Lecture 10">Lecture 10</option>
            <option value="Lecture 11">Lecture 11</option>
            <option value="Lecture 12">Lecture 12</option>
            <option value="Lecture 13">Lecture 13</option>
            <option value="Lecture 14">Lecture 14</option>
            <option value="Lecture 15">Lecture 15</option>
          </select>
        </div>
        {
          // @ts-ignore
          errors.title && <p className="error">{errors.title[0]}</p>
        }

        <div>
          <textarea
            placeholder="Post Content"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          ></textarea>
        </div>
        {
          // @ts-ignore
          errors.body && <p className="error">{errors.body[0]}</p>
        }
        <div>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="" disabled>
              Select The Type
            </option>
            <option value="pdf">pdf</option>
            <option value="ppt">ppt</option>
            <option value="mp4">mp4</option>
          </select>
          {
            // @ts-ignore
            errors.type && <p className="error">{errors.type[0]}</p>
          }
          <div>
            <br />
            <select
              value={formData.course_id}
              onChange={(e) =>
                setFormData({ ...formData, course_id: e.target.value })
                
              }
            >
              <option value="" disabled>
                Select The Course
              </option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code}
                </option>
              ))}
            </select>
            {
              // @ts-ignore
              errors.course_id && <p className="error">{errors.course_id[0]}</p>
            }
          </div>
        </div>
        <label>Upload</label>
        <input
          type="file"
          name="file"
          id="file"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, file: e.target.files[0] }))
          }
        />
        {
          // @ts-ignore
          errors.file && <p className="error">{errors.file[0]}</p>
        }

        <button className="primary-btn">Create</button>
      </form>
    </section>
  );
};

export default Post;
