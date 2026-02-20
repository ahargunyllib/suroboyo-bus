import { GraduationCapIcon, UserIcon } from "lucide-react-native";

export const ticketOffers = [
  {
    id: "student-ticket",
    name: "Tiket Pelajar",
    price: 2500,
    icon: GraduationCapIcon,
    tnc: [
      "Tiket Umum digunakan untuk penumpang umum, sedangkan Tiket Pelajar hanya digunakan untuk penumpang pelajar.",
      "Pembelian atau penggunaan Tiket Pelajar harus menunjukan Kartu Tanda Pelajar.",
      "Tiket Non-Promo tidak ada masa berlakunya, sedangkan Tiket Promo ada masa berlakunya.",
      "Tiket Promo hanya dapat di beli dan digunakan hanya saat masa promo, jika tidak digunakan setelah masa promo berakhir maka akan hangus.",
      "Tiket yang sudah di beli tidak dapat dikembalikan (non-refundable).",
    ],
  },
  {
    id: "general-ticket",
    name: "Tiket Umum",
    price: 5000,
    icon: UserIcon,
    tnc: [
      "Tiket Umum digunakan untuk penumpang umum, sedangkan Tiket Pelajar hanya digunakan untuk penumpang pelajar.",
      "Pembelian atau penggunaan Tiket Pelajar harus menunjukan Kartu Tanda Pelajar.",
      "Tiket Non-Promo tidak ada masa berlakunya, sedangkan Tiket Promo ada masa berlakunya.",
      "Tiket Promo hanya dapat di beli dan digunakan hanya saat masa promo, jika tidak digunakan setelah masa promo berakhir maka akan hangus.",
      "Tiket yang sudah di beli tidak dapat dikembalikan (non-refundable).",
    ],
  },
];

export function getTicketOfferById(id: string) {
  return ticketOffers.find((ticket) => ticket.id === id);
}

export const ownedTickets = [
  {
    id: "ticket-001",
    ticketOfferId: "student-ticket",
    ticketOffer: {
      id: "student-ticket",
      name: "Tiket Pelajar",
      price: 2500,
    },
    status: "active" as const,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 days later
  },
  {
    id: "ticket-002",
    ticketOfferId: "general-ticket",
    ticketOffer: {
      id: "general-ticket",
      name: "Tiket Umum",
      price: 5000,
    },
    status: "expired" as const,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    expiresAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    id: "ticket-003",
    ticketOfferId: "general-ticket",
    ticketOffer: {
      id: "general-ticket",
      name: "Tiket Umum",
      price: 5000,
    },
    status: "used" as const,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days later
    usedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    routeId: 2,
    planId: 1,
    plan: {
      id: 1,
      departureTime: "19:27",
      arrivalTime: "19:56",
      durationInMinutes: 29,
    },
  },
];
