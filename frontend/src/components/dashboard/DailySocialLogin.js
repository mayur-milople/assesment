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
import { useDispatch } from "react-redux";
import { SHOW_TOAST } from "../store/constants/constant";
import { api } from "../helper/instance";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DailySocialLogin = () => {
  const [graphData, setGraphData] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dispatch = useDispatch();

  const getGraphDetail = () => {
    api
      .get("auth/admin/users/info")
      .then((res) => {
        console.log("res", res.data.data);
        const data = res.data.data;
        if (res.status === 200) {
          setGraphData(data);
          setStartDate("");
          setEndDate("");
        }
      })
      .catch((error) => {
        dispatch({ type: SHOW_TOAST, payload: error.message });
      });
  };

  useEffect(() => {
    getGraphDetail();
  }, []);
  const filtersocialLoginGraphDetails = (e) => {
    e.preventDefault();

    api
      .post("auth/admin/loginDate/filter", { sdate: startDate, edate: endDate })
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
    labels:
      graphData?.social?.socialLogin?.array ||
      graphData?.socialLogin?.dateRange ||
      graphData?.socialLogin?.listDate,
    datasets: [
      {
        label: "Daily Social login",
        data:
          graphData?.social?.socialLogin?.countLoginSocialArray ||
          graphData?.socialLogin?.userSocialRange ||
          graphData?.socialLogin?.countLoginSocialArray,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <>
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
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 mr-3 border border-blue-500 hover:border-transparent rounded"
            onClick={getGraphDetail}
          >
            Reset
          </button>
          <span className="font-semibold mr-1">Start:</span>
          <input
            type="date"
            name="startDate"
            className="mr-8"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span className="font-semibold mr-1">End:</span>
          <input
            type="date"
            className="mr-3"
            name="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={filtersocialLoginGraphDetails}
          >
            filter
          </button>
        </div>
        <Line options={dailySocialLoginoptions} data={dailySocialLogin} />
      </Card>
    </>
  );
};

export default DailySocialLogin;
