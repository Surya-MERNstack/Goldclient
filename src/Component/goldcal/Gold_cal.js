import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Gold.css";
import { NavLink } from "react-router-dom";

const GoldValueCalculator = () => {
  const [selectedCarat, setSelectedCarat] = useState("24K");
  const [goldRates, setGoldRates] = useState({
    "24K": 5106.44,
    "22K": 4680.9,
    "20K": 4255.36,
    "18K": 3829.83,
    "14K": 2978.75,
    "9K": 1914.91,
  });
  const [gramWeight, setGramWeight] = useState("");
  const [goldValue, setGoldValue] = useState(0);
  const [goldWastagePercentage, setGoldWastagePercentage] = useState(5); // Set your gold wastage percentage here
  const [indiaGSTPercentage, setIndiaGSTPercentage] = useState(3); // Set the India GST percentage here

  useEffect(() => {
    calculateGoldValue();
  }, [gramWeight, selectedCarat]);

  const calculateGoldValue = () => {
    const rate = goldRates[selectedCarat];
    const value = rate * gramWeight;
    const goldWastageAmount = (goldWastagePercentage / 100) * value;
    const gstAmount = (indiaGSTPercentage / 100) * value;
    const totalValue = value + goldWastageAmount + gstAmount;
    setGoldValue(totalValue);
  };

  const saveGoldValue = async () => {
    try {
      await axios.post("https://goldserver-ivzy.onrender.com/gold-rates", {
        rate: goldRates[selectedCarat],
        carat: selectedCarat,
        weight: gramWeight,
        value: goldValue,
      });

      console.log("Gold value saved successfully");
      setSelectedCarat("24K");
      setGramWeight("");
    } catch (error) {
      console.error("Error saving gold value", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-sm-12 col-xs-12">
          <h1 style={{ color: "#ffce2e", marginTop: "1.5rem" }}>
            Gold Rate Calculator
          </h1>
          <form>
            <div>
              <label>Gold Carat:</label>
              <select
                value={selectedCarat}
                onChange={(e) => setSelectedCarat(e.target.value)}
              >
                <option value="24K">24K</option>
                <option value="22K">22K</option>
                <option value="18K">18K</option>
                <option value="14K">14K</option>
                <option value="9K">9K</option>
              </select>
            </div>
            <div>
              <label>Gram Weight:</label>
              <input
                type="text"
                min={1}
                className="form-control"
                value={gramWeight}
                onChange={(e) => setGramWeight(+e.target.value)}
              />
            </div>
          </form>
          <button className="button" onClick={saveGoldValue}>
            Save
          </button>
          <table className="table">
            <thead>
              <tr>
                <th>Gold Carat</th>
                <th>Price per Gram (₹)</th>
                <th>Gold Wastage (%)</th>
                <th>India GST (%)</th>
                <th>Gold Value (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedCarat}</td>
                <td>₹{goldRates[selectedCarat]}</td>
                <td>{goldWastagePercentage}%</td>
                <td>{indiaGSTPercentage}%</td>
                <td>₹{goldValue}</td>
              </tr>
            </tbody>
          </table>
          <br /> <br />
          <div>
            <NavLink to="chart" className="Gold_link">
              Gold Details
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldValueCalculator;
