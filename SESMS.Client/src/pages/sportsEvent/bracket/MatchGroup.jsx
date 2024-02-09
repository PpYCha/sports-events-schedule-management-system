import React from "react";

const MatchGroup = ({ opponent1, opponent2, seed1, seed2, score1, score2 }) => {
  return (
    <div className="border-1 my-5 grid w-full grid-cols-1 rounded-sm border ">
      <div className="mb-0.5 grid grid-cols-6  ">
        <span className=" col-span-1 bg-[#787a80] text-center text-[#494b52] ">
          {seed1}
        </span>

        <span className="col-span-4 bg-[#58595e] pl-2 text-left font-bold text-white">
          {opponent1}
        </span>
        <span className=" col-span-1 bg-[#787a80] text-center text-[#494b52]">
          {score1}
        </span>
      </div>
      <div className="mb-0.5 grid grid-cols-6  ">
        <span className=" col-span-1 bg-[#787a80] text-center text-[#494b52]">
          {seed2}
        </span>

        <span className="col-span-4 bg-[#58595e] pl-2 text-left font-bold text-white">
          {opponent2}
        </span>
        <span className=" col-span-1 bg-[#787a80] text-center text-[#494b52]">
          {score2}
        </span>
      </div>
      {/* {match.winner && (
        <div className="text-gray-600">Winner: {match.winner}</div>
      )} */}
    </div>
  );
};

export default MatchGroup;
