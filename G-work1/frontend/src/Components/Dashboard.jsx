// import React, { useState } from "react";
// import FileUpload from "./FileUpload";
// import Stemming from "./Stemming";
// import Tokenization from "./Tokenization";
// import SumWords from "./SumWords";
// import UniqueWords from "./UniqueWords";
// import YoutubeComments from "./YoutubeComments";
// import WordFrequency from "./WordFrequency";

// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState("stopwords");

//   const renderContent = () => {
//     switch (activeTab) {
//       case "stopwords":
//         return <FileUpload />;
//       case "stemming":
//         return <Stemming />;
//       case "tokenization":
//         return <Tokenization />;
//       case "sumwords":
//         return <SumWords />;
//       case "uniquewords":
//         return <UniqueWords />;
//       case "youtube":
//         return <YoutubeComments />;
//       case "frequency":
//         return <WordFrequency />;
//       default:
//         return <FileUpload />;
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col gap-4">
//         <h2 className="text-xl font-bold mb-6">Amharic NLP Dashboard</h2>
//         <button onClick={() => setActiveTab("stopwords")} className="hover:bg-gray-700 p-2 rounded">Stop Word Removal</button>
//         <button onClick={() => setActiveTab("stemming")} className="hover:bg-gray-700 p-2 rounded">Stemming</button>
//         <button onClick={() => setActiveTab("tokenization")} className="hover:bg-gray-700 p-2 rounded">Tokenization</button>
//         <button onClick={() => setActiveTab("sumwords")} className="hover:bg-gray-700 p-2 rounded">Sum of Words</button>
//         <button onClick={() => setActiveTab("uniquewords")} className="hover:bg-gray-700 p-2 rounded">Unique Words</button>
//         <button onClick={() => setActiveTab("youtube")} className="hover:bg-gray-700 p-2 rounded">YouTube Comments</button>
//         <button onClick={() => setActiveTab("frequency")} className="hover:bg-gray-700 p-2 rounded">Frequency of Words</button>
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 p-6">
//         {renderContent()}
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState } from "react";
import {
  FiUpload,
  FiRepeat,
  FiCode,
  FiHash,
  FiList,
  FiYoutube,
  FiBarChart2,
  FiMenu,
} from "react-icons/fi";

import FileUpload from "./FileUpload";
import Stemming from "./Stemming";
import Tokenization from "./Tokenization";
import SumWords from "./SumWords";
import UniqueWords from "./UniqueWords";
import YoutubeComments from "./YoutubeComments";
import WordFrequency from "./WordFrequency";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("stopwords");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const tabs = [
    { key: "stopwords", label: "Stop Word Removal", icon: <FiUpload /> },
    { key: "stemming", label: "Stemming", icon: <FiRepeat /> },
    { key: "tokenization", label: "Tokenization", icon: <FiCode /> },
    { key: "sumwords", label: "Sum of Words", icon: <FiHash /> },
    { key: "uniquewords", label: "Unique Words", icon: <FiList /> },
    { key: "youtube", label: "YouTube Comments", icon: <FiYoutube /> },
    { key: "frequency", label: "Frequency of Words", icon: <FiBarChart2 /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "stopwords":
        return <FileUpload />;
      case "stemming":
        return <Stemming />;
      case "tokenization":
        return <Tokenization />;
      case "sumwords":
        return <SumWords />;
      case "uniquewords":
        return <UniqueWords />;
      case "youtube":
        return <YoutubeComments />;
      case "frequency":
        return <WordFrequency />;
      default:
        return <FileUpload />;
    }
  };

  return (
    <div className="bg-gradient-to-r from-cyan-50 to-white min-h-screen">

      {/* ================= FIXED SIDEBAR ================= */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-800 text-white p-6 flex flex-col gap-4 shadow-xl transition-all duration-300 z-50
        ${sidebarOpen ? "w-72" : "w-20"}
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2
            className={`text-2xl font-extrabold mb-8 text-cyan-400 transition-all duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0 overflow-hidden"
            }`}
          >
            Amharic NLP
          </h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-cyan-300"
          >
            <FiMenu size={24} />
          </button>
        </div>

        {/* Tabs */}
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-300 relative
              ${
                activeTab === tab.key
                  ? "bg-cyan-600 shadow-lg scale-105"
                  : "hover:bg-gray-700"
              }
            `}
          >
            <span className="text-xl text-cyan-200">{tab.icon}</span>

            <span
              className={`font-semibold transition-all duration-300 ${
                sidebarOpen ? "opacity-100" : "opacity-0 overflow-hidden"
              }`}
            >
              {tab.label}
            </span>

            {activeTab === tab.key && (
              <span className="absolute left-0 h-full w-1 bg-cyan-400 rounded-tr-lg rounded-br-lg"></span>
            )}
          </button>
        ))}
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main
        className={`transition-all duration-300 p-8 ${
          sidebarOpen ? "ml-72" : "ml-20"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[80vh] hover:shadow-2xl transition-all duration-300">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;