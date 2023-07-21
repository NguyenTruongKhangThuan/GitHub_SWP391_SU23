import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../../components/Footer";

import HighlightedItems from "./HighlightedItems";

import Charts from "../components/Charts";
import {
  getBestSellerOfPubAPI,
  getSoldNumberAPI,
} from "../../api/publisherAPI";

const Sales = () => {
  const [bestSeller, setBestSeller] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);

  useEffect(() => {
    getBestSellerOfPubAPI(sessionStorage.getItem("accountToken"))
      .then((res) => setBestSeller(res))
      .catch((err) => console.log(err));
  }, []);

  const testLineGraph = {
    labels: ["June 1", "June 8", "June 15", "June 22", "June 29"],
    datasets: [
      {
        label: "Total Sales",
        data: [1000, 1200, 900, 1500, 1800],
        borderColor: "red",
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

  const testLineGraph2 = {
    labels: ["June 1", "June 8", "June 15", "June 22", "June 29"],
    datasets: [
      {
        label: "Number Of Sold Products",
        data: [1000, 1200, 900, 1500, 1800],
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

  const [lineGraph, setLineGraph] = useState(testLineGraph);
  const [numberOfProductLineGraph, setNumberOfProductLineGraph] =
    useState(testLineGraph2);

  const getStatistic = () => {
    getSoldNumberAPI(sessionStorage.getItem("accountToken"))
      .then((res) => {
        setSoldProducts(res);
        createLineGraph(res);
      })
      .catch((err) => console.log(err));
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

  const createLineGraph = (dataInfo) => {
    setLineGraph({
      ...lineGraph,
      s: [
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
      ],
    });
    setNumberOfProductLineGraph({
      ...numberOfProductLineGraph,
      labels: [
        [`${getMonthName(dataInfo[4].month)} `, `${dataInfo[4].year}`],
        [`${getMonthName(dataInfo[3].month)} `, `${dataInfo[3].year}`],
        [`${getMonthName(dataInfo[2].month)} `, `${dataInfo[2].year}`],
        [`${getMonthName(dataInfo[1].month)} `, `${dataInfo[1].year}`],
        [`${getMonthName(dataInfo[0].month)} `, `${dataInfo[0].year}`],
      ],
      datasets: [
        {
          label: "Number Of Sold Products",
          data: [
            dataInfo[4].totalNumberOfSoldProduct,
            dataInfo[3].totalNumberOfSoldProduct,
            dataInfo[2].totalNumberOfSoldProduct,
            dataInfo[1].totalNumberOfSoldProduct,
            dataInfo[0].totalNumberOfSoldProduct,
          ],
          borderColor: "green",
          backgroundColor: "transparent",
        },
      ],
    });
  };

  return (
    <div onLoad={() => getStatistic()}>
      <Header />
      <div className="py-[100px] bg-gradient-to-tr from-[#C0EEF2] to-[#146C94]">
        <section className="container mx-auto ">
          <div className="flex gap-x-20">
            <div className="flex flex-col">
              <h2 className="text-xl font-bold mb-6">Sales Report</h2>
              <div className="bg-gray-400 w-[1000px] h-[600px] mt-7">
                <h2 className="text-xl text-white p-4 font-bold">Chart</h2>
                <div
                  className="bg-white bg-opacity-10 w-[1000px] h-[480px] p-10 rounded-md flex justify-center items-center mb-5"
                  style={{
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {/* Insert chart into here */}
                  <Charts
                    type={"Line"}
                    data={lineGraph}
                    content={"Sold Product"}
                  />
                  <p className="mx-4"></p>
                  <Charts
                    type={"Line"}
                    data={numberOfProductLineGraph}
                    content={"Number Of Sold Products"}
                  />
                </div>
              </div>
            </div>
            {/* Best Sellers */}

            <div className="bg-gray-400 w-[300px] h-[680px]">
              <div
                className="bg-white bg-opacity-10 w-[300px] h-[720px] p-10 rounded-md flex flex-col justify-center items-center"
                style={{
                  backdropFilter: "blur(10px)",
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}
              >
                <h2 className="mb-8 text-[22px]">
                  <b>Most Sold Products</b>
                </h2>
                <div className="flex flex-col gap-y-8">
                  {bestSeller.length > 0 && bestSeller[0] !== null
                    ? bestSeller.map((product) => (
                        <HighlightedItems
                          header={product.gamePackName}
                          content={product.price}
                          imgSrc={product.image}
                        />
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Sales;
