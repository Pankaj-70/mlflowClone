import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import Models from "./pages/Models";
import Metrics from "./pages/Metrics";
import Experiments from "./pages/Experiments";
import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Topbar />
          <main className="p-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/models" element={<Models />} />
              <Route path="/metrics" element={<Metrics />} />
              <Route path="/experiments" element={<Experiments />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
