import HierarchicalTable from "@/app/[locale]/list/a";

export default function List() {
  const data = [
    {
      id: "dsa12321",
      startTime: "2023-12-9 22:22:22",
      clubId: "AD12343",
      roomId: "AD12343",
      level: 2,
      amount: 500,
      endTime: "2023-12-9 22:22:22",
      rounds: [
        {
          id: "SDF2343",
          basebet: 1000,
          bombCount: 10,
          maxBet: 1000,
          tribute: 10,
          startTime: "2023-12-9 22:20:22",
          endTime: "2023-12-9 22:22:22",
          players: [
            { id: "yourmom", score: 5, rank: 1 },
            { id: "yourgraa", score: 5, rank: 2 },
            { id: "yourgraa", score: 2, rank: 3 },
            { id: "yourgraa", score: 2, rank: 4 },
          ],
        },
        {
          id: "SDF2344",
          basebet: 1200,
          bombCount: 8,
          maxBet: 1200,
          tribute: 12,
          startTime: "2023-12-9 22:23:22",
          endTime: "2023-12-9 22:25:22",
          players: [
            { id: "player1", score: 7, rank: 1 },
            { id: "player2", score: 6, rank: 2 },
            { id: "player3", score: 4, rank: 3 },
          ],
        },
      ],
    },
    {
      id: "dsa12322",
      startTime: "2023-12-10 10:00:00",
      clubId: "AD12344",
      roomId: "AD12344",
      level: 3,
      amount: -300,
      endTime: "2023-12-10 10:30:00",
      rounds: [
        {
          id: "SDF2345",
          basebet: 1500,
          bombCount: 12,
          maxBet: 1500,
          tribute: 15,
          startTime: "2023-12-10 10:00:00",
          endTime: "2023-12-10 10:15:00",
          players: [
            { id: "player4", score: 8, rank: 1 },
            { id: "player5", score: 6, rank: 2 },
            { id: "player6", score: 4, rank: 3 },
            { id: "player7", score: 2, rank: 4 },
          ],
        },
        {
          id: "SDF2346",
          basebet: 1800,
          bombCount: 15,
          maxBet: 1800,
          tribute: 18,
          startTime: "2023-12-10 10:16:00",
          endTime: "2023-12-10 10:30:00",
          players: [
            { id: "player8", score: 9, rank: 1 },
            { id: "player9", score: 7, rank: 2 },
            { id: "player10", score: 5, rank: 3 },
          ],
        },
      ],
    },
  ];

  return <HierarchicalTable data={data} />;
}
