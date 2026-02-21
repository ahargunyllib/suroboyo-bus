export type FAQ = {
  id: string;
  question: string;
  answer: string | string[];
  type: "operational" | "schedule" | "payment" | "ticketing" | "luggage";
};

export type FAQType = FAQ["type"];

export const faqTypes = [
  { id: "operational", name: "Operasional" },
  { id: "schedule", name: "Jadwal Keberangkatan" },
  { id: "payment", name: "Pembayaran" },
  { id: "ticketing", name: "Tiket" },
  { id: "luggage", name: "Barang Bawaan" },
] as const;

export function getFaqTypeById(id: FAQType) {
  return faqTypes.find((faqType) => faqType.id === id);
}

export const faqs = [
  {
    id: "operational-001",
    question: "Operasional Suroboyo Bus Jam Berapa?",
    answer: "Operasional Suroboyo Bus Jam 05.30 - 21.00",
    type: "operational" as const,
  },
  {
    id: "operational-002",
    question: "Halte yang beroperasi tiap koridor?",
    answer:
      "Halte yang beroperasi tiap koridor dapat dilihat melalui instagram @Suroboyobus",
    type: "operational" as const,
  },
  {
    id: "operational-003",
    question: "Jam keberangkatan akhir pukul berapa?",
    answer: "Jam Keberangkatan akhir pukul 20.00",
    type: "operational" as const,
  },
  {
    id: "operational-004",
    question:
      "Apakah bisa naik dan turun bus Suroboyo Bus tidak melalui halte?",
    answer: "Naik dan turun Bus Suroboyo Bus wajib melalui halte",
    type: "operational" as const,
  },
  {
    id: "schedule-001",
    question: "Jadwal keberangkatan tiap koridor",
    answer:
      "Jadwal keberangkatan dapat ditinjau melalui instagram @Suroboyobus",
    type: "schedule" as const,
  },
  {
    id: "payment-001",
    question: "Berapa tarif naik Suroboyo Bus?",
    answer:
      "Tarif sekali jalan untuk umum Rp 5.000 dan pelajar/mahasiswa Rp 2.500",
    type: "payment" as const,
  },
  {
    id: "payment-002",
    question: "Apakah anak-anak dikenakan tarif?",
    answer:
      "Anak-anak mulai usia 4 tahun atau Tinggi Badan 90 cm sudah dikenakan tarif normal Rp 5.000",
    type: "payment" as const,
  },
  {
    id: "payment-003",
    question: "Bagaimana sistem pembayaran Suroboyo Bus?",
    answer: "Pembayaran dapat dilakukan dengan tunai dan non tunai.",
    type: "payment" as const,
  },
  {
    id: "payment-004",
    question: "Pembayaran non tunai apa saja yang disediakan?",
    answer:
      "Pembayaran non tunai bisa dilakukan melalui pembayaran QRIS pada aplikasi Suroboyo Bus",
    type: "payment" as const,
  },
  {
    id: "ticketing-001",
    question: "Bagaimana cara membeli tiket Suroboyo Bus?",
    answer:
      "Tiket dapat dibeli melalui aplikasi Suroboyo Bus atau langsung saat naik Suroboyo Bus",
    type: "ticketing" as const,
  },
  {
    id: "ticketing-002",
    question:
      "Apakah bisa membeli tiket lebih dari 1 di aplikasi Suroboyo Bus?",
    answer:
      "Tiket bisa dibeli lebih dari 1 namun pembelian dilakukan satu per satu",
    type: "ticketing" as const,
  },
  {
    id: "ticketing-003",
    question:
      "Apakah tiket bisa digunakan di hari yang berbeda dari waktu pembelian?",
    answer:
      "Tiket bus tetap dapat digunakan selama barcode belum terscan oleh petugas Pramugara/i",
    type: "ticketing" as const,
  },
  {
    id: "ticketing-004",
    question: "Bagaimana sistem tiket integrasi antar koridor?",
    answer:
      "Penumpang cukup melakukan 1x pembayaran dengan waktu maks 2 jam saat pindak koridor tidak dikenakan tambahan biaya",
    type: "ticketing" as const,
  },
  {
    id: "luggage-001",
    question: "Apakah diperbolehkan membawa hewan?",
    answer: "Naik Suroboyo Bus tidak diperkenankan membawa hewan peliharaan",
    type: "luggage" as const,
  },
  {
    id: "luggage-002",
    question: "Apakah diperbolehkan membawa makanan?",
    answer:
      "Penumpang Suroboyo Bus tidak diperkenankan membawa makanan berbau menyengat seperti Durian, Jengkol, Ikan/Ayam/Daging Mentah",
    type: "luggage" as const,
  },
  {
    id: "luggage-003",
    question: "Apakah diperbolehkan membawa sepeda lipat?",
    answer:
      'Ketentuan membawa sepeda lipat max size 16" dalam kondisi terlipat dan saat bus sedang tidak ramai',
    type: "luggage" as const,
  },
  {
    id: "luggage-004",
    question: "Bagaimana prosedur jika ada barang tertingal?",
    answers: [
      "Penumpang menghubungi Whatsapp CS Suroboyo Bus",
      "Menunjukan tiket naik bus",
      "Penumpang datang ke Kantor Admin Kasir di Pool terdekat",
      "Mengisi form laporan barang tertinggal",
      "Melakukan swafoto sebagai bukti laporan pengambilan",
    ],
    type: "luggage" as const,
  },
];

export function getFaqByType(type: FAQType) {
  return faqs.filter((faq) => faq.type === type);
}
