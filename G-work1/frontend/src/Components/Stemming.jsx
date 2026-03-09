
// import { useState } from "react";
// import axios from "axios";

// export default function EnglishLemmatizer() {
//   const [file, setFile] = useState(null);
//   const [text, setText] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async () => {
//     setLoading(true);
//     setError("");
//     setResult(null);

//     const formData = new FormData();

//     if (file) {
//       formData.append("file", file);
//     } else if (text.trim() !== "") {
//       formData.append("text", text);
//     } else {
//       setError("Please upload a file or enter text.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/stemming/stem/", // <-- Correct endpoint
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       // Response: { original_text, stemmed_text, word_count, stemmed_word_count }
//       setResult(response.data);
//     } catch (err) {
//       setError(
//         err.response?.data?.error ||
//         "Something went wrong. Make sure Django server is running."
//       );
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
//         <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
//           English Lemmatizer System
//         </h1>

//         {/* File Upload */}
//         <div className="mb-6">
//           <label className="block font-semibold mb-2">
//             Upload Document (PDF, DOCX, TXT)
//           </label>
//           <input
//             type="file"
//             className="w-full border p-3 rounded-lg"
//             onChange={(e) => setFile(e.target.files[0])}
//           />
//         </div>

//         {/* OR Divider */}
//         <div className="text-center text-gray-500 mb-4">OR</div>

//         {/* Text Input */}
//         <div className="mb-6">
//           <label className="block font-semibold mb-2">Enter English Text</label>
//           <textarea
//             rows="5"
//             className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Enter your text here..."
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//           />
//         </div>

//         {/* Submit Button */}
//         <div className="text-center">
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition duration-300"
//           >
//             {loading ? "Processing..." : "Lemmatize Text"}
//           </button>
//         </div>

//         {/* Error */}
//         {error && (
//           <div className="mt-6 text-red-600 text-center font-semibold">
//             {error}
//           </div>
//         )}

//         {/* Result Section */}
//         {result && (
//           <div className="mt-10 space-y-6">
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
//                 Stemmed Text
//               </h2>
//               <p className="whitespace-pre-wrap text-gray-800">
//                 {result.stemmed_text}
//               </p>
//             </div>

//             <div className="flex justify-between text-sm text-gray-600">
//               <span>Word Count: {result.word_count}</span>
//               <span>Lemmatized Word Count: {result.stemmed_word_count}</span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import axios from "axios";
import { FiUploadCloud, FiFileText, FiCheckCircle, FiZap } from "react-icons/fi";

export default function EnglishLemmatizer() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();

    if (file) formData.append("file", file);
    else if (text.trim() !== "") formData.append("text", text);
    else {
      setError("Please upload a file or enter text.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/stemming/stem/",
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
            English Stemming
          </h1>
          <p className="text-gray-600 mt-2">
            Upload a document or paste text to normalize words
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
            {loading ? "Processing..." : "Stemme Text"}
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

            {/* Stemme */}
            <div className="bg-white p-5 rounded-2xl border border-cyan-300 shadow-inner">
              <h2 className="flex items-center gap-2 font-bold text-cyan-700 mb-2">
                <FiCheckCircle /> Stemme Text
              </h2>
              <p className="whitespace-pre-wrap text-gray-800">
                {result.stemmed_text}
              </p>
            </div>

            {/* Stats */}
            <div className="flex justify-between text-sm text-gray-600 bg-cyan-50 rounded-xl p-4 border border-cyan-200">
              <span>Words: {result.word_count}</span>
              <span>After Stemming: {result.stemmed_word_count}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}