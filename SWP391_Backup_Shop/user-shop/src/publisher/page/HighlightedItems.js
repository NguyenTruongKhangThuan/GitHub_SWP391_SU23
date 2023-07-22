import React from "react";

const HighlightedItems = ({ content, header, imgSrc }) => {
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div className="bg-white bg-opacity-20 drop-shadow-md w-[280px] flex hover:scale-110 duration-300 p-4">
      <img src={imgSrc} alt="Test" className="w-[100px]" />
      <div className="flex flex-col ml-2">
        <h2 className="text-[15px] font-bold">{header}</h2>
        <p className="text-[16px]">{VND.format(content)}</p>
      </div>
    </div>
  );
};

export default HighlightedItems;
