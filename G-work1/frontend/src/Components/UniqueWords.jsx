// import { useState } from "react";
// import axios from "axios";

// export default function UniqueWords() {
//   const [text, setText] = useState("");
//   const [file, setFile] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async () => {
//     if (!text && !file) {
//       setError("Please paste text or upload a file.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setResult(null);

//     const formData = new FormData();
//     if (text) formData.append("text", text);
//     if (file) formData.append("file", file);

//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/api/uniquewords/unique/",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       setResult(res.data);
//     } catch (err) {
//       setError(err.response?.data?.error || "Server error");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
//         <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
//           Unique Words Extractor
//         </h1>

//         {/* Text Input */}
//         <textarea
//           rows="5"
//           placeholder="Paste text here..."
//           className="w-full border p-3 rounded-lg mb-4"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />

//         {/* File Upload */}
//         <input
//           type="file"
//           className="mb-4"
//           onChange={(e) => setFile(e.target.files[0])}
//         />

//         <div className="text-center">
//           <button
//             onClick={handleSubmit}
//             className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
//           >
//             {loading ? "Processing..." : "Extract Unique Words"}
//           </button>
//         </div>

//         {error && (
//           <p className="text-red-500 text-center mt-4">{error}</p>
//         )}

//         {result && (
//           <div className="mt-6">
//             <h2 className="font-bold text-lg text-green-600">
//               Unique Words: {result.unique_count}
//             </h2>

//             <div className="flex flex-wrap gap-2 mt-4">
//               {result.unique_words.map((w, i) => (
//                 <span key={i} className="bg-gray-200 px-2 py-1 rounded">
//                   {w}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import axios from "axios";
import { FiUploadCloud, FiStar, FiZap } from "react-icons/fi";

export default function UniqueWords() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!text.trim() && !file) {
      setError("Please paste text or upload a file.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    if (file) formData.append("file", file);
    else formData.append("text", text);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/uniquewords/unique/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Make sure Django server is running.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-white to-cyan-50 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-10 border border-cyan-200">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-cyan-700">
            Unique Words Extractor
          </h1>
          <p className="text-gray-600 mt-2">
            Extract unique words from text or files
          </p>
        </div>

        {/* Upload Box */}
        <div
          className="border-2 border-dashed border-cyan-300 rounded-2xl p-8 text-center cursor-pointer hover:bg-cyan-50 transition"
          onClick={() => document.getElementById("fileInput").click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            setFile(e.dataTransfer.files[0]);
          }}
        >
          <FiUploadCloud className="mx-auto text-cyan-500" size={40} />
          <p className="mt-2 font-semibold text-cyan-700">
            {file ? file.name : "Drag & drop file or click to upload"}
          </p>
          <p className="text-sm text-gray-500">PDF, DOCX, TXT supported</p>

          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        {/* Divider */}
        <div className="text-center my-6 text-gray-400 font-semibold">OR</div>

        {/* Text Input */}
        <textarea
          rows="5"
          className="w-full p-4 rounded-xl border border-cyan-200 focus:ring-2 focus:ring-cyan-400 focus:outline-none shadow-sm"
          placeholder="Paste text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Button */}
        <div className="text-center mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-10 py-3 rounded-xl font-semibold text-white shadow-lg transition-all flex items-center gap-2 mx-auto
              ${loading
                ? "bg-cyan-400 animate-pulse"
                : "bg-cyan-600 hover:bg-cyan-700"
              }`}
          >
            <FiZap />
            {loading ? "Processing..." : "Extract Unique Words"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 text-red-600 text-center font-semibold bg-red-100 p-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="mt-10 space-y-6">

            <div className="bg-cyan-50 p-5 rounded-2xl border border-cyan-200">
              <h2 className="flex items-center gap-2 font-bold text-cyan-700 mb-3">
                <FiStar /> Unique Words: {result.unique_count}
              </h2>

              <div className="flex flex-wrap gap-2">
                {result.unique_words.map((w, i) => (
                  <span
                    key={i}
                    className="bg-white border border-cyan-300 px-3 py-1 rounded-lg text-sm shadow-sm"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}