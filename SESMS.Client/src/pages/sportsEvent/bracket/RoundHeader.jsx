import React from "react";

const RoundHeader = ({ roundHeader }) => {
  return (
    <h3 className="mb-4 rounded-sm bg-[#929499] p-2 text-center text-lg font-bold">
      {roundHeader}
    </h3>
  );
};

export default RoundHeader;
