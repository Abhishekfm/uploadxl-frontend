import React, { useState } from 'react';
import axios from 'axios';

export function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const BACKEND_API = "http://localhost:4000"
  const [url, setUrl] = useState("")

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleUploadClick = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "carimagecloud");
      formData.append("cloud_name", process.env.CLOUD_NAME);
      formData.append("api_key", process.env.CLOUD_API_KEY);
      const url_res = await axios.post("https://api.cloudinary.com/v1_1/dl7dfvlz8/image/upload", formData)
      if(!url_res){
        return
      }else{
        console.log(url_res);
        setUrl(url_res.data.url)
      }
      const response = await axios.post(`${BACKEND_API}/api/uploadxl`, url);
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
