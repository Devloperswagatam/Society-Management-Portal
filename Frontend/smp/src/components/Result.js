import React from "react";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

const Result = ({ candidates }) => {
  // Extracting candidate names and votes from the data
  const candidateNames = candidates.map((candidate) => candidate.resident.name);
  const votes = candidates.map((candidate) => candidate.numberOfVotes);

  // Configuring the chart data
  const data = {
    labels: candidateNames,
    datasets: [
      {
        label: "Votes",
        data: votes,
        backgroundColor: '#1dd1a1',
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Configuring chart options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <h2>Voting Results</h2>
      <div style={{ height: "300px", marginLeft:"20rem" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Result;
