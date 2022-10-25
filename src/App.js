import Dashboard from "./components/dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import Card from "./components/card/Card";
import Launch from "./components/launch/Launch";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="launch" element={<Card />} />
        <Route path="launch/:launchId" element={<Launch />} />
      </Routes>
    </div>
  );
}

export default App;
