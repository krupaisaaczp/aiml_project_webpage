import { useState } from "react";
import { FileDrop } from "react-file-drop";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { UploadCloud } from "lucide-react";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">PDF Malware Detection</h1>
        <FileDrop
          onDrop={handleDrop}
          className="border-2 border-dashed border-gray-300 p-10 rounded-lg bg-white cursor-pointer"
        >
          <div className="flex flex-col items-center">
            <UploadCloud className="w-10 h-10 text-gray-500" />
            <p className="mt-2 text-gray-600">Drag & Drop PDF here</p>
            <p className="text-gray-400 text-sm">or</p>
            <input 
              type="file" 
              accept="application/pdf" 
              onChange={handleFileUpload} 
              className="hidden" 
              id="fileUpload"
            />
            <label htmlFor="fileUpload" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
              Upload File
            </label>
          </div>
        </FileDrop>
        {selectedFile && (
          <CardContent className="mt-4">
            <p className="text-gray-700 font-medium">Selected File: {selectedFile.name}</p>
          </CardContent>
        )}
        <Button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white">Analyze PDF</Button>
      </Card>
    </div>
  );
}