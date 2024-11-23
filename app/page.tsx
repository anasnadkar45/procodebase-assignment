import Image from "next/image";
import { ExpertsList } from "./components/ExpertsList";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto h-screen p-4 space-y-4">
      <h1 className="text-3xl font-bold text-slate-700">Available Experts</h1>
      <ExpertsList />
    </div>
  );
}
