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
import DailyRegister from "./DailyRegister";
import DailySocialLogin from "./DailySocialLogin";

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
  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");

  const dispatch = useDispatch();

  const getGraphDetail = () => {
    api
      .get("auth/admin/users/info")
      .then((res) => {
        console.log("res", res.data.data);
        const data = res.data.data;
        if (res.status === 200) {
          setGraphData(data);
          setEdate("");
          setSdate("");
        }
      })
      .catch((error) => {
        dispatch({ type: SHOW_TOAST, payload: error.message });
      });
  };

  const body = {
    sdate,
    edate,
  };

  const filterLoginGraphDetail = (e) => {
    e.preventDefault();

    api
      .post("auth/admin/loginDate/filter", body)
      .then((res) => {
        console.log("filter res", res.data.data);
        const data = res.data.data;
        if (res.status === 201) {
          setGraphData(data);
        }
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
    labels:
      graphData?.total?.totalLogin?.array ||
      graphData?.totalLogin?.dateRange ||
      graphData?.totalLogin?.listDate,

    datasets: [
      {
        label: "Daily login",
        data:
          graphData?.total?.totalLogin?.countTotalLogin ||
          graphData?.totalLogin?.userTotalRange ||
          graphData?.totalLogin?.countTotalLogin,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
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
          <div className="mt-4">
            <button
              className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-2 mr-3 border border-red-500 hover:border-transparent rounded"
              onClick={getGraphDetail}
            >
              Reset
            </button>
            <span className="font-semibold mr-1">Start:</span>
            <input
              type="date"
              name="sdate"
              className="mr-8"
              value={sdate}
              onChange={(e) => setSdate(e.target.value)}
            />
            <span className="font-semibold mr-1">End:</span>
            <input
              type="date"
              className="mr-3"
              name="edate"
              value={edate}
              onChange={(e) => setEdate(e.target.value)}
            />
            <button
              className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-2 border border-red-500 hover:border-transparent rounded"
              onClick={filterLoginGraphDetail}
            >
              filter
            </button>
          </div>

          <Line options={dailyLoginoptions} data={dailyLogin} />
        </Card>

        <DailySocialLogin />

        <DailyRegister />
      </div>
    </div>
  );
};

export default Dashboard;
