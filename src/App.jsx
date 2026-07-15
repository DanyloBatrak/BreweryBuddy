import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Breweries from "./Breweries";
import BreweryDetail from "./BreweriesData"; // ← add this

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <p className="title">🍺 BreweryBuddy</p>
            <p>
              <a href="/">Home</a>
            </p>
            <p>
              <a href="/search">Search</a>
            </p>
            <p>
              <a href="/about">About</a>
            </p>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Breweries />} />
        <Route path="/breweries/:id" element={<BreweryDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
