// import { useState } from "react";
// import axios from "axios";

// export default function FrequencyCounter() {
//   const [text, setText] = useState("");
//   const [file, setFile] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async () => {
//     if (!text && !file) {
//       setError("Paste text or upload a file.");
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
//         "http://127.0.0.1:8000/api/frequency/count/",
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
//       <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
//         <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">
//           Word Frequency Counter
//         </h1>

//         {/* TEXT INPUT */}
//         <textarea
//           rows="5"
//           placeholder="Paste text..."
//           className="w-full border p-3 rounded mb-4"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />

//         {/* FILE INPUT */}
//         <input
//           type="file"
//           className="mb-4"
//           onChange={(e) => setFile(e.target.files[0])}
//         />

//         <div className="text-center">
//           <button
//             onClick={handleSubmit}
//             className="bg-purple-600 text-white px-6 py-2 rounded-lg"
//           >
//             {loading ? "Analyzing..." : "Analyze Frequency"}
//           </button>
//         </div>

//         {error && (
//           <p className="text-red-500 text-center mt-4">{error}</p>
//         )}

//         {/* RESULT */}
//         {result && (
//           <div className="mt-6">
//             <h2 className="font-bold text-lg text-green-600 mb-4">
//               Total Words: {result.total_words}
//             </h2>

//             <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//               {Object.entries(result.frequency).map(([word, count]) => (
//                 <div
//                   key={word}
//                   className="bg-gray-100 p-2 rounded flex justify-between"
//                 >
//                   <span>{word}</span>
//                   <span className="font-bold">{count}</span>
//                 </div>
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
import { FiUploadCloud, FiBarChart2, FiZap } from "react-icons/fi";

export default function FrequencyCounter() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!text.trim() && !file) {
      setError("Paste text or upload a file.");
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
        "http://127.0.0.1:8000/api/frequency/count/",
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
            Word Frequency Counter
          </h1>
          <p className="text-gray-600 mt-2">
            Analyze how often each word appears
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
          placeholder="Paste text..."
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
            {loading ? "Analyzing..." : "Analyze Frequency"}
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
              <h2 className="flex items-center gap-2 font-bold text-cyan-700 mb-4">
                <FiBarChart2 /> Total Words: {result.total_words}
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(result.frequency).map(([word, count]) => (
                  <div
                    key={word}
                    className="bg-white border border-cyan-300 px-3 py-2 rounded-lg flex justify-between shadow-sm"
                  >
                    <span className="text-gray-700">{word}</span>
                    <span className="font-bold text-cyan-700">{count}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}