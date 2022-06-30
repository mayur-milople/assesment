import React, { useEffect, useState } from "react";
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
import { api } from "../helper/instance";
import { useDispatch } from "react-redux";
import { SHOW_TOAST } from "../store/constants/constant";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [graphData, setGraphData] = useState({});
  const dispatch = useDispatch();

  const getGraphDetail = () => {
    api
      .get("auth/admin/users/info")
      .then((res) => {
        console.log("res", res.data.data);
        const data = res.data.data;
        setGraphData(data);
      })
      .catch((error) => {
        dispatch({ type: SHOW_TOAST, payload: error.message });
      });
  };

  useEffect(() => {
    getGraphDetail();
  }, []);

  const dailyLoginoptions = {
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
  const dailyLogin = {
    labels: graphData?.total?.totalLogin?.array,
    datasets: [
      {
        label: "Daily login",
        data: graphData?.total?.totalLogin?.countTotalLogin,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const dailyRegisteroptions = {
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

  const dailyRegister = {
    labels: graphData?.simple?.simpleRegister?.array,
    datasets: [
      {
        label: "Daily simple registration",
        data: graphData?.simple?.simpleRegister?.countRegisterSimpleArray,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Daily social registration",
        data: graphData?.social?.socialRegister?.countRegisterSocialArray,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const dailySocialLoginoptions = {
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

  const dailySocialLogin = {
    labels: graphData?.social?.socialLogin?.array,
    datasets: [
      {
        label: "Daily Social login",
        data: graphData?.social?.socialLogin?.countLoginSocialArray,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  console.log("graphData", graphData);

  return (
    <div className="container">
      <h1 className="text-center mb-3">Dashboard</h1>
      <div className="grid grid-cols-2 gap-3">
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
          <Line options={dailyLoginoptions} data={dailyLogin} />
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
          <Line options={dailySocialLoginoptions} data={dailySocialLogin} />
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
          <Line options={dailyRegisteroptions} data={dailyRegister} />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
