import React, { useEffect, useRef, useState } from "react";
import { BsCartCheckFill } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";
import { FaInbox } from "react-icons/fa";
import Charts from "../components/Charts";
import HighlightedItems from "./HighlightedItems";
import Highlight_1 from "../assets/TestImage_01.png";
import Highlight_2 from "../assets/TestImage_02.png";
import Highlight_3 from "../assets/TestImage_03.png";
import Highlight_4 from "../assets/TestImage_04.png";
import Highlight_5 from "../assets/TestImage_05.png";
import AdminAccount from "../components/AdminAccount";
import {
  getStatisticUserAPI,
  getStatisticGamepacksAPI,
  getStatisticIncomeAPI,
  getBestSellerAPI,
} from "../../api/adminAPI";

const Dashboard = ({ isSidebarOpen, toggleSidebar }) => {
  const gapX = isSidebarOpen ? "20" : "30";
  const testLineGraph = {
    labels: [
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ],
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
      x2: {
        labels: ["asdasd", "Adssad"],
      },
      y: {
        // Add any additional configuration for the y scale if needed
        beginAtZero: true, // Start the y-axis scale from zero
        ticks: {
          stepSize: 1000, // Specify the step size for the y-axis ticks
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
  const [numIncome, setNumIncome] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [currentIncome, setCurrentIncome] = useState();

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  useEffect(() => {
    getBestSellerAPI(sessionStorage.getItem("accountToken"))
      .then((res) => setBestSeller(res))
      .catch((err) => console.log(err));
  }, []);

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
      .then((data) => {
        setNumIncome(data);
        setCurrentIncome(data[0].income);
        createLineGraph(data);
      })
      .catch((error) => console.log(error));

    return currentIncome;
  };

  const getMonthName = (month) => {
    switch (month) {
      case 1:
        return "JAN";
      case 2:
        return "FEB";
      case 3:
        return "MAR";
      case 4:
        return "APR";
      case 5:
        return "MAY";
      case 6:
        return "JUN";
      case 7:
        return "JUL";
      case 8:
        return "AUG";
      case 9:
        return "SEP";
      case 10:
        return "OCT";
      case 11:
        return "NOV";
      case 12:
        return "DEC";
      default:
        break;
    }
  };

  const [lineGraph, setLineGraph] = useState(testLineGraph);

  const createLineGraph = (dataInfo) => {
    setLineGraph({
      ...lineGraph,
      labels: [
        [`${getMonthName(dataInfo[4].month)} `, `${dataInfo[4].year}`],
        [`${getMonthName(dataInfo[3].month)} `, `${dataInfo[3].year}`],
        [`${getMonthName(dataInfo[2].month)} `, `${dataInfo[2].year}`],
        [`${getMonthName(dataInfo[1].month)} `, `${dataInfo[1].year}`],
        [`${getMonthName(dataInfo[0].month)} `, `${dataInfo[0].year}`],
      ],
      datasets: [
        {
          label: "Total Sales",
          data: [
            dataInfo[4].income,
            dataInfo[3].income,
            dataInfo[2].income,
            dataInfo[1].income,
            dataInfo[0].income,
          ],
          borderColor: "red",
          backgroundColor: "transparent",
        },
        {
          label: "Shop Income",
          data: [
            dataInfo[4].income * 0.4,
            dataInfo[3].income * 0.4,
            dataInfo[2].income * 0.4,
            dataInfo[1].income * 0.4,
            dataInfo[0].income * 0.4,
          ],
          borderColor: "blue",
          backgroundColor: "transparent",
        },
        {
          label: "Publisher Income",
          data: [
            dataInfo[4].income * 0.6,
            dataInfo[3].income * 0.6,
            dataInfo[2].income * 0.6,
            dataInfo[1].income * 0.6,
            dataInfo[0].income * 0.6,
          ],
          borderColor: "green",
          backgroundColor: "transparent",
        },
      ],
    });
  };

  return (
    <div className="mt-2">
      <div className="flex justify-end mr-[60px]">
        <AdminAccount />
      </div>
      <div className="p-6">
        <h2 className="font-bold text-2xl ml-10">Dashboard</h2>
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
                className="bg-white bg-opacity-10 w-[300px] h-[200px] text-[16px] font-medium p-10 rounded-md flex justify-center items-center gap-x-[15px] mb-10 hover:scale-105 duration-300"
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
                <h2 className="text-[16px] font-medium">
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
                  <h2 className="text-[16px] font-medium">Total revenue is:</h2>
                  <h1 className="text-[20px]">
                    {VND.format(valueNumIncome())}
                  </h1>
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
              <Charts type={"Line"} data={lineGraph} content={"Sales"} />
              {/* <Charts type="Pie" data={testPieGraph} content="Boardgame" /> */}
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
              {bestSeller &&
                bestSeller.map((product) => (
                  <HighlightedItems
                    header={product.gamePackName}
                    content={product.price}
                    imgSrc={product.image}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
