import React, { useState } from 'react';
import axios from 'axios';
import cloud from "./assets/cloud.png"

export function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const BACKEND_API = "http://localhost:4000"
  const [upload, setUpload] = useState(false)

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleUploadClick = async () => {
    try {
      const formData = new FormData();
      formData.append('xlFile', selectedFile);
      const response = await axios.post(`${BACKEND_API}/api/uploadxl`, formData);
      if(response){
        setUpload(true)
        setTimeout(()=>{
          setUpload(false)
        },3000)
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div className='w-full h-full flex flex-col items-center pt-[20px] gap-[50px]'>
    <h1 className='text-[30px] w-2/3 font-bold'>Add Candidates To Database</h1>
    {!upload?<div className='border-2 border-slate-200 w-2/3 p-4 h-[250px] justify-between flex flex-col items-center'>
      <label for="file-input" className=' h-[200px]'>
        <img className='w-[100px]' src={cloud}/>
      </label>
      <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" id='file-input' className='h-[200px] hidden text-[30px]' onChange={handleFileInputChange} />
      {selectedFile?<p className='text-[20px] font-semibold'>{selectedFile.name}</p>:"" }
      {selectedFile?<button className='px-4 bg-[#B6E388] rounded-[10px] py-2 text-[20px] font-semibold' onClick={handleUploadClick}>Upload</button>:<p className='text-[20px] font-semibold'>Upload a .xlsx or .xls file here</p> }
    </div>:
    <div className='border-2 border-slate-200 w-2/3 p-4 h-[250px] justify-between flex flex-col items-center'>
      <h1 className='text-[30px] text-green'>Thank You</h1>
      <h2 className='text-[20px]'>✔️File Successfully uploaded</h2>
      <h2 className='text-[20px]'>Your Record will be processed shortly</h2>
    </div>
    }
  </div>
    
    </>
  );
}
