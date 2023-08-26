// import axios from 'axios'
import axios from "axios";
import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom'

const HomePage = ({ onLogout }) => {
  const [file, setFile] = useState(null);

  // const navigate = useNavigate();
  const handleCLick = async () => {
    await axios.post("http://localhost:3000/api/user/logout");
    sessionStorage.removeItem("token");
    onLogout();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const exportData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/download");
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "stock_data.xlsx";
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("csvFile", file);

    try {
      await axios.post("http://localhost:3000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Data saved Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button onClick={handleCLick}>Logout</button>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      <button onClick={exportData}>export all data</button>
    </>
  );
};

export default HomePage;
