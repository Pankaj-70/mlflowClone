import React from "react";

interface ExperimentCardProps {
  name: string;
  status: string;
  accuracy: number;
}

const ExperimentCard: React.FC<ExperimentCardProps> = ({ name, status, accuracy }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg border hover:shadow-lg transition">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-sm text-gray-600">Status: {status}</p>
      <p className="text-sm text-gray-600">Accuracy: {accuracy}%</p>
    </div>
  );
};

export default ExperimentCard;
