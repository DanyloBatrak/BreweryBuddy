import { useState } from "react";
import "./App.css";
import Breweries from "./Breweries";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <p className="title">🍺 BreweryBuddy</p>
            <p>
              <a href="">Home</a>
            </p>
            <p>
              <a href="">Search</a>
            </p>
            <p>
              <a href="">About</a>
            </p>
          </li>
        </ul>
      </nav>
      <div>
        <Breweries />
      </div>
    </>
  );
}

export default App;
