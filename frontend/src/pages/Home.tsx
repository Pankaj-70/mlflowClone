import React from "react";
import ExperimentCard from "../components/ExperimentCard";

const Home: React.FC = () => {
  const experiments = [
    { name: "Experiment A", status: "Running", accuracy: 85 },
    { name: "Experiment B", status: "Completed", accuracy: 92 },
    { name: "Experiment C", status: "Failed", accuracy: 70 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Recent Experiments</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {experiments.map((exp, idx) => (
          <ExperimentCard key={idx} {...exp} />
        ))}
      </div>
    </div>
  );
};

export default Home;
