import React from "react";
import Chart from "react-apexcharts";
import "./DonutChart.css";
import { Link } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DonutCharts = () => {
  const goldRates = {
    "24K": 5106.44,
    "22K": 4680.9,
    "20K": 4255.36,
    "18K": 3829.83,
    "14K": 2978.75,
    "9K": 1914.91,
  };

  const goldWastagePercentage = 5;
  const indiaGSTPercentage = 3;

  const options = {
    series: [24, 22, 18, 14, 9],
    labels: [
      "24K - Gold",
      "22K - Gold",
      "18K - Gold",
      "14K - Gold",
      "9K  -  Gold",
    ],
  };

  const series = [24, 22, 18, 14, 9];

  const renderTableRows = () => {
    return Object.keys(goldRates).map((carat) => (
      <tr key={carat}>
        <td>{carat}</td>
        <td>{goldRates[carat]}</td>
        <td>{goldWastagePercentage}%</td>
        <td>{indiaGSTPercentage}%</td>
        <td>
          {(
            goldRates[carat] *
            (1 + (goldWastagePercentage + indiaGSTPercentage) / 100)
          ).toFixed(2)}
        </td>
      </tr>
    ));
  };

  return (
    <div className="container">
      <h1 style={{ color: "#ffce2e", marginTop: "5rem" }}><u style={{color:"#efc848"}}>Gold Details</u></h1>
      <Chart
        options={options}
        series={series}
        type="donut"
        width="100%"
        height={300}
        className="donut-chart"
      />

      <table className="gold-table">
        <thead>
          <tr>
            <th>Gold Carat</th>
            <th>Price per Gram (₹)</th>
            <th>Gold Wastage (%)</th>
            <th>India GST (%)</th>
            <th>1 Gram Price (₹)</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
      <br/>
      <div style={{border:"none"}}>
        <Link to='/goldcal'><FontAwesomeIcon icon={faArrowLeft}/> Back</Link>
      </div>
    </div>
  );
};

export default DonutCharts;
