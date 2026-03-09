// import React, { useState } from "react";
// import axios from "axios";
// import { FiUpload, FiCheck, FiCopy } from "react-icons/fi";

// const FileUpload = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [processedText, setProcessedText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleFileChange = (file) => {
//     setSelectedFile(file);
//     setProcessedText("");
//     setError("");
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setError("Please select a file first.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setProcessedText("");

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/upload/",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       setProcessedText(response.data.processed_text);
//     } catch (err) {
//       console.error(err);
//       if (err.response) {
//         setError(`Server Error: ${err.response.data.error || err.response.status}`);
//       } else {
//         setError("Network Error");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(processedText);
//   };

//   return (
//     <div className="p-8 bg-gradient-to-br from-cyan-50 to-white rounded-3xl shadow-2xl w-full max-w-4xl mx-auto transition-all">
//       {/* Header */}
//       <h2 className="text-3xl font-bold mb-6 text-cyan-700 text-center">Upload & Remove Stopwords</h2>

//       {/* Step Indicator */}
//       <div className="flex justify-between items-center mb-6 text-gray-700 font-medium">
//         <span className={`${selectedFile ? "text-cyan-600" : ""}`}>1. Select File</span>
//         <span className={`${loading ? "text-cyan-600" : ""}`}>2. Upload & Process</span>
//         <span className={`${processedText ? "text-cyan-600" : ""}`}>3. View Results</span>
//       </div>

//       {/* Drag & Drop Area */}
//       <div
//         className="flex flex-col items-center justify-center mb-6 px-6 py-12 border-4 border-dashed border-cyan-300 rounded-3xl bg-cyan-50 hover:bg-cyan-100 transition-all cursor-pointer"
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={(e) => {
//           e.preventDefault();
//           handleFileChange(e.dataTransfer.files[0]);
//         }}
//         onClick={() => document.getElementById("fileInput").click()}
//       >
//         <FiUpload size={48} className="text-cyan-400 mb-4" />
//         <span className="font-semibold text-cyan-700 mb-1">
//           {selectedFile ? selectedFile.name : "Drag & Drop a file or click to select"}
//         </span>
//         <span className="text-gray-500 text-sm">Accepted: .txt, .pdf, .docx</span>
//         <input
//           id="fileInput"
//           type="file"
//           accept=".txt,.pdf,.docx"
//           onChange={(e) => handleFileChange(e.target.files[0])}
//           className="hidden"
//         />
//       </div>

//       {/* Upload Button */}
//       <div className="flex justify-center mb-6">
//         <button
//           onClick={handleUpload}
//           disabled={loading}
//           className={`px-8 py-3 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg flex items-center gap-2
//             ${loading ? "bg-cyan-400 cursor-not-allowed animate-pulse" : "bg-cyan-600 hover:bg-cyan-700"}
//           `}
//         >
//           {loading ? "Processing..." : "Upload & Process"}
//           {loading && <FiUpload className="animate-spin" />}
//         </button>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="text-red-600 bg-red-100 p-3 rounded mb-6 text-center shadow-inner">
//           {error}
//         </div>
//       )}

//       {/* Processed Text */}
//       {processedText && (
//         <div className="p-6 rounded-2xl bg-white shadow-inner border border-cyan-200 relative">
//           <h3 className="font-semibold text-cyan-700 mb-3 text-lg flex items-center gap-2">
//             <FiCheck className="text-green-500" /> Processed Text:
//           </h3>
//           <p className="whitespace-pre-wrap text-gray-800">{processedText}</p>
//           <button
//             onClick={handleCopy}
//             className="absolute top-4 right-4 text-cyan-600 hover:text-cyan-800 transition-all flex items-center gap-1"
//           >
//             <FiCopy /> Copy
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;


// import React, { useState } from "react";
// import axios from "axios";
// import { FiUpload, FiCheck, FiCopy } from "react-icons/fi";

// const FileUpload = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [originalText, setOriginalText] = useState(""); // store original text
//   const [processedText, setProcessedText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleFileChange = (file) => {
//     setSelectedFile(file);
//     setOriginalText("");
//     setProcessedText("");
//     setError("");

//     // Only read .txt files on frontend
//     const ext = file.name.split(".").pop().toLowerCase();
//     if (ext === "txt") {
//       const reader = new FileReader();
//       reader.onload = (e) => setOriginalText(e.target.result);
//       reader.readAsText(file);
//     } else {
//       setOriginalText("Original text will be extracted from backend after processing.");
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setError("Please select a file first.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setProcessedText("");

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/upload/",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       // Backend should return both original_text & processed_text
//       setOriginalText(response.data.original_text || originalText);
//       setProcessedText(response.data.processed_text);
//     } catch (err) {
//       console.error(err);
//       if (err.response) {
//         setError(`Server Error: ${err.response.data.error || err.response.status}`);
//       } else {
//         setError("Network Error");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text);
//   };

//   return (
//     <div className="p-8 bg-gradient-to-br from-cyan-50 to-white rounded-3xl shadow-2xl w-full max-w-5xl mx-auto transition-all">
//       {/* Header */}
//       <h2 className="text-3xl font-bold mb-6 text-cyan-700 text-center">Upload & Remove Stopwords</h2>

//       {/* Drag & Drop Area */}
//       <div
//         className="flex flex-col items-center justify-center mb-6 px-6 py-12 border-4 border-dashed border-cyan-300 rounded-3xl bg-cyan-50 hover:bg-cyan-100 transition-all cursor-pointer"
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={(e) => {
//           e.preventDefault();
//           handleFileChange(e.dataTransfer.files[0]);
//         }}
//         onClick={() => document.getElementById("fileInput").click()}
//       >
//         <FiUpload size={48} className="text-cyan-400 mb-4" />
//         <span className="font-semibold text-cyan-700 mb-1">
//           {selectedFile ? selectedFile.name : "Drag & Drop a file or click to select"}
//         </span>
//         <span className="text-gray-500 text-sm">Accepted: .txt, .pdf, .docx</span>
//         <input
//           id="fileInput"
//           type="file"
//           accept=".txt,.pdf,.docx"
//           onChange={(e) => handleFileChange(e.target.files[0])}
//           className="hidden"
//         />
//       </div>

//       {/* Upload Button */}
//       <div className="flex justify-center mb-6">
//         <button
//           onClick={handleUpload}
//           disabled={loading}
//           className={`px-8 py-3 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg flex items-center gap-2
//             ${loading ? "bg-cyan-400 cursor-not-allowed animate-pulse" : "bg-cyan-600 hover:bg-cyan-700"}
//           `}
//         >
//           {loading ? "Processing..." : "Upload & Process"}
//           {loading && <FiUpload className="animate-spin" />}
//         </button>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="text-red-600 bg-red-100 p-3 rounded mb-6 text-center shadow-inner">
//           {error}
//         </div>
//       )}

//       {/* Original + Processed Text */}
//       {(originalText || processedText) && (
//         <div className="grid md:grid-cols-2 gap-6">
//           {/* Original Text */}
//           <div className="p-6 rounded-2xl bg-white shadow-inner border border-cyan-200 relative">
//             <h3 className="font-semibold text-cyan-700 mb-3 text-lg flex items-center gap-2">
//               Original Text
//             </h3>
//             <p className="whitespace-pre-wrap text-gray-800">{originalText}</p>
//             {originalText && (
//               <button
//                 onClick={() => handleCopy(originalText)}
//                 className="absolute top-4 right-4 text-cyan-600 hover:text-cyan-800 transition-all flex items-center gap-1"
//               >
//                 <FiCopy /> Copy
//               </button>
//             )}
//           </div>

//           {/* Processed Text */}
//           <div className="p-6 rounded-2xl bg-white shadow-inner border border-cyan-200 relative">
//             <h3 className="font-semibold text-cyan-700 mb-3 text-lg flex items-center gap-2">
//               <FiCheck className="text-green-500" /> Processed Text
//             </h3>
//             <p className="whitespace-pre-wrap text-gray-800">{processedText}</p>
//             {processedText && (
//               <button
//                 onClick={() => handleCopy(processedText)}
//                 className="absolute top-4 right-4 text-cyan-600 hover:text-cyan-800 transition-all flex items-center gap-1"
//               >
//                 <FiCopy /> Copy
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiUpload, FiCheck, FiCopy } from "react-icons/fi";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalText, setOriginalText] = useState("");
  const [processedText, setProcessedText] = useState("");
  const [stopwords, setStopwords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load stopwords from backend on mount
  useEffect(() => {
    const fetchStopwords = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/stopwords/");
        setStopwords(response.data.stopwords || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStopwords();
  }, []);

  const handleFileChange = (file) => {
    setSelectedFile(file);
    setOriginalText("");
    setProcessedText("");
    setError("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }

    setLoading(true);
    setError("");
    setOriginalText("");
    setProcessedText("");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/upload/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const original = response.data.original_text || "";
      const processed = response.data.processed_text || "";

      setOriginalText(original);
      setProcessedText(processed);
    } catch (err) {
      console.error(err);
      if (err.response) {
        setError(`Server Error: ${err.response.data.error || err.response.status}`);
      } else {
        setError("Network Error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Highlight stopwords in original text
  const getHighlightedText = (text) => {
    if (!stopwords.length) return text;

    const words = text.split(/(\s+)/); // keep spaces
    return words.map((word, idx) => {
      const cleanWord = word.replace(/[^\w\u1200-\u137F]/g, ""); // keep Amharic chars
      if (stopwords.includes(cleanWord)) {
        return (
          <span key={idx} className="bg-red-200 text-red-800 font-semibold rounded px-1">
            {word}
          </span>
        );
      } else {
        return word;
      }
    });
  };

  return (
    <div className="p-8 bg-gradient-to-br from-cyan-50 to-white rounded-3xl shadow-2xl w-full max-w-5xl mx-auto transition-all">
      <h2 className="text-3xl font-bold mb-6 text-cyan-700 text-center">Upload & Remove Stopwords</h2>

      <div className="flex justify-between items-center mb-6 text-gray-700 font-medium">
        <span className={`${selectedFile ? "text-cyan-600" : ""}`}>1. Select File</span>
        <span className={`${loading ? "text-cyan-600" : ""}`}>2. Upload & Process</span>
        <span className={`${processedText ? "text-cyan-600" : ""}`}>3. View Results</span>
      </div>

      <div
        className="flex flex-col items-center justify-center mb-6 px-6 py-12 border-4 border-dashed border-cyan-300 rounded-3xl bg-cyan-50 hover:bg-cyan-100 transition-all cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFileChange(e.dataTransfer.files[0]);
        }}
        onClick={() => document.getElementById("fileInput").click()}
      >
        <FiUpload size={48} className="text-cyan-400 mb-4" />
        <span className="font-semibold text-cyan-700 mb-1">
          {selectedFile ? selectedFile.name : "Drag & Drop a file or click to select"}
        </span>
        <span className="text-gray-500 text-sm">Accepted: .txt, .pdf, .docx</span>
        <input
          id="fileInput"
          type="file"
          accept=".txt,.pdf,.docx"
          onChange={(e) => handleFileChange(e.target.files[0])}
          className="hidden"
        />
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`px-8 py-3 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg flex items-center gap-2
            ${loading ? "bg-cyan-400 cursor-not-allowed animate-pulse" : "bg-cyan-600 hover:bg-cyan-700"}`}
        >
          {loading ? "Processing..." : "Upload & Process"}
          {loading && <FiUpload className="animate-spin" />}
        </button>
      </div>

      {error && (
        <div className="text-red-600 bg-red-100 p-3 rounded mb-6 text-center shadow-inner">
          {error}
        </div>
      )}

      {/* Results */}
      {(originalText || processedText) && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Original Text */}
          {originalText && (
            <div className="p-6 rounded-2xl bg-white shadow-inner border border-cyan-200 relative">
              <h3 className="font-semibold text-cyan-700 mb-3 text-lg flex items-center gap-2">
                <FiCheck className="text-green-500" /> Original Text
              </h3>
              <p className="whitespace-pre-wrap text-gray-800">{getHighlightedText(originalText)}</p>
              <button
                onClick={() => handleCopy(originalText)}
                className="absolute top-4 right-4 text-cyan-600 hover:text-cyan-800 transition-all flex items-center gap-1"
              >
                <FiCopy /> Copy
              </button>
            </div>
          )}

          {/* Processed Text */}
          {processedText && (
            <div className="p-6 rounded-2xl bg-white shadow-inner border border-cyan-200 relative">
              <h3 className="font-semibold text-cyan-700 mb-3 text-lg flex items-center gap-2">
                <FiCheck className="text-green-500" /> Processed Text
              </h3>
              <p className="whitespace-pre-wrap text-gray-800">{processedText}</p>
              <button
                onClick={() => handleCopy(processedText)}
                className="absolute top-4 right-4 text-cyan-600 hover:text-cyan-800 transition-all flex items-center gap-1"
              >
                <FiCopy /> Copy
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;