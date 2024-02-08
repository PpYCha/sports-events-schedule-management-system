export const bracketData = {
  participant: [
    {
      id: 0,
      tournament_id: 0,
      name: "Team 1",
    },
    {
      id: 1,
      tournament_id: 0,
      name: "Team 2",
    },
    {
      id: 2,
      tournament_id: 0,
      name: "Team 3",
    },
    {
      id: 3,
      tournament_id: 0,
      name: "Team 4",
    },
    {
      id: 4,
      tournament_id: 0,
      name: "Team 5",
    },
    {
      id: 5,
      tournament_id: 0,
      name: "Team 6",
    },
  ],
  stage: [
    {
      id: 0,
      tournament_id: 0,
      name: "Basketball",
      type: "single_elimination",
      number: 1,
      settings: {
        size: 16,
        seedOrdering: ["natural", "natural", "reverse_half_shift", "reverse"],
        // grandFinal: "double",
        matchesChildCount: 0,
      },
    },
  ],
  group: [
    {
      id: 0,
      stage_id: 0,
      number: 1,
    },
    {
      id: 1,
      stage_id: 0,
      number: 2,
    },
    {
      id: 2,
      stage_id: 0,
      number: 3,
    },
  ],
  round: [
    {
      id: 0,
      number: 1,
      stage_id: 0,
      group_id: 0,
    },
    {
      id: 1,
      number: 2,
      stage_id: 0,
      group_id: 0,
    },
    {
      id: 2,
      number: 3,
      stage_id: 0,
      group_id: 0,
    },
  ],
  match: [
    {
      id: 0,
      number: 1,
      stage_id: 0,
      group_id: 0,
      round_id: 0,
      child_count: 0,
      status: 4,
      opponent1: {
        id: 0,
        position: 1,
        score: 2,
        result: "win",
      },
      opponent2: {
        id: 1,
        position: 2,
        score: 1,
        result: "loss",
      },
    },
    {
      id: 1,
      number: 2,
      stage_id: 0,
      group_id: 0,
      round_id: 0,
      child_count: 0,
      status: 1,
      opponent1: {
        id: 3,
        position: 3,
        score: 2,
        result: "win",
      },
      opponent2: {
        id: 4,
        position: 4,
        score: 1,
        result: "loss",
      },
    },
    {
      id: 2,
      number: 3,
      stage_id: 0,
      group_id: 1,
      round_id: 0,
      child_count: 0,
      status: 1,
      opponent1: {
        id: 2,
        position: 5,
      },
      opponent2: {
        id: null,
      },
    },
    {
      id: 4,
      number: 5,
      stage_id: 0,
      group_id: 1,
      round_id: 2,
      child_count: 0,
      status: 1,
      opponent1: {
        id: 5,
        position: 5,
      },
      opponent2: {
        id: null,
      },
    },
    {
      id: 3,
      number: 4,
      stage_id: 0,
      group_id: 1,
      round_id: 0,
      child_count: 0,
      status: 1,
      opponent1: {
        id: 5,
        position: 5,
      },
      opponent2: {
        id: null,
      },
    },
  ],
  match_game: [],
};
