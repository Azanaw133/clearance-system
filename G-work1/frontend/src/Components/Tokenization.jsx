
// import { useState } from "react";
// import axios from "axios";

// export default function EnglishTokenizer() {
//   const [text, setText] = useState("");
//   const [file, setFile] = useState(null);   // ✅ added file state
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async () => {
//     if (!file && text.trim() === "") {
//       setError("Please enter text or upload a file.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setResult(null);

//     const formData = new FormData();

//     // ✅ If file exists, send file
//     if (file) {
//       formData.append("file", file);
//     } 
//     // ✅ Otherwise send text
//     else {
//       formData.append("text", text);
//     }

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/tokenizer/tokenize/",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       setResult(response.data);
//     } catch (err) {
//       setError(
//         err.response?.data?.error ||
//           "Something went wrong. Make sure Django server is running."
//       );
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
//         <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
//           English Text Tokenizer
//         </h1>

//         {/* ✅ File Upload Added (nothing else changed) */}
//         <div className="mb-6">
//           <label className="block font-semibold mb-2">
//             Upload File (TXT, DOCX, PDF)
//           </label>
//           <input
//             type="file"
//             className="w-full border p-3 rounded-lg"
//             onChange={(e) => setFile(e.target.files[0])}
//           />
//         </div>

//         <div className="text-center text-gray-500 mb-4">OR</div>

//         <div className="mb-6">
//           <label className="block font-semibold mb-2">Enter English Text</label>
//           <textarea
//             rows="6"
//             className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Type your text here..."
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//           />
//         </div>

//         <div className="text-center mb-4">
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition duration-300"
//           >
//             {loading ? "Tokenizing..." : "Tokenize Text"}
//           </button>
//         </div>

//         {error && (
//           <div className="mt-4 text-red-600 text-center font-semibold">
//             {error}
//           </div>
//         )}

//         {result && (
//           <div className="mt-8 space-y-6">
//             <div className="bg-gray-50 p-4 rounded-xl">
//               <h2 className="font-bold text-lg mb-2 text-gray-700">
//                 Original Text
//               </h2>
//               <p className="whitespace-pre-wrap text-gray-800">
//                 {result.original_text}
//               </p>
//             </div>

//             <div className="bg-green-50 p-4 rounded-xl">
//               <h2 className="font-bold text-lg mb-2 text-green-700">
//                 Sentences ({result.sentence_count})
//               </h2>
//               <ol className="list-decimal pl-6 text-gray-800">
//                 {result.sentences.map((s, idx) => (
//                   <li key={idx} className="mb-1">
//                     {s}
//                   </li>
//                 ))}
//               </ol>
//             </div>

//             <div className="bg-yellow-50 p-4 rounded-xl">
//               <h2 className="font-bold text-lg mb-2 text-yellow-800">
//                 Words ({result.word_count})
//               </h2>
//               <p className="flex flex-wrap gap-2 text-gray-800">
//                 {result.words.map((w, idx) => (
//                   <span
//                     key={idx}
//                     className="bg-gray-200 px-2 py-1 rounded"
//                   >
//                     {w}
//                   </span>
//                 ))}
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import axios from "axios";
import { FiUploadCloud, FiFileText, FiList, FiHash, FiZap } from "react-icons/fi";

export default function EnglishTokenizer() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!file && text.trim() === "") {
      setError("Please enter text or upload a file.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    if (file) formData.append("file", file);
    else formData.append("text", text);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/tokenizer/tokenize/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Make sure Django server is running."
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-white to-cyan-50 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-10 border border-cyan-200">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-cyan-700">
            English Tokenizer
          </h1>
          <p className="text-gray-600 mt-2">
            Split text into sentences and words instantly
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
          placeholder="Paste English text here..."
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
            {loading ? "Tokenizing..." : "Tokenize Text"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 text-red-600 text-center font-semibold bg-red-100 p-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="mt-10 space-y-6">

            {/* Original */}
            <div className="bg-cyan-50 p-5 rounded-2xl border border-cyan-200">
              <h2 className="flex items-center gap-2 font-bold text-cyan-700 mb-2">
                <FiFileText /> Original Text
              </h2>
              <p className="whitespace-pre-wrap text-gray-800">
                {result.original_text}
              </p>
            </div>

            {/* Sentences */}
            <div className="bg-white p-5 rounded-2xl border border-cyan-300 shadow-inner">
              <h2 className="flex items-center gap-2 font-bold text-cyan-700 mb-2">
                <FiList /> Sentences ({result.sentence_count})
              </h2>
              <ol className="list-decimal pl-6 text-gray-800 space-y-1">
                {result.sentences.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ol>
            </div>

            {/* Words */}
            <div className="bg-cyan-50 p-5 rounded-2xl border border-cyan-200">
              <h2 className="flex items-center gap-2 font-bold text-cyan-700 mb-3">
                <FiHash /> Words ({result.word_count})
              </h2>
              <div className="flex flex-wrap gap-2">
                {result.words.map((w, idx) => (
                  <span
                    key={idx}
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