import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Shared/Navbar";
import { useNavigate } from "react-router-dom";

const UploadProject = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    techStack: "",
    github: "",
    hosted: "",
    linkedin: "",
    courseName: "",
    courseCode: "",
    facultyName: "",
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please log in first.");
      return;
    }

    if (!file) {
      setMessage("Please select your project file (ZIP or PDF).");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (thumbnail) data.append("thumbnail", thumbnail);
    if (file) data.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/student/upload",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(res.data.message || "Project uploaded successfully!");
      setFormData({
        projectName: "",
        description: "",
        techStack: "",
        github: "",
        hosted: "",
        linkedin: "",
        courseName: "",
        courseCode: "",
        facultyName: "",
      });
      setThumbnail(null);
      setFile(null);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-content">
      <div style={{ padding: "40px", textAlign: "center", color: "white", paddingTop: "100px" }}>
        <h2>Upload Your Project</h2>

        <form
          onSubmit={handleUpload}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            width: "400px",
            margin: "auto",
            backgroundColor: "#1f1f1f",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          <input
            type="text"
            name="projectName"
            placeholder="Project Name"
            value={formData.projectName}
            onChange={handleChange}
            required
            style={{ padding: "10px", width: "100%" }}
          />
          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            required
            style={{ padding: "10px", width: "100%" }}
          />
          <input
            type="text"
            name="techStack"
            placeholder="Tech Stack (e.g. React, Node.js, MongoDB)"
            value={formData.techStack}
            onChange={handleChange}
            required
            style={{ padding: "10px", width: "100%" }}
          />
          <input
            type="text"
            name="github"
            placeholder="GitHub Link"
            value={formData.github}
            onChange={handleChange}
            style={{ padding: "10px", width: "100%" }}
          />
          <input
            type="text"
            name="hosted"
            placeholder="Hosted Link (if any)"
            value={formData.hosted}
            onChange={handleChange}
            style={{ padding: "10px", width: "100%" }}
          />
          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn Link"
            value={formData.linkedin}
            onChange={handleChange}
            style={{ padding: "10px", width: "100%" }}
          />
          <input
            type="text"
            name="courseName"
            placeholder="Course Name"
            value={formData.courseName}
            onChange={handleChange}
            required
            style={{ padding: "10px", width: "100%" }}
          />
          <input
            type="text"
            name="courseCode"
            placeholder="Course Code"
            value={formData.courseCode}
            onChange={handleChange}
            required
            style={{ padding: "10px", width: "100%" }}
          />
          <input
            type="text"
            name="facultyName"
            placeholder="Faculty Name"
            value={formData.facultyName}
            onChange={handleChange}
            required
            style={{ padding: "10px", width: "100%" }}
          />

          <label style={{ width: "100%", textAlign: "left", color: "#aaa" }}>
            Thumbnail Image:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            required
            style={{ width: "100%", padding: "6px" }}
          />

          <label style={{ width: "100%", textAlign: "left", color: "#aaa" }}>
            Project File (ZIP or PDF):
          </label>
          <input
            type="file"
            accept=".zip,.pdf"
            onChange={(e) => setFile(e.target.files[0])}
            required
            style={{ width: "100%", padding: "6px" }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#0d6efd",
              color: "white",
              padding: "12px 24px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              width: "100%",
            }}
          >
            {loading ? "Uploading..." : "Upload Project"}
          </button>
        </form>

        {message && (
          <p style={{ marginTop: "20px", color: "#00ff9d" }}>{message}</p>
        )}

        <button
          onClick={() => navigate("/student/dashboard")}
          style={{
            marginTop: "20px",
            backgroundColor: "#6c757d",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Back to Dashboard
        </button>
      </div>
    </div>  
    </>
  );
};

export default UploadProject;
