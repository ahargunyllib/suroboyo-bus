export const ticketOffers = [
  {
    id: "student-ticket",
    name: "Tiket Pelajar",
    price: 2500,
  },
  {
    id: "general-ticket",
    name: "Tiket Umum",
    price: 5000,
  },
];

export function getTicketOfferById(id: string) {
  return ticketOffers.find((ticket) => ticket.id === id);
}
