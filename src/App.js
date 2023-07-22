import "./App.css";
import {
  HashRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import Home from "./Home";
import Group from "./Group";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/groups/:id" element={<Group />} />
      </Routes>
    </Router>
  );
}

export default App;
