import { useEffect, useState } from "react";
import { getExperiments, createExperiment } from "../lib/api";

interface Props {
  onSelect: (id: number) => void;
}

export default function Sidebar({ onSelect }: Props) {
  const [experiments, setExperiments] = useState<any[]>([]);
  const [newName, setNewName] = useState("");

  const load = async () => {
    const data = await getExperiments();
    setExperiments(data);
  };

  useEffect(() => {
    load();
  }, []);

  async function handleCreate() {
    if (!newName.trim()) return;
    await createExperiment({ name: newName });
    setNewName("");
    load();
  }

  return (
    <aside className="w-64 bg-white border-r flex flex-col h-full">
      <div className="p-4 font-bold text-lg border-b">MLflow Clone</div>

      <div className="p-3 border-b">
        <input
          type="text"
          className="w-full border rounded p-2 text-sm"
          placeholder="New experiment name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button
          onClick={handleCreate}
          className="w-full mt-2 bg-black text-white rounded p-2 text-sm hover:bg-gray-800"
        >
          + Create
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        {experiments.map((exp) => (
          <div
            key={exp.id}
            onClick={() => onSelect(exp.id)}
            className="cursor-pointer p-3 hover:bg-gray-100 border-b text-sm"
          >
            {exp.name}
          </div>
        ))}
      </nav>
    </aside>
  );
}
