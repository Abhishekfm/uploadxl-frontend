import React, { useState } from 'react';
import axios from 'axios';

export function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const BACKEND_API = "http://localhost:4000"

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleUploadClick = async () => {
    try {
      const formData = new FormData();
      formData.append('xlFile', selectedFile);
      const response = await axios.post(`${BACKEND_API}/api/uploadxl`, formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} formEncType="multipart/form-data" />
      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
}
