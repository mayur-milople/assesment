import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
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
  Filler,
  Legend
);

const AreaChart = () => {
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

    if (body.sdate === "" && body.edate === "") {
      getGraphDetail();
    }

    api
      .post("auth/admin/registerDate/filter", body)
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

  const options = {
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

  const data = {
    labels:
      graphData?.total?.totalRegister?.array ||
      graphData?.totalRegister?.dateRange ||
      graphData?.totalRegister?.listDate,

    datasets: [
      {
        fill: true,
        label: "Daily Register",
        data:
          graphData?.total?.totalRegister?.countTotalRegister ||
          graphData?.totalRegister?.userTotalRange ||
          graphData?.totalRegister?.countTotalRegister,
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
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={filterLoginGraphDetail}
          >
            filter
          </button>
        </div>

        <Line options={options} data={data} />
      </Card>
    </>
  );
};

export default AreaChart;
