import { useState } from "react";
import { FileDrop } from "react-file-drop";
import { UploadCloud } from "lucide-react";
import "./styles.css";

export default function MalwareDetectionApp() {
  const [selectedFile, setSelectedFile] = useState(null);
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleDrop = (files) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">PDF Malware Detection</h1>
        <FileDrop onDrop={handleDrop} className="file-drop">
          <div className="file-drop-content">
            <UploadCloud className="icon" />
            <p className="file-text">Drag & Drop PDF here</p>
            <p className="or-text">or</p>
            <input 
              type="file" 
              accept="application/pdf" 
              onChange={handleFileUpload} 
              className="hidden" 
              id="fileUpload"
            />
            <label htmlFor="fileUpload" className="upload-btn">
              {selectedFile ? selectedFile.name : "Choose File"}
            </label>
          </div>
        </FileDrop>
        {selectedFile && (
          <p className="selected-file">Selected File: {selectedFile.name}</p>
        )}
        <button className="analyze-btn">Analyze PDF</button>
      </div>
    </div>
  );
}