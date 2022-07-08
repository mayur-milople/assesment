import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card } from "@mui/material";
import { api } from "../helper/instance";
import { SHOW_TOAST } from "../store/constants/constant";
import { useDispatch } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
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
          setSdate("");
          setEdate("");
        }
      })
      .catch((error) => {
        dispatch({ type: SHOW_TOAST, payload: error.message });
      });
  };

  useEffect(() => {
    getGraphDetail();
  }, []);

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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const data = {
    labels:
      graphData?.total?.totalLogin?.array ||
      graphData?.simpleLogin?.dateRange ||
      graphData?.simpleLogin?.listDate,
    datasets: [
      {
        label: "Daily simple login",
        data:
          graphData?.simple?.simpleLogin?.countLoginSimpleArray ||
          graphData?.simpleLogin?.countLoginSimpleArray ||
          graphData?.simpleLogin?.userSimpleRange,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Daily google login",
        data:
          graphData?.social?.googleLogin?.countGoogleLoginArray ||
          graphData?.googleLogin?.countGoogleLoginArray ||
          graphData?.socialLogin?.userGoogleRange,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },

      {
        label: "Daily facebook login",
        data:
          graphData?.social?.facebookLogin?.countFacebookLoginArray ||
          graphData?.facebookLogin?.countFacebookLoginArray ||
          graphData?.socialLogin?.userFacebookRange,
        backgroundColor: "rgba(150, 100, 150, 0.5)",
      },
    ],
  };

  // console.log("barchart", graphData);
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
        <Bar options={options} data={data} />
      </Card>
    </>
  );
};

export default BarChart;
