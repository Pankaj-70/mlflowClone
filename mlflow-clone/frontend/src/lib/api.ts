import axios from "axios";

export const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // backend FastAPI URL
});

// -------- Experiments --------
export async function getExperiments() {
  const { data } = await API.get("/experiments/");
  return data;
}

export async function createExperiment(payload: { name: string; description?: string }) {
  const { data } = await API.post("/experiments/", payload);
  return data;
}

// -------- Runs --------
export async function getRuns(expId: number) {
  const { data } = await API.get(`/runs/by-experiment/${expId}`);
  return data;
}

export async function createRun(payload: { experiment_id: number; name?: string }) {
  const { data } = await API.post("/runs/", payload);
  return data;
}

export async function finishRun(run_id: string) {
  const { data } = await API.post(`/runs/${run_id}/finish`);
  return data;
}

// -------- Metrics --------
export async function getMetrics(run_id: string) {
  const { data } = await API.get(`/metrics/${run_id}`);
  return data;
}

export async function logMetric(payload: { run_id: string; key: string; value: number }) {
  const { data } = await API.post("/metrics/log", payload);
  return data;
}

export async function listArtifacts(run_id: string) {
  const { data } = await API.get(`/artifacts/${run_id}`);
  return data;
}

export async function uploadArtifact(run_id: string, file: File) {
  const form = new FormData();
  form.append("file", file);
  const { data } = await API.post(`/artifacts/${run_id}/upload`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

