import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts'; // Recharts for charting
import Header from "./Header";

// Colors for the Pie Chart slices
const COLORS = ['#00C49F', '#FF8042', '#FFBB28', '#0088FE', '#AF19FF', '#FF00FF'];

export default function App() {
  const [logs, setLogs] = useState([]);
  const [chartData, setChartData] = useState({
    predictionCounts: {},
    protocolCounts: {},
    timeSeries: [],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:5000/realtime")
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            let currentBatchTotalPackets = 0;
            let currentBatchAnomalies = 0;
            let currentBatchPredictionCounts = { ...chartData.predictionCounts };
            let currentBatchProtocolCounts = { ...chartData.protocolCounts };

            const formattedLogs = data.map((item) => {
              if (item.error) return `❌ Error: ${item.error}`;
              currentBatchTotalPackets++;

              const predictionType = item.prediction || "Unknown";
              currentBatchPredictionCounts[predictionType] =
                (currentBatchPredictionCounts[predictionType] || 0) + 1;
              if (predictionType !== "Normal") currentBatchAnomalies++;

              const protocolType = item.protocol_type || "Other";
              currentBatchProtocolCounts[protocolType] =
                (currentBatchProtocolCounts[protocolType] || 0) + 1;

              return `🌐 ${item.src_ip || 'N/A'} ➡ ${item.dst_ip || 'N/A'} | Length: ${item.length || 'N/A'} | Protocol: ${protocolType} | Prediction: ${predictionType}`;
            });

            setLogs((prev) => [...prev, ...formattedLogs].slice(-50));

            const newTimeSeriesPoint = {
              time: new Date().toLocaleTimeString(),
              totalPackets: currentBatchTotalPackets,
              anomalies: currentBatchAnomalies,
            };

            setChartData((prevChartData) => {
              const updatedTimeSeries = [...prevChartData.timeSeries, newTimeSeriesPoint].slice(-20);
              return {
                predictionCounts: currentBatchPredictionCounts,
                protocolCounts: currentBatchProtocolCounts,
                timeSeries: updatedTimeSeries,
              };
            });
          }
        })
        .catch((err) => {
          console.error("Polling error:", err);
          setLogs((prev) => [...prev, `❌ Connection Error: ${err.message}`].slice(-50));
        });
    }, 5000);

    return () => clearInterval(interval);
  }, [chartData.predictionCounts, chartData.protocolCounts, chartData.timeSeries]);

  const pieChartData = Object.keys(chartData.predictionCounts).map(key => ({
    name: key,
    value: chartData.predictionCounts[key]
  }));

  const barChartData = Object.keys(chartData.protocolCounts).map(key => ({
    name: key,
    count: chartData.protocolCounts[key]
  }));

  const stackedBarData = chartData.timeSeries.map(item => ({
    time: item.time,
    Anomalies: item.anomalies,
    Normal: item.totalPackets - item.anomalies
  }));

  const radarData = barChartData.map(d => ({
    subject: d.name,
    A: d.count,
  }));

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-cyan-300 font-sans flex flex-col items-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-6 text-center drop-shadow-lg">
          🔴 Real-Time Anomaly Detection
        </h1>

        <div className="w-full max-w-3xl bg-white/5 border border-cyan-600/30 p-6 rounded-xl shadow-[0_0_25px_rgba(0,255,255,0.1)] overflow-auto max-h-[400px] mb-8">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Live Packet Logs</h2>
          {logs.length === 0 ? (
            <p className="text-gray-400">Waiting for real-time data...</p>
          ) : (
            logs.map((log, idx) => (
              <div key={idx} className={`text-sm py-1 border-b border-gray-700 last:border-b-0 ${log.startsWith('❌') ? 'text-red-400' : ''}`}>
                {log}
              </div>
            ))
          )}
        </div>

        <div className="w-full max-w-6xl flex flex-wrap justify-center gap-8 p-4">
          {/* Existing Charts */}
          {/* Line Chart */}
          <div className="w-full lg:w-[48%] bg-white/5 border border-cyan-600/30 p-6 rounded-xl shadow-[0_0_25px_rgba(0,255,255,0.1)]">
            <h2 className="text-2xl font-semibold text-cyan-300 mb-4 text-center">Traffic Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData.timeSeries} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="time" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip contentStyle={{ backgroundColor: '#333', border: '1px solid #0FF', color: '#fff' }} labelStyle={{ color: '#0FF' }} />
                <Legend wrapperStyle={{ color: '#999' }} />
                <Line type="monotone" dataKey="totalPackets" stroke="#00C49F" activeDot={{ r: 8 }} name="Total Packets" />
                <Line type="monotone" dataKey="anomalies" stroke="#FF0000" activeDot={{ r: 8 }} name="Anomalies" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="w-full lg:w-[48%] bg-white/5 border border-cyan-600/30 p-6 rounded-xl shadow-[0_0_25px_rgba(0,255,255,0.1)]">
            <h2 className="text-2xl font-semibold text-cyan-300 mb-4 text-center">Protocol Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip contentStyle={{ backgroundColor: '#333', border: '1px solid #0FF', color: '#fff' }} labelStyle={{ color: '#0FF' }} />
                <Legend wrapperStyle={{ color: '#999' }} />
                <Bar dataKey="count" fill="#8884d8" name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="w-full lg:w-[48%] bg-white/5 border border-cyan-600/30 p-6 rounded-xl shadow-[0_0_25px_rgba(0,255,255,0.1)]">
            <h2 className="text-2xl font-semibold text-cyan-300 mb-4 text-center">Prediction Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={(entry) => `${entry.name} (${entry.value})`}
                  isAnimationActive={false}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#333', border: '1px solid #0FF', color: '#fff' }} labelStyle={{ color: '#0FF' }} />
                <Legend wrapperStyle={{ color: '#999' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* ✅ NEW: Stacked Bar Chart */}
          <div className="w-full lg:w-[48%] bg-white/5 border border-cyan-600/30 p-6 rounded-xl shadow-[0_0_25px_rgba(0,255,255,0.1)]">
            <h2 className="text-2xl font-semibold text-cyan-300 mb-4 text-center">Anomalies vs Normal Packets</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stackedBarData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="time" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip contentStyle={{ backgroundColor: '#333', border: '1px solid #0FF', color: '#fff' }} />
                <Legend wrapperStyle={{ color: '#999' }} />
                <Bar dataKey="Normal" stackId="a" fill="#00C49F" />
                <Bar dataKey="Anomalies" stackId="a" fill="#FF0000" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* ✅ NEW: Area Chart */}
          <div className="w-full lg:w-[48%] bg-white/5 border border-cyan-600/30 p-6 rounded-xl shadow-[0_0_25px_rgba(0,255,255,0.1)]">
            <h2 className="text-2xl font-semibold text-cyan-300 mb-4 text-center">Total Packets Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData.timeSeries}>
                <defs>
                  <linearGradient id="colorPackets" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00C49F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#999" />
                <YAxis stroke="#999" />
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <Tooltip contentStyle={{ backgroundColor: '#333', border: '1px solid #0FF', color: '#fff' }} />
                <Area type="monotone" dataKey="totalPackets" stroke="#00C49F" fillOpacity={1} fill="url(#colorPackets)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* ✅ NEW: Radar Chart */}
          <div className="w-full lg:w-[48%] bg-white/5 border border-cyan-600/30 p-6 rounded-xl shadow-[0_0_25px_rgba(0,255,255,0.1)]">
            <h2 className="text-2xl font-semibold text-cyan-300 mb-4 text-center">Radar View of Protocol Usage</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#444" />
                <PolarAngleAxis dataKey="subject" stroke="#999" />
                <PolarRadiusAxis stroke="#666" />
                <Radar name="Protocol Count" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Legend wrapperStyle={{ color: '#999' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
