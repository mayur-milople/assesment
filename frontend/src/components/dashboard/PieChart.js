import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Card } from "@mui/material";
import { api } from "../helper/instance";
import { useDispatch } from "react-redux";
import { SHOW_TOAST } from "../store/constants/constant";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [graphData, setGraphData] = useState({});
  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");

  const dispatch = useDispatch();

  const getGraphDetail = () => {
    api
      .get("auth/admin/current/login")
      .then((res) => {
        console.log("res pie chart", res.data.data);
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
      .post("auth/admin/users/Datefilter", body)
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

  const data = {
    labels: graphData?.array,
    datasets: [
      {
        label: "# of Votes",
        data: graphData?.countArray,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
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
        <Pie data={data} />
      </Card>
    </>
  );
};

export default PieChart;
