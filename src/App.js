import { useState } from "react";
import { FileDrop } from "react-file-drop";
import { UploadCloud } from "lucide-react";
import axios from "axios";  // ✅ Import Axios
import "./App.css";

const API_BASE_URL = "https://pdf-malware-api.onrender.com"; // 🔹 Update with actual Heroku URL

export default function MalwareDetectionApp() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleDrop = (files) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  // 🔹 API Call for Prediction
  const analyzeFile = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(`${API_BASE_URL}/predict`, formData);
      setPrediction(response.data);
    } catch (error) {
      console.error("Error analyzing file:", error);
      alert("Failed to analyze PDF. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">PDF Malware Detection</h1>
        <FileDrop onDrop={handleDrop} className="file-drop">
          <div className="file-drop-content">
            <UploadCloud className="icon" />
            <p>Drag & Drop PDF here</p>
            <p>or</p>
            <input 
              type="file" 
              accept="application/pdf" 
              onChange={handleFileUpload} 
              className="hidden" 
              id="fileUpload"
            />
          </div>
        </FileDrop>
        {selectedFile && (
          <p className="selected-file">Selected File: {selectedFile.name}</p>
        )}
        <button className="upload-btn" onClick={analyzeFile}>Analyze PDF</button>

        {/* Show Prediction Result */}
        {prediction && (
          <div className="result">
            <p><strong>Prediction:</strong> {prediction.prediction}</p>
            <p><strong>Confidence:</strong> {prediction.probability[1].toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
