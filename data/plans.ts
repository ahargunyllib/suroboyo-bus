export const plans = [
  {
    id: 1,
    fromAddress: "Surabaya Zoo",
    toAddress: "Tunjungan Plaza",
    type: "fastest" as const,
    durationInMinutes: 29,
    distanceInMeters: 4300,
    price: 2500,
    steps: [
      {
        id: 1,
        type: "walk" as const,
        instruction: "Berjalan Ke Halte Suroboyo Zoo",
      },
      {
        id: 2,
        type: "bus" as const,
        startingStop: "Suroboyo Zoo",
        endingStop: "Tunjungan Plaza",
        bus: {
          id: 1,
          code: "1C",
          name: "Suroboyo Bus",
          type: "electric" as const,
        },
        options: [
          {
            id: 1,
            code: "SB-318",
            startingStop: "Suroboyo Zoo",
            endingStop: "Tunjungan Plaza",
            durationInMinutes: 5,
            routes: [
              {
                id: 1,
                name: "Universitas Airlangga Kamp A",
                durationInMinutes: 5,
              },
              {
                id: 2,
                name: "Universitas Airlangga Kamp B",
                durationInMinutes: 7,
              },
              {
                id: 3,
                name: "Universitas Airlangga Kamp C",
                durationInMinutes: 9,
              },
              {
                id: 4,
                name: "Halte Indomaret",
                durationInMinutes: 12,
              },
            ],
          },
        ],
      },
      {
        id: 3,
        type: "walk" as const,
        instruction:
          "Berjalan ke Tunjungan Plaza Jl. Jenderal Basuki Rachmat No.8-12, Kedungdoro, Tegalsari, Surabaya 60261 (TP 1-3) Jl. Embong Malang No.1-21 & 32-36",
        details: [
          "Ambil Keluar Halte Tunjungan Plaza",
          "Menuju Timur di Jl Jenderal Basuki Rachmat",
          "Belok Kiri",
        ],
      },
    ],
  },
];

export const recentPlans = [
  {
    id: 1,
    createdAt: new Date(),
  },
];

export const favoritePlans = [
  {
    id: 1,
    createdAt: new Date(),
  },
];
