import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const generateDistinctColors = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const hue = (i * 137.5) % 360; // Generate hues at different intervals
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  return colors;
};

const Result = ({ candidates }) => {
  // Extracting candidate names and votes from the data
  const candidateNames = candidates.map((candidate) => candidate.resident.name);
  const votes = candidates.map((candidate) => candidate.numberOfVotes);

  // Generating distinct colors for each candidate
  const backgroundColors = generateDistinctColors(candidateNames.length);

  // Finding the index of the candidate with the highest votes
  const highestVotesIndex = votes.indexOf(Math.max(...votes));

  // Updating color for the bar with the highest votes to green
  backgroundColors[highestVotesIndex] = "#1dd1a1";

  // Configuring the chart data
  const data = {
    labels: candidateNames,
    datasets: [
      {
        label: "Votes",
        data: votes,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
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
      <div>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Result;
