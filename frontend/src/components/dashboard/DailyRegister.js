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

const DailyRegister = () => {
  const [registerStartDate, setRegisterStartDate] = useState("");
  const [registerEndDate, setRegisterEndDate] = useState("");
  const [graph, setGraph] = useState({});
  const dispatch = useDispatch();

  const getGraphDetail = () => {
    api
      .get("auth/admin/users/info")
      .then((res) => {
        console.log("res", res.data.data);
        const data = res.data.data;
        if (res.status === 200) {
          setGraph(data);
          setRegisterStartDate("");
          setRegisterEndDate("");
        }
      })
      .catch((error) => {
        dispatch({ type: SHOW_TOAST, payload: error.message });
      });
  };

  useEffect(() => {
    getGraphDetail();
  }, []);

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

  const filterRegisterGraphDerails = (e) => {
    api
      .post("auth/admin/registerDate/filter", {
        sdate: registerStartDate,
        edate: registerEndDate,
      })
      .then((res) => {
        console.log("registerfilter", res.data.data);
        const data = res.data.data;
        if (res.status === 201) {
          setGraph(data);
        }
      })
      .catch((error) => {
        dispatch({ type: SHOW_TOAST, payload: error.message });
      });
  };

  const dailyRegister = {
    labels:
      graph?.simple?.simpleRegister?.array ||
      graph?.simpleRegister?.dateRange ||
      graph?.simpleRegister?.listDate,
    datasets: [
      {
        label: "Daily simple registration",
        data:
          graph?.simple?.simpleRegister?.countRegisterSimpleArray ||
          graph?.simpleRegister?.countRegisterSimpleArray ||
          graph?.simpleRegister?.userSimpleRange,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Daily social registration",
        data:
          graph?.social?.socialRegister?.countRegisterSocialArray ||
          graph?.socialRegister?.userSocialRange ||
          graph?.socialRegister?.countRegisterSocialArray,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
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
            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-2 mr-3 border border-red-500 hover:border-transparent rounded"
            onClick={getGraphDetail}
          >
            Reset
          </button>
          <span className="font-semibold mr-1">Start:</span>
          <input
            type="date"
            className="mr-8"
            name="registerStartDate"
            value={registerStartDate}
            onChange={(e) => setRegisterStartDate(e.target.value)}
          />
          <span className="font-semibold mr-1">End:</span>
          <input
            type="date"
            className="mr-3"
            name="registerEndDate"
            value={registerEndDate}
            onChange={(e) => setRegisterEndDate(e.target.value)}
          />
          <button
            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-2 border border-red-500 hover:border-transparent rounded"
            onClick={filterRegisterGraphDerails}
          >
            filter
          </button>
        </div>
        <Line options={dailyRegisteroptions} data={dailyRegister} />
      </Card>
    </>
  );
};

export default DailyRegister;
