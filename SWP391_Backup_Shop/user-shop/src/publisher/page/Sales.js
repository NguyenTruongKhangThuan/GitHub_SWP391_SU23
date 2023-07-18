import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import Charts from "../../admin/components/Charts";
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
    getSoldNumberAPI(sessionStorage.getItem("accountToken"))
      .then((res) => setSoldProducts(res))
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
  return (
    <div>
      <Header />
      <div className="py-[100px]">
        <section className="container mx-auto">
          <div className="flex gap-x-20">
            <div className="flex flex-col">
              <h2 className="text-xl font-bold mb-6">Sales Report</h2>
              <div className="bg-gray-400 w-[1000px] h-[600px] mt-7">
                <h2 className="text-xl text-white p-4 font-bold">Chart</h2>
                <div className="">
                  {/* Insert chart into here */}
                  <Charts
                    type={"Line"}
                    data={testLineGraph}
                    content={"Sold Product"}
                  />
                </div>
              </div>
            </div>
            {/* Best Sellers */}
            <div className="bg-gray-400 w-[300px] h-[680px]">
              {bestSeller &&
                bestSeller.map((product) => (
                  <div className="h-1/3">
                    <img src={product.image} alt="" />
                    <div>{product.gamePackName}</div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Sales;
