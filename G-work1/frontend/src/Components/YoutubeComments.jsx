// import { useState } from "react";
// import axios from "axios";

// export default function YouTubeComments() {
//   const [videoUrl, setVideoUrl] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async () => {
//     if (!videoUrl.trim()) {
//       setError("Please enter YouTube video URL");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setResult(null);

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/youtube/extract-comments/",
//         { video_url: videoUrl }
//       );
//       setResult(response.data);
//     } catch (err) {
//       setError(err.response?.data?.error || "Something went wrong");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
//         <h1 className="text-3xl font-bold text-center mb-6 text-red-600">
//           YouTube Comment Extractor
//         </h1>

//         <div className="mb-6">
//           <label className="block font-semibold mb-2">YouTube Video URL</label>
//           <input
//             type="text"
//             className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
//             placeholder="Paste video URL..."
//             value={videoUrl}
//             onChange={(e) => setVideoUrl(e.target.value)}
//           />
//         </div>

//         <div className="text-center mb-4">
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition duration-300"
//           >
//             {loading ? "Fetching..." : "Extract Comments"}
//           </button>
//         </div>

//         {error && <div className="mt-4 text-red-600 text-center font-semibold">{error}</div>}

//         {result && (
//           <div className="mt-8 space-y-6">
//             <div className="bg-gray-50 p-4 rounded-xl">
//               <h2 className="font-bold text-lg mb-2 text-gray-700">Comments Text</h2>
//               <p className="whitespace-pre-wrap text-gray-800">{result.original_text}</p>
//             </div>

//             <div className="bg-green-50 p-4 rounded-xl">
//               <h2 className="font-bold text-lg mb-2 text-green-700">Unique Words ({result.unique_word_count})</h2>
//               <p className="flex flex-wrap gap-2 text-gray-800">
//                 {result.unique_words.map((w, idx) => (
//                   <span key={idx} className="bg-gray-200 px-2 py-1 rounded">{w}</span>
//                 ))}
//               </p>
//             </div>

//             <div className="bg-yellow-50 p-4 rounded-xl">
//               <h2 className="font-bold text-lg mb-2 text-yellow-800">Word Frequency</h2>
//               <div className="text-gray-800 max-h-64 overflow-y-auto">
//                 {Object.entries(result.word_frequency).map(([word, count], idx) => (
//                   <div key={idx}>
//                     {word}: {count}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import axios from "axios";
import { FiYoutube, FiSearch, FiMessageCircle, FiTrendingUp } from "react-icons/fi";

export default function YouTubeComments() {
  const [videoUrl, setVideoUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!videoUrl.trim()) {
      setError("Please enter YouTube video URL");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/youtube/extract-comments/",
        { video_url: videoUrl }
      );
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-white to-red-50 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-10 border border-red-200">

        {/* Header */}
        <div className="text-center mb-8">
          <FiYoutube className="mx-auto text-red-600" size={48} />
          <h1 className="text-4xl font-extrabold text-red-600 mt-2">
            YouTube Comment Extractor
          </h1>
          <p className="text-gray-600 mt-2">
            Extract, analyze, and explore comments instantly
          </p>
        </div>

        {/* URL Input */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-red-600">
            YouTube Video URL
          </label>
          <input
            type="text"
            className="w-full p-4 rounded-xl border border-red-200 focus:ring-2 focus:ring-red-400 focus:outline-none shadow-sm"
            placeholder="Paste YouTube video link..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>

        {/* Button */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-10 py-3 rounded-xl font-semibold text-white shadow-lg transition-all flex items-center gap-2 mx-auto
              ${loading
                ? "bg-red-400 animate-pulse"
                : "bg-red-600 hover:bg-red-700"
              }`}
          >
            <FiSearch />
            {loading ? "Fetching Comments..." : "Extract Comments"}
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

            {/* Comments */}
            <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
              <h2 className="flex items-center gap-2 font-bold text-red-700 mb-3">
                <FiMessageCircle /> Extracted Comments
              </h2>
              <p className="whitespace-pre-wrap text-gray-800 max-h-64 overflow-y-auto">
                {result.original_text}
              </p>
            </div>

            {/* Unique Words */}
            <div className="bg-white border border-red-200 p-6 rounded-2xl shadow-sm">
              <h2 className="font-bold text-red-700 mb-3">
                Unique Words ({result.unique_word_count})
              </h2>
              <div className="flex flex-wrap gap-2">
                {result.unique_words.map((w, idx) => (
                  <span
                    key={idx}
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>

            {/* Frequency */}
            <div className="bg-white border border-red-200 p-6 rounded-2xl shadow-sm">
              <h2 className="flex items-center gap-2 font-bold text-red-700 mb-3">
                <FiTrendingUp /> Word Frequency
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-72 overflow-y-auto">
                {Object.entries(result.word_frequency).map(([word, count], idx) => (
                  <div
                    key={idx}
                    className="flex justify-between bg-red-50 px-3 py-2 rounded-lg"
                  >
                    <span className="text-gray-700">{word}</span>
                    <span className="font-bold text-red-600">{count}</span>
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