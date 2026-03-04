export const attractionCategories = [
  "kuliner",
  "mall",
  "ruang_terbuka",
  "tempat_ibadah",
] as const;

export type AttractionCategory = (typeof attractionCategories)[number];

export type Attraction = {
  id: string;
  name: string;
  category: AttractionCategory;
  rating?: number;
  address?: string;
  description?: string;
  imageUrl: number | string;
  coordinate?: {
    latitude: number;
    longitude: number;
  };
};

export type Event = {
  id: string;
  title: string;
  imageUrl: number | string;
};

export const events: Event[] = [
  {
    id: "event-1",
    title: "Festival Kuliner Surabaya 2024",
    imageUrl: require("@/assets/dummy/event-1.png"),
  },
  {
    id: "event-2",
    title: "Surabaya Music Festival",
    imageUrl: require("@/assets/dummy/event-2.png"),
  },
];

export const attractions: Attraction[] = [
  // Kuliner
  {
    id: "kuliner-1",
    name: "Rawon Setan Embong Malang",
    category: "kuliner",
    rating: 4.2,
    address: "Jl. Embong Malang No.78J, Kedungdoro",
    description:
      "Rawon legendaris dengan kuah hitam pekat dan daging empuk yang terkenal sejak tahun 1950-an",
    imageUrl: require("@/assets/dummy/rawon.png"),
    coordinate: { latitude: -7.262, longitude: 112.7352 },
  },
  {
    id: "kuliner-2",
    name: "Depot Sederhanana (Gubeng Pojok)",
    category: "kuliner",
    rating: 4.6,
    address: "Jl. Gubeng Pojok No.1-3, Gubeng",
    description:
      "Depot legendaris dengan masakan Chinese-Indonesian sejak 1932, terkenal dengan ayam kodok dan ikan goreng kecap",
    imageUrl: require("@/assets/dummy/depot-sederhanana.png"),
    coordinate: { latitude: -7.2747, longitude: 112.752 },
  },
  {
    id: "kuliner-3",
    name: "Soto Ayam Ambengan Pak Min",
    category: "kuliner",
    rating: 4.4,
    address: "Jl. Ambengan No.41, Genteng",
    description:
      "Soto ayam khas Surabaya dengan kuah bening segar, suwiran ayam kampung, dan bumbu rahasia turun temurun",
    imageUrl: require("@/assets/dummy/sate-klopo.png"),
    coordinate: { latitude: -7.258, longitude: 112.748 },
  },
  {
    id: "kuliner-4",
    name: "Bakmi Cahaya Timur dan Mie Kopyok",
    category: "kuliner",
    rating: 4.6,
    address: "Jl. Kalianyar Timur Blok H No.13, Benowo",
    description:
      "Bakmi halus dengan topping daging dan pangsit yang lezat, favorit warga Surabaya sejak puluhan tahun",
    imageUrl: require("@/assets/dummy/bakmi-cahaya.png"),
    coordinate: { latitude: -7.2469, longitude: 112.6769 },
  },

  // Mall
  {
    id: "mall-1",
    name: "Tunjungan Plaza",
    category: "mall",
    rating: 4.7,
    address: "Jl. Basuki Rahmat No.8-12, Embong Kaliasin",
    description:
      "Mall ikonik Surabaya dengan 6 gedung yang saling terhubung, menawarkan berbagai brand internasional",
    imageUrl: require("@/assets/dummy/tunjungan-plaza.png"),
    coordinate: { latitude: -7.2618, longitude: 112.7382 },
  },
  {
    id: "mall-2",
    name: "Pakuwon Mall",
    category: "mall",
    rating: 4.7,
    address: "Jl. Puncak Indah Lontar No.2, Babakan",
    description:
      "Mall modern dengan konsep lifestyle dan entertainment, dilengkapi food court dan bioskop",
    imageUrl: require("@/assets/dummy/pakuwon-mall.png"),
    coordinate: { latitude: -7.2886, longitude: 112.6656 },
  },
  {
    id: "mall-3",
    name: "Ciputra World Surabaya",
    category: "mall",
    rating: 4.6,
    address: "Jl. Mayjend Sungkono No.87-89, Pakis",
    description:
      "Kompleks mixed-use premium dengan hotel, apartemen, dan retail area yang sangat lengkap",
    imageUrl: require("@/assets/dummy/ciputra-world.png"),
    coordinate: { latitude: -7.293, longitude: 112.7166 },
  },
  {
    id: "mall-4",
    name: "Grand City Mall Surabaya",
    category: "mall",
    rating: 4.5,
    address: "Jl. Manyar Kertoarjo III No.1, Manyar Sabrangan",
    description:
      "Mall family-friendly dengan berbagai tenant lokal dan internasional serta area bermain anak",
    imageUrl: require("@/assets/dummy/grand-city.png"),
    coordinate: { latitude: -7.2775, longitude: 112.7574 },
  },

  // Ruang Terbuka
  {
    id: "ruang-terbuka-1",
    name: "Taman Ekspresi Kota Surabaya",
    category: "ruang_terbuka",
    rating: 4.5,
    address: "Jl. Gubernur Suryo, Embong Kaliasin",
    description:
      "Taman kota di pusat Surabaya dengan area hijau yang nyaman untuk bersantai dan berolahraga",
    imageUrl: require("@/assets/dummy/taman-ekspresi.png"),
    coordinate: { latitude: -7.2637, longitude: 112.7413 },
  },
  {
    id: "ruang-terbuka-2",
    name: "Alun-Alun Kota Surabaya",
    category: "ruang_terbuka",
    rating: 4.8,
    address: "Jl. Taman Apsari, Pabean Cantian",
    description:
      "Alun-alun dengan air mancur dancing fountain yang spektakuler, tempat berkumpul favorit keluarga",
    imageUrl: require("@/assets/dummy/alun-alun.png"),
    coordinate: { latitude: -7.2566, longitude: 112.7399 },
  },
  {
    id: "ruang-terbuka-3",
    name: "Wisata Perahu Kalimas",
    category: "ruang_terbuka",
    rating: 4.1,
    address: "Kawasan Kalimas, Kota Lama",
    description:
      "Wisata naik perahu menyusuri Sungai Kalimas sambil menikmati pemandangan bangunan bersejarah",
    imageUrl: require("@/assets/dummy/wisata-perahu.png"),
    coordinate: { latitude: -7.247, longitude: 112.738 },
  },
  {
    id: "ruang-terbuka-4",
    name: "Taman Hiburan Pantai Kenjeran",
    category: "ruang_terbuka",
    rating: 4.3,
    address: "Jl. Pantai Kenjeran, Bulak",
    description:
      "Kawasan wisata pantai dengan wahana permainan, kuliner seafood, dan pagoda yang indah",
    imageUrl: require("@/assets/dummy/taman-hiburan.png"),
    coordinate: { latitude: -7.2455, longitude: 112.7937 },
  },

  // Tempat Ibadah
  {
    id: "tempat-ibadah-1",
    name: "Masjid Terdekat",
    category: "tempat_ibadah",
    description:
      "Masjid bersejarah dengan arsitektur klasik yang menjadi landmark kota Surabaya",
    imageUrl: require("@/assets/dummy/masjid.png"),
    coordinate: { latitude: -7.2504, longitude: 112.7525 },
  },
  {
    id: "tempat-ibadah-2",
    name: "Gereja Terdekat",
    category: "tempat_ibadah",
    description:
      "Gereja katedral dengan arsitektur gothic yang megah dan menjadi tempat ibadah bersejarah",
    imageUrl: require("@/assets/dummy/gereja.png"),
    coordinate: { latitude: -7.2579, longitude: 112.7514 },
  },
  {
    id: "tempat-ibadah-3",
    name: "Pura Terdekat",
    category: "tempat_ibadah",
    description:
      "Pura dengan ornamen tradisional Bali yang indah, tempat ibadah umat Hindu di Surabaya",
    imageUrl: require("@/assets/dummy/pura.png"),
    coordinate: { latitude: -7.2924, longitude: 112.7378 },
  },
  {
    id: "tempat-ibadah-4",
    name: "Vihara Terdekat",
    category: "tempat_ibadah",
    description:
      "Vihara dengan arsitektur Tiongkok klasik yang megah dan penuh dengan nilai spiritual",
    imageUrl: require("@/assets/dummy/vihara.png"),
    coordinate: { latitude: -7.2541, longitude: 112.7385 },
  },
  {
    id: "tempat-ibadah-5",
    name: "Klenteng Terdekat",
    category: "tempat_ibadah",
    description:
      "Klenteng bersejarah dengan dekorasi merah dan emas yang khas, tempat sembahyang umat Konghucu",
    imageUrl: require("@/assets/dummy/klenteng.png"),
    coordinate: { latitude: -7.2468, longitude: 112.7372 },
  },
];

export function getAttractionsByCategory(
  category: AttractionCategory
): Attraction[] {
  return attractions.filter((attraction) => attraction.category === category);
}

export function getCategoryDisplayName(category: AttractionCategory): string {
  const names: Record<AttractionCategory, string> = {
    kuliner: "Kuliner",
    mall: "Mall",
    ruang_terbuka: "Ruang Terbuka",
    tempat_ibadah: "Tempat Ibadah",
  };
  return names[category];
}
