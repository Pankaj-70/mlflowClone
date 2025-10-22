import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMetrics,
  logMetric,
  listArtifacts,
  uploadArtifact,
} from "../lib/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function RunDetails() {
  const { id } = useParams<{ id: string }>();
  const [metrics, setMetrics] = useState<any[]>([]);
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [artifacts, setArtifacts] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const loadMetrics = useCallback(async () => {
  if (!id) return;
  const data = await getMetrics(id);
  setMetrics(data);
}, [id]);

const loadArtifacts = useCallback(async () => {
  if (!id) return;
  const data = await listArtifacts(id);
  setArtifacts(data);
}, [id]);

  useEffect(() => {
    loadMetrics();
    loadArtifacts();
  }, [id]);

  // log new metric
  async function handleLogMetric() {
    if (!id || !key.trim()) return;
    await logMetric({ run_id: id, key, value: parseFloat(value) });
    setKey("");
    setValue("");
    loadMetrics();
  }

  // upload artifact
  async function handleUpload() {
    if (!id || !file) return;
    await uploadArtifact(id, file);
    setFile(null);
    loadArtifacts();
  }

  // group metrics by key
  const grouped = metrics.reduce((acc: any, m: any) => {
    acc[m.key] = acc[m.key] || [];
    acc[m.key].push({ step: m.id, value: m.value });
    return acc;
  }, {});

  return (
    <div className="space-y-10">
      {/* ---------- HEADER ---------- */}
      <div>
        <h1 className="text-2xl font-semibold mb-2">
          Run #{id?.slice(0, 6)}
        </h1>
        <p className="text-gray-500 text-sm">
          View metrics, charts, and artifacts for this run.
        </p>
      </div>

      {/* ---------- METRICS SECTION ---------- */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Metrics</h2>

        <div className="flex items-center gap-2 mb-4">
          <input
            className="border rounded p-2 text-sm"
            placeholder="Metric key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <input
            className="border rounded p-2 text-sm"
            placeholder="Metric value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className="bg-black text-white rounded p-2 text-sm hover:bg-gray-800"
            onClick={handleLogMetric}
          >
            + Log Metric
          </button>
        </div>

        {Object.keys(grouped).length === 0 && (
          <div className="text-gray-500 text-sm">No metrics logged yet.</div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(grouped).map(([metricKey, values]) => (
            <div
              key={metricKey}
              className="bg-white border rounded p-4 shadow-sm"
            >
              <h3 className="font-medium mb-2 text-gray-800">{metricKey}</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={values as any[]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="step" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- ARTIFACTS SECTION ---------- */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Artifacts</h2>

      <div className="flex items-center gap-3 mb-6 p-3 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:border-gray-400 transition">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
            <span className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition">
              Choose File
            </span>
            {file && (
              <span className="text-gray-700 text-sm font-medium truncate max-w-[200px]">
                {file.name}
              </span>
            )}
          </label>
          <button
            onClick={handleUpload}
            className="bg-black text-white cursor-pointer rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-600 transition"
          >
            Upload
          </button>
        </div>


        {artifacts.length === 0 && (
          <div className="text-gray-500 text-sm">No artifacts uploaded yet.</div>
        )}

        {artifacts.length > 0 && (
          <table className="w-full text-sm border">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-2 text-left">Filename</th>
                <th className="p-2 text-left">Size (KB)</th>
                <th className="p-2 text-left">Type</th>
              </tr>
            </thead>
            <tbody>
              {artifacts.map((a) => (
                <tr key={a.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{a.filename}</td>
                  <td className="p-2">{(a.size_bytes / 1024).toFixed(1)}</td>
                  <td className="p-2">{a.filetype}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
