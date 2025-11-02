import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Shared/Navbar";

const StudentDashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in again.");
      return;
    }

    axios
      .get("http://localhost:5000/student/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setData(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Something went wrong.")
      );
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Upload your project and inspire fellow creators</h2>
        <p>{error && <span style={{ color: "red" }}>{error}</span>}</p>
        {data && <p>Welcome, {data.userId}</p>}

        {/* Upload Button */}
        <button
          style={{
            backgroundColor: "#0d6efd",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "20px",
          }}
          onClick={() => navigate("/student/upload")}
        >
          Upload Your Project
        </button>
      </div>
    </>
  );
};

export default StudentDashboard;
