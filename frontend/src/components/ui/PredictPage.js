import React, { useState, useRef, useEffect } from "react";
import Header from "./Header";
import { FaUpload, FaTrash, FaRobot, FaDownload, FaTable, FaSpinner, FaChartBar } from "react-icons/fa";

export default function PredictPage() {
  const [csvContent, setCsvContent] = useState(null);
  const [fileName, setFileName] = useState("");
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const fileInputRef = useRef(null);
  const tableRef = useRef(null);

  // Simulated progress for visual feedback
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 300);
      
      return () => clearInterval(interval);
    } else if (uploadProgress > 0 && !isLoading) {
      setUploadProgress(100);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  }, [isLoading]);

  // Scroll to results when predictions are available
  useEffect(() => {
    if (predictionResult && tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [predictionResult]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".csv")) {
      setFileName(file.name);
      setIsLoading(true);
      
      try {
        const text = await file.text();
        const rows = text.trim().split("\n").map((row) => row.split(","));
        
        // Simulate network delay for better UX
        setTimeout(() => {
          setCsvContent(rows);
          setPredictionResult(null); // clear old prediction if any
          setIsLoading(false);
          setShowSuccessAnimation(true);
          setTimeout(() => setShowSuccessAnimation(false), 2000);
        }, 1000);
      } catch (error) {
        console.error("Error reading file:", error);
        setIsLoading(false);
        alert("Error reading the CSV file. Please try again.");
      }
    } else {
      alert("Please upload a valid CSV file");
    }
  };

  const handleDelete = () => {
    setCsvContent(null);
    setFileName("");
    setPredictionResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePredict = async () => {
    const fileInput = fileInputRef.current;
    const file = fileInput.files[0];
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.predictions) {
        // Simulate processing time for better UX
        setTimeout(() => {
          setPredictionResult(result.predictions);
          setIsLoading(false);
          setShowSuccessAnimation(true);
          setTimeout(() => setShowSuccessAnimation(false), 2000);
        }, 1500);
      } else {
        setIsLoading(false);
        alert("Prediction failed: " + result.error);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      alert("Server error!");
    }
  };

  const handleDownload = () => {
    if (!csvContent || !predictionResult) return;

    const header = csvContent[0];
    const rows = csvContent.slice(1);
    const extendedHeader = [...header, "Prediction"];
    const extendedRows = rows.map((row, idx) => [...row, predictionResult[idx] || ""]);

    const csvString =
      [extendedHeader, ...extendedRows]
        .map((row) => row.map((cell) => `"${cell}"`).join(","))
        .join("\n");

    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "predicted_results.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Combine CSV data + predictions
  const getCombinedRows = () => {
    if (!csvContent) return [];
    const header = csvContent[0];
    const rows = csvContent.slice(1);
    const extendedHeader = predictionResult ? [...header, "Prediction"] : header;
    const extendedRows = predictionResult
      ? rows.map((row, idx) => [...row, predictionResult[idx] || ""])
      : rows;
    return [extendedHeader, ...extendedRows];
  };

  // Calculate statistics for visualization
  const getStatistics = () => {
    if (!predictionResult) return null;
    
    const counts = {};
    predictionResult.forEach(result => {
      counts[result] = (counts[result] || 0) + 1;
    });
    
    return {
      total: predictionResult.length,
      anomalies: predictionResult.filter(r => r !== "normal" && r !== "0").length,
      normal: predictionResult.filter(r => r === "normal" || r === "0").length,
      types: counts
    };
  };
  
  const stats = getStatistics();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center px-4 py-12">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Grid lines */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            {[...Array(10)].map((_, i) => (
              <div 
                key={`h-${i}`}
                className="absolute bg-cyan-400"
                style={{
                  top: `${(i / 10) * 100}%`,
                  left: 0,
                  width: '100%',
                  height: '1px',
                  boxShadow: '0 0 4px 0.5px rgba(0, 255, 255, 0.5)',
                }}
              />
            ))}
            {[...Array(10)].map((_, i) => (
              <div 
                key={`v-${i}`}
                className="absolute bg-blue-400"
                style={{
                  top: 0,
                  left: `${(i / 10) * 100}%`,
                  width: '1px',
                  height: '100%',
                  boxShadow: '0 0 4px 0.5px rgba(0, 100, 255, 0.5)',
                }}
              />
            ))}
          </div>
          
          {/* Floating particles */}
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                animation: `float ${Math.random() * 10 + 5}s linear infinite`
              }}
            />
          ))}
        </div>

        <div className="w-full max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8 text-center drop-shadow-lg">
            Predict Network Anomalies
          </h1>

          <div className="w-full bg-white/5 border border-cyan-600/30 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-[0_0_45px_rgba(0,255,255,0.15)] relative overflow-hidden">
            {/* Animated gradient border */}
            <div 
              className="absolute -inset-0.5 rounded-3xl z-0 opacity-20"
              style={{
                background: 'linear-gradient(90deg, #0891b2, #4f46e5, #0891b2)',
                backgroundSize: '200% auto',
                animation: 'gradient-x 3s linear infinite',
                filter: 'blur(4px)'
              }}
            ></div>
            
            <div className="relative z-10">
              {/* File Upload */}
              <div className="mb-8">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                  id="csvInput"
                  ref={fileInputRef}
                />
                
                <label 
                  htmlFor="csvInput"
                  className="block cursor-pointer border-2 border-dashed border-cyan-500/50 rounded-2xl p-8 md:p-10 text-center transition-all hover:border-cyan-400 hover:bg-cyan-500/5 group"
                >
                  <div className="flex flex-col items-center justify-center">
                    <FaUpload className="text-4xl text-cyan-400 mb-4 group-hover:text-cyan-300 transition-colors" />
                    <span className="text-xl font-medium text-cyan-300 group-hover:text-cyan-200 transition-colors">
                      {fileName ? fileName : "Click to Upload CSV File"}
                    </span>
                    <p className="mt-2 text-gray-400 text-sm max-w-md mx-auto">
                      Upload your network traffic data in CSV format to detect anomalies using our KNN-based machine learning model
                    </p>
                  </div>
                </label>
              </div>

              {/* Upload Progress */}
              {uploadProgress > 0 && (
                <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}

              {/* Success Animation */}
              {showSuccessAnimation && (
                <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                  <div className="bg-green-500/20 backdrop-blur-md p-8 rounded-full">
                    <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
              )}

              {/* CSV Preview */}
              {csvContent && (
                <div className="mt-8" ref={tableRef}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div className="flex items-center">
                      <FaTable className="text-cyan-400 mr-2" />
                      <h2 className="text-xl font-semibold text-cyan-300">Data Preview</h2>
                    </div>
                    <div className="text-sm text-gray-400 bg-black/20 px-3 py-1 rounded-full">
                      {csvContent.length - 1} rows × {csvContent[0]?.length || 0} columns
                    </div>
                  </div>
                  
                  <div className="max-h-80 overflow-auto border border-white/10 rounded-lg bg-white/5 shadow-inner">
                    <table className="table-auto w-full text-sm">
                      <thead className="sticky top-0 z-10">
                        <tr>
                          {getCombinedRows()[0].map((header, idx) => (
                            <th key={idx} className="px-2 py-2 border border-gray-700 text-cyan-300 bg-gray-800/90 backdrop-blur-sm">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {getCombinedRows()
                          .slice(1, 100) // Limit to first 100 rows for performance
                          .map((row, i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors">
                              {row.map((cell, j) => (
                                <td
                                  key={j}
                                  className={`px-2 py-1 border border-gray-700 ${
                                    j === row.length - 1 && predictionResult
                                      ? cell !== "normal" && cell !== "0"
                                        ? "text-red-400 font-medium"
                                        : "text-green-400"
                                      : "text-gray-300"
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    {getCombinedRows().length > 100 && (
                      <div className="text-center text-gray-500 mt-2 text-sm">
                        Showing first 100 rows of {getCombinedRows().length - 1} total rows
                      </div>
                    )}
                  </div>

                  {/* Statistics Cards (only show when predictions are available) */}
                  {stats && (
                    <div className="mt-8">
                      <div className="flex items-center mb-4">
                        <FaChartBar className="text-cyan-400 mr-2" />
                        <h2 className="text-xl font-semibold text-cyan-300">Prediction Results</h2>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white/5 border border-cyan-600/30 rounded-xl p-6 flex flex-col items-center justify-center">
                          <div className="text-4xl font-bold text-cyan-400 mb-2">{stats.total}</div>
                          <div className="text-gray-400 text-sm">Total Packets</div>
                        </div>
                        <div className="bg-white/5 border border-green-600/30 rounded-xl p-6 flex flex-col items-center justify-center">
                          <div className="text-4xl font-bold text-green-400 mb-2">{stats.normal}</div>
                          <div className="text-gray-400 text-sm">Normal Traffic</div>
                        </div>
                        <div className="bg-white/5 border border-red-600/30 rounded-xl p-6 flex flex-col items-center justify-center">
                          <div className="text-4xl font-bold text-red-400 mb-2">{stats.anomalies}</div>
                          <div className="text-gray-400 text-sm">Anomalies Detected</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Anomaly Type Breakdown */}
                  {stats && stats.anomalies > 0 && (
                    <div className="mt-6 bg-white/5 border border-purple-600/30 rounded-xl p-6">
                      <h3 className="text-lg font-medium text-purple-400 mb-4">Anomaly Types</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {Object.entries(stats.types)
                          .filter(([type]) => type !== "normal" && type !== "0")
                          .map(([type, count], index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10 flex flex-col items-center justify-center">
                              <div className="text-2xl font-semibold text-red-400 mb-1">{count}</div>
                              <div className="text-xs text-gray-400 truncate text-center" title={type}>
                                {type}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <button
                      onClick={handlePredict}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all flex items-center gap-2 min-w-[180px] justify-center"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <FaRobot />
                          Predict Anomalies
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleDelete}
                      className="px-6 py-3 border border-red-500 text-red-400 font-medium rounded-xl hover:bg-red-500/10 transition-all flex items-center gap-2 min-w-[160px] justify-center"
                    >
                      <FaTrash />
                      Delete CSV
                    </button>

                    {predictionResult && (
                      <button
                        onClick={handleDownload}
                        className="px-6 py-3 border border-green-500 text-green-400 font-medium rounded-xl hover:bg-green-500/10 transition-all flex items-center gap-2 min-w-[180px] justify-center"
                      >
                        <FaDownload />
                        Download Results
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Add custom animations */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-5px) translateX(3px); }
            50% { transform: translateY(0) translateX(5px); }
            75% { transform: translateY(5px) translateX(3px); }
          }
          
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    </>
  );
}
