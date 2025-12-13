export const tickets = [
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

export function getTicketById(id: string) {
  return tickets.find((ticket) => ticket.id === id);
}
