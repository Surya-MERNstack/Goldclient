import React from "react";
import GoldValueCalculator from "./Component/goldcal/Gold_cal";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Component/home/Home";
import DonutCharts from "./Component/chart/Charts";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/goldcal" element={<GoldValueCalculator />}></Route>
          <Route path="/chart" element={<DonutCharts />}></Route>
        </Routes>
      </Router>
      <div></div>
    </div>
  );
};

export default App;
