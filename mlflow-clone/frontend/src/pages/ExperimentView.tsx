import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRuns, createRun, finishRun } from "../lib/api";

export default function ExperimentView() {
  const { id } = useParams<{ id: string }>();
  const expId = Number(id);
  const [runs, setRuns] = useState<any[]>([]);
  const [name, setName] = useState("");

  const load = async () => {
    if (!expId) return;
    const data = await getRuns(expId);
    setRuns(data);
  };

  useEffect(() => {
    load();
  }, [expId]);

  async function handleStartRun() {
    if (!expId) return;
    await createRun({ experiment_id: expId, name });
    setName("");
    load();
  }

  async function handleFinish(run_id: string) {
    await finishRun(run_id);
    load();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        Experiment #{expId}
      </h1>

      <div className="flex items-center gap-2 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Run name"
          className="border rounded p-2 text-sm"
        />
        <button
          onClick={handleStartRun}
          className="bg-black text-white rounded p-2 text-sm hover:bg-gray-800"
        >
          + Start Run
        </button>
      </div>

      <table className="w-full text-sm border">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-2 text-left">Run ID</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Start Time</th>
            <th className="p-2 text-left">End Time</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {runs.map((r) => (
            <tr key={r.id} className="border-b hover:bg-gray-50">
              <td
                className="p-2 font-mono text-blue-600 hover:underline cursor-pointer"
                onClick={() => (window.location.href = `/run/${r.id}`)}
              >
                {r.id.slice(0, 6)}...
              </td>

              <td className="p-2">{r.name}</td>
              <td className="p-2">{r.status}</td>
              <td className="p-2">{new Date(r.start_time).toLocaleString()}</td>
              <td className="p-2">
                {r.end_time ? new Date(r.end_time).toLocaleString() : "-"}
              </td>
              <td className="p-2">
                {r.status === "RUNNING" && (
                  <button
                    onClick={() => handleFinish(r.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Finish
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
