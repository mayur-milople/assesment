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
import moment from "moment";

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
  const [filterLoginData, setFilterLoginData] = useState({});
  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");

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

  const body = {
    sdate,
    edate,
  };

  const filterLoginGraphDetail = (e) => {
    e.preventDefault();

    console.log(body);

    // console.log(new Date(sdate).toISOString());
    // api
    //   .get("auth/admin/loginDate/filter", body)
    //   .then((res) => {
    //     console.log("sdate", body);
    //     console.log("filter res", res);
    //   })
    //   .catch((error) => {
    //     dispatch({ type: SHOW_TOAST, payload: error.message });
    //   });
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

  // console.log("graphData", graphData);

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

          <div className="mt-4">
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
          <div className="mt-4">
            <span className="font-semibold mr-1">Start:</span>
            <input type="date" className="mr-8" />
            <span className="font-semibold mr-1">End:</span>
            <input type="date" className="mr-3" />
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              filter
            </button>
          </div>
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
          <div className="mt-4">
            <span className="font-semibold mr-1">Start:</span>
            <input type="date" name="currentDate" className="mr-8" />
            <span className="font-semibold mr-1">End:</span>
            <input type="date" className="mr-3" />
            <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-2 border border-red-500 hover:border-transparent rounded">
              filter
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
