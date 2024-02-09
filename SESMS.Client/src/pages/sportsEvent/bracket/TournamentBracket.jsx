import React, { useEffect, useState } from "react";
import RoundHeader from "./RoundHeader";
import MatchGroup from "./MatchGroup";
import { Button, IconButton, Tooltip } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";

const TournamentBracket = () => {
  const [teams, setTeams] = useState([
    "Team A",
    "Team B",
    "Team C",
    "Team D",
    "Team E",
    "Team F",
  ]);
  const [round1Matches, setRound1Matches] = useState([]);
  const [semiFinalsMatches, setSemiFinalsMatches] = useState([]);
  const [finalsMatches, setFinalsMatches] = useState([]);

  useEffect(() => {
    if (round1Matches.length === 0) {
      setRound1Matches(generateMatches(teams));
    }
  }, [teams]);

  useEffect(() => {
    if (
      round1Matches.length > 0 &&
      semiFinalsMatches.length === 0 &&
      round1Matches.every((match) => match.winner !== null)
    ) {
      moveWinnersToNextRound(round1Matches, setSemiFinalsMatches);
    }
  }, [round1Matches, semiFinalsMatches]);

  useEffect(() => {
    if (
      semiFinalsMatches.length > 0 &&
      finalsMatches.length === 0 &&
      semiFinalsMatches.every((match) => match.winner !== null)
    ) {
      moveWinnersToNextRound(semiFinalsMatches, setFinalsMatches);
    }
  }, [semiFinalsMatches, finalsMatches]);

  const generateMatches = (teams) => {
    const shuffledTeams = [...teams].sort(() => 0.5 - Math.random());
    const matches = [];

    for (let i = 0; i < shuffledTeams.length; i += 2) {
      const match = {
        team1: shuffledTeams[i],
        team2: shuffledTeams[i + 1],
        winner: null,
        seed1: i,
        seed2: i + 1,
      };
      matches.push(match);
    }

    return matches;
  };

  const handleWinner = (matches, setMatches, index, winner) => {
    const updatedMatches = [...matches];
    updatedMatches[index].winner = winner;
    setMatches(updatedMatches);
  };

  const moveWinnersToNextRound = (matches, setMatches) => {
    const winners = matches.filter((match) => match.winner !== null);
    const newMatches = generateMatches(winners.map((match) => match.winner));
    setMatches(newMatches);
  };
  return (
    <div className="flex space-x-8 rounded-lg bg-white  p-10">
      <div className="w-1/3 ">
        <RoundHeader roundHeader="Round 1" />
        {round1Matches.map((match, index) => (
          <div
            key={index}
            className="mb-2 flex w-full  items-center justify-center px-5"
          >
            {/* <div>
              <span className="font-bold">{match.team1}</span> vs{" "}
              <span className="font-bold">{match.team2}</span>
              {match.winner && (
                <div className="text-gray-600">Winner: {match.winner}</div>
              )}
            </div> */}
            <MatchGroup
              opponent1={match.team1}
              opponent2={match.team2}
              seed1={match.seed1}
              seed2={match.seed2}
              score1={5}
              score2={2}
            />

            <Tooltip content="Report Scores">
              <IconButton
                className="flex items-center justify-center gap-5 "
                variant="text"
              >
                <PencilIcon className="h-5 w-5 text-[#929499]" />
              </IconButton>
            </Tooltip>
            {/* {!match.winner && (
              <div>
                <button
                  className="mr-2 rounded bg-blue-500 px-2 py-1 text-white"
                  onClick={() =>
                    handleWinner(
                      round1Matches,
                      setRound1Matches,
                      index,
                      match.team1,
                    )
                  }
                >
                  Win
                </button>
                <button
                  className="rounded bg-blue-500 px-2 py-1 text-white"
                  onClick={() =>
                    handleWinner(
                      round1Matches,
                      setRound1Matches,
                      index,
                      match.team2,
                    )
                  }
                >
                  Win
                </button>
              </div>
            )} */}
          </div>
        ))}
      </div>

      <div className="w-1/3">
        <RoundHeader roundHeader="Semi-Finals" />
        {semiFinalsMatches.map((match, index) => (
          <div key={index} className="mb-2 flex items-center justify-between">
            <div>
              <span className="font-bold">{match.team1}</span> vs{" "}
              <span className="font-bold">{match.team2}</span>
              {match.winner && (
                <div className="text-gray-600">Winner: {match.winner}</div>
              )}
            </div>
            {!match.winner && (
              <div>
                <button
                  className="mr-2 rounded bg-blue-500 px-2 py-1 text-white"
                  onClick={() =>
                    handleWinner(
                      semiFinalsMatches,
                      setSemiFinalsMatches,
                      index,
                      match.team1,
                    )
                  }
                >
                  Win
                </button>
                <button
                  className="rounded bg-blue-500 px-2 py-1 text-white"
                  onClick={() =>
                    handleWinner(
                      semiFinalsMatches,
                      setSemiFinalsMatches,
                      index,
                      match.team2,
                    )
                  }
                >
                  Win
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-1/3">
        <RoundHeader roundHeader="Finals" />
        {finalsMatches.map((match, index) => (
          <div key={index} className="mb-2 flex items-center justify-between">
            <div>
              <span className="font-bold">{match.team1}</span> vs{" "}
              <span className="font-bold">{match.team2}</span>
              {match.winner && (
                <div className="text-gray-600">Winner: {match.winner}</div>
              )}
            </div>
            {!match.winner && (
              <div>
                <button
                  className="mr-2 rounded bg-blue-500 px-2 py-1 text-white"
                  onClick={() =>
                    handleWinner(
                      finalsMatches,
                      setFinalsMatches,
                      index,
                      match.team1,
                    )
                  }
                >
                  Win
                </button>
                <button
                  className="rounded bg-blue-500 px-2 py-1 text-white"
                  onClick={() =>
                    handleWinner(
                      finalsMatches,
                      setFinalsMatches,
                      index,
                      match.team2,
                    )
                  }
                >
                  Win
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentBracket;
