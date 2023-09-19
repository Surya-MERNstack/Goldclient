import React from "react";
import GoldValueCalculator from "./Component/goldcal/Gold_cal";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Component/home/Home";
import DonutCharts from "./Component/chart/Charts";
import Signup from "./Component/pages/Signup";
import Login from "./Component/pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/goldcal" element={<GoldValueCalculator />}></Route>
          <Route path="/chart" element={<DonutCharts />}></Route>
        </Routes>
      </Router>
      <ToastContainer />
      <div></div>
    </div>
  );
};

export default App;
