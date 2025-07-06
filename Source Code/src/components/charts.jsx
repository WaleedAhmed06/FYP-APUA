import React from "react";
import { Bar, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  RadialLinearScale,
} from "chart.js";

// Register necessary chart.js components
ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  RadialLinearScale
);

const chartData = {
  bar: {
    labels: [
      "Spring/2020",
      "Fall/2020",
      "Spring/2021",
      "Fall/2021",
      "Spring/2022",
      "Fall/2022",
      "Spring/2023",
      "Fall/2023",
      "Spring/2024",
      "Fall/2024",
    ],
    datasets: [
      {
        data: [500, 720, 600, 450, 310, 528, 878, 532, 843, 725],
        backgroundColor: "#2e6139",
        borderColor: "green",
        borderWidth: 1,
      },
    ],
  },
};

const barOptions = {
  responsive: true,
  plugins: {
    legend: { display: false }, // Disable legend
    tooltip: { enabled: true }, // Disable tooltip
  },
  scales: {
    x: {
      display: true, // Hide x-axis labels
    },
    y: {
      min: 0, // Set minimum value for y-axis
      max: 1000, // Set maximum value for y-axis
      ticks: {
        stepSize: 5, // Set step size
      },
    },
  },
};

const polarOptions = {
  responsive: true,
  plugins: {
    legend: { display: false }, // Disable legend
    tooltip: { enabled: true }, // Disable tooltip
  },
};

const ChartsPage = () => {
  return (
    <>
    <h2 className="text-[#0f600b] text-center font-bold text-2xl underline">WELCOME TO</h2>
      <h2 className="text-[#0f600b] text-center mb-5 font-bold text-2xl underline">
        AUTOMATED PLATFORM FOR UNDERGRADUATE ADMISSIONS
      </h2>
      <div className="flex">
        <div className="w-[60%] mx-auto">
          <Bar data={chartData.bar} options={barOptions} />
        </div>
        <div className="w-[30%]">
          <PolarArea
            data={{
              labels: ["Red", "Green", "Yellow"],
              datasets: [
                {
                  data: [323, 463, 243, 231, 354, 453, 341, 255, 335, 452],
                  backgroundColor: ["#bed0bf", "#a8e6b5", "#2e6139"],
                },
              ],
            }}
            options={polarOptions}
          />
        </div>
      </div>
    </>
  );
};

export default ChartsPage;
