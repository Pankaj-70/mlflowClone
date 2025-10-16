import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <Sidebar onSelect={(id) => navigate(`/exp/${id}`)} />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
