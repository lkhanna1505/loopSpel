import Navbar from "../components/Navbar";
import MapView from "../components/MapView";
import Leaderboard from "../components/Leaderboard";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">

      <Navbar />

      <div className="grid grid-cols-4 gap-4 p-4">

        <div className="col-span-3">
          <MapView />
        </div>

        <div>
          <Leaderboard />
        </div>

      </div>

    </div>
  );
}