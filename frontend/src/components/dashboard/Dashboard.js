import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options1 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels1 = ["1-1-2022", "2-1-2022", "3-1-2022", "4-1-2022", "5-1-2022"];

export const data1 = {
  labels: labels1,
  datasets: [
    {
      label: "simple login",
      data: [1, 2, 3, 4, 5],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels2 = ["1-1-2022", "2-1-2022", "3-1-2022", "4-1-2022", "5-1-2022"];

const data2 = {
  labels: labels2,
  datasets: [
    {
      label: "google login",
      data: [1, 2, 3, 4, 5],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const options3 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels3 = ["1-1-2022", "2-1-2022", "3-1-2022", "4-1-2022", "5-1-2022"];

const data3 = {
  labels: labels3,
  datasets: [
    {
      label: "fblogin",
      data: [1, 2, 3, 4, 5],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const Dashboard = () => {
  return (
    <div className="container">
      <h1 className="text-center mb-3">Dashboard</h1>
      <div class="grid grid-cols-3 gap-3">
        <Card
          variant="outlined"
          sx={{
            width: "90%",
            margin: "16px",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Line options={options1} data={data1} />
        </Card>

        <Card
          variant="outlined"
          sx={{
            width: "90%",
            margin: "16px",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Line options={options2} data={data2} />
        </Card>

        <Card
          variant="outlined"
          sx={{
            width: "90%",
            margin: "16px",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Line options={options3} data={data3} />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
