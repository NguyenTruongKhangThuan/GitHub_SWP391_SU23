import React, { useEffect, useRef, useState } from "react";
import { BsCartCheckFill } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";
import { FaInbox } from "react-icons/fa";
import Charts from "./Charts";
import HighlightedItems from "./HighlightedItems";
import Highlight_1 from "../assets/TestImage_01.png";
import Highlight_2 from "../assets/TestImage_02.png";
import Highlight_3 from "../assets/TestImage_03.png";
import Highlight_4 from "../assets/TestImage_04.png";
import Highlight_5 from "../assets/TestImage_05.png";
import AdminAccount from "./AdminAccount";
import {
  getStatisticUserAPI,
  getStatisticGamepacksAPI,
  getStatisticIncomeAPI,
} from "../../api/adminAPI";

const Dashboard = ({ isSidebarOpen, toggleSidebar }) => {
  const gapX = isSidebarOpen ? "20" : "30";
  const testLineGraph = {
    labels: ["June 1", "June 8", "June 15", "June 22", "June 29"],
    datasets: [
      {
        label: "Total Sales",
        data: [1000, 1200, 900, 1500, 1800],
        borderColor: "red",
        backgroundColor: "transparent",
      },
      {
        label: "Shop Income",
        data: [700, 800, 600, 1000, 1200],
        borderColor: "blue",
        backgroundColor: "transparent",
      },
      {
        label: "Publisher Income",
        data: [300, 400, 300, 500, 600],
        borderColor: "green",
        backgroundColor: "transparent",
      },
    ],
    scales: {
      x: {
        type: "category",
      },
      y: {
        // Add any additional configuration for the y scale if needed
        beginAtZero: true, // Start the y-axis scale from zero
        ticks: {
          stepSize: 5, // Specify the step size for the y-axis ticks
        },
      },
    },
  };

  const testBarGraph = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Data 1",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "red",
      },
      {
        label: "Data 2",
        data: [8, 7, 2, 4, 6],
        backgroundColor: "blue",
      },
    ],
  };

  const testPieGraph = {
    labels: ["Strategical", "Family", "Fun Party", "Adventure"],
    datasets: [
      {
        data: [250, 150, 100, 200],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const testDoughnutGraph = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [15, 25, 35],
        backgroundColor: ["red", "blue", "yellow"],
      },
    ],
  };

  const [numUsers, setNumUsers] = useState();
  const [numProducts, setNumProducts] = useState();
  const [numIncome, setNumIncome] = useState();

  const valueNumUsers = () => {
    getStatisticUserAPI(sessionStorage.getItem("accountToken"))
      .then((data) => setNumUsers(data))
      .catch((error) => console.log(error));

    return numUsers;
  };

  const valueNumProducts = () => {
    getStatisticGamepacksAPI(sessionStorage.getItem("accountToken"))
      .then((data) => setNumProducts(data))
      .catch((error) => console.log(error));

    return numProducts;
  };

  const valueNumIncome = () => {
    getStatisticIncomeAPI(sessionStorage.getItem("accountToken"))
      .then((data) => setNumIncome(data))
      .catch((error) => console.log(error));

    return numIncome;
  };

  return (
    <div>
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <div
        className="flex flex-wrap justify-center mt-[30px] duration-300"
        style={{ gap: `0 ${gapX}px` }}
      >
        <div className="flex flex-col gap-y-1">
          <div
            className="flex flex-row justify-center duration-300"
            style={{ gap: `0 ${gapX}px` }}
          >
            <div
              className="bg-white bg-opacity-10 w-[300px] h-[200px] p-10 rounded-md flex justify-center items-center gap-x-[15px] mb-10 hover:scale-105 duration-300"
              style={{
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <FaInbox className="text-[60px]" />
              <h2 className="text-[16px]">
                There are {valueNumProducts()} products available
              </h2>
            </div>
            <div
              className="bg-white bg-opacity-10 w-[300px] h-[200px] p-10 rounded-md flex justify-center items-center gap-x-[15px] mb-10 hover:scale-105 duration-300"
              style={{
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <BsCartCheckFill className="text-[80px]" />
              <h2 className="text-[16px]">
                {valueNumUsers()} users have visited the shop
              </h2>
            </div>
            <div
              className="bg-white bg-opacity-10 w-[300px] h-[200px] p-10 rounded-md flex justify-center items-center gap-x-[15px] mb-10 hover:scale-105 duration-300"
              style={{
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <GrMoney className="text-[50px]" />
              <div className="flex flex-col">
                <h2 className="text-[16px]">Total revenue is:</h2>
                <h1 className="text-[24px]">{valueNumIncome()} VND</h1>
              </div>
            </div>
          </div>
          <div
            className="bg-white bg-opacity-10 w-[960px] h-[480px] p-10 rounded-md flex justify-center items-center mb-10"
            style={{
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* This is where we want to display graph */}
            <Charts type={"Line"} data={testLineGraph} content={"Sales"} />
            <Charts type="Pie" data={testPieGraph} content="Boardgame" />
          </div>
        </div>
        <div
          className="bg-white bg-opacity-10 w-[300px] h-[720px] p-10 rounded-md flex flex-col justify-center items-center"
          style={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h2 className="mb-8">Highlighted Items</h2>
          <div className="flex flex-col gap-y-8">
            <HighlightedItems
              header={"Test Header"}
              content={"Test Content"}
              imgSrc={Highlight_1}
            />
            <HighlightedItems
              header={"Test Header"}
              content={"Test Content"}
              imgSrc={Highlight_2}
            />
            <HighlightedItems
              header={"Test Header"}
              content={"Test Content"}
              imgSrc={Highlight_3}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
