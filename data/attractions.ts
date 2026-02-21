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
	imageUrl: string;
};

export type Event = {
	id: string;
	title: string;
	imageUrl: string;
};

export const events: Event[] = [
	{
		id: "event-1",
		title: "Festival Kuliner Surabaya 2024",
		imageUrl: "https://picsum.photos/seed/event-1/400/200",
	},
	{
		id: "event-2",
		title: "Surabaya Music Festival",
		imageUrl: "https://picsum.photos/seed/event-2/400/200",
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
		imageUrl: "https://picsum.photos/seed/kuliner1/300/200",
	},
	{
		id: "kuliner-2",
		name: "Depot Sederhanana (Gubeng Pojok)",
		category: "kuliner",
		rating: 4.6,
		address: "Jl. Gubeng Pojok No.1-3, Gubeng",
		description:
			"Depot legendaris dengan masakan Chinese-Indonesian sejak 1932, terkenal dengan ayam kodok dan ikan goreng kecap",
		imageUrl: "https://picsum.photos/seed/kuliner2/300/200",
	},
	{
		id: "kuliner-3",
		name: "Soto Ayam Ambengan Pak Min",
		category: "kuliner",
		rating: 4.4,
		address: "Jl. Ambengan No.41, Genteng",
		description:
			"Soto ayam khas Surabaya dengan kuah bening segar, suwiran ayam kampung, dan bumbu rahasia turun temurun",
		imageUrl: "https://picsum.photos/seed/kuliner3/300/200",
	},
	{
		id: "kuliner-4",
		name: "Bakmi Cahaya Timur dan Mie Kopyok",
		category: "kuliner",
		rating: 4.6,
		address: "Jl. Kalianyar Timur Blok H No.13, Benowo",
		description:
			"Bakmi halus dengan topping daging dan pangsit yang lezat, favorit warga Surabaya sejak puluhan tahun",
		imageUrl: "https://picsum.photos/seed/kuliner4/300/200",
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
		imageUrl: "https://picsum.photos/seed/mall1/300/200",
	},
	{
		id: "mall-2",
		name: "Pakuwon Mall",
		category: "mall",
		rating: 4.7,
		address: "Jl. Puncak Indah Lontar No.2, Babakan",
		description:
			"Mall modern dengan konsep lifestyle dan entertainment, dilengkapi food court dan bioskop",
		imageUrl: "https://picsum.photos/seed/mall2/300/200",
	},
	{
		id: "mall-3",
		name: "Ciputra World Surabaya",
		category: "mall",
		rating: 4.6,
		address: "Jl. Mayjend Sungkono No.87-89, Pakis",
		description:
			"Kompleks mixed-use premium dengan hotel, apartemen, dan retail area yang sangat lengkap",
		imageUrl: "https://picsum.photos/seed/mall3/300/200",
	},
	{
		id: "mall-4",
		name: "Grand City Mall Surabaya",
		category: "mall",
		rating: 4.5,
		address: "Jl. Manyar Kertoarjo III No.1, Manyar Sabrangan",
		description:
			"Mall family-friendly dengan berbagai tenant lokal dan internasional serta area bermain anak",
		imageUrl: "https://picsum.photos/seed/mall4/300/200",
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
		imageUrl: "https://picsum.photos/seed/park1/300/200",
	},
	{
		id: "ruang-terbuka-2",
		name: "Alun-Alun Kota Surabaya",
		category: "ruang_terbuka",
		rating: 4.8,
		address: "Jl. Taman Apsari, Pabean Cantian",
		description:
			"Alun-alun dengan air mancur dancing fountain yang spektakuler, tempat berkumpul favorit keluarga",
		imageUrl: "https://picsum.photos/seed/park2/300/200",
	},
	{
		id: "ruang-terbuka-3",
		name: "Wisata Perahu Kalimas",
		category: "ruang_terbuka",
		rating: 4.1,
		address: "Kawasan Kalimas, Kota Lama",
		description:
			"Wisata naik perahu menyusuri Sungai Kalimas sambil menikmati pemandangan bangunan bersejarah",
		imageUrl: "https://picsum.photos/seed/park3/300/200",
	},
	{
		id: "ruang-terbuka-4",
		name: "Taman Hiburan Pantai Kenjeran",
		category: "ruang_terbuka",
		rating: 4.3,
		address: "Jl. Pantai Kenjeran, Bulak",
		description:
			"Kawasan wisata pantai dengan wahana permainan, kuliner seafood, dan pagoda yang indah",
		imageUrl: "https://picsum.photos/seed/park4/300/200",
	},

	// Tempat Ibadah
	{
		id: "tempat-ibadah-1",
		name: "Masjid Terdekat",
		category: "tempat_ibadah",
		description:
			"Masjid bersejarah dengan arsitektur klasik yang menjadi landmark kota Surabaya",
		imageUrl: "https://picsum.photos/seed/worship1/300/200",
	},
	{
		id: "tempat-ibadah-2",
		name: "Gereja Terdekat",
		category: "tempat_ibadah",
		description:
			"Gereja katedral dengan arsitektur gothic yang megah dan menjadi tempat ibadah bersejarah",
		imageUrl: "https://picsum.photos/seed/worship2/300/200",
	},
	{
		id: "tempat-ibadah-3",
		name: "Pura Terdekat",
		category: "tempat_ibadah",
		description:
			"Pura dengan ornamen tradisional Bali yang indah, tempat ibadah umat Hindu di Surabaya",
		imageUrl: "https://picsum.photos/seed/worship3/300/200",
	},
	{
		id: "tempat-ibadah-4",
		name: "Vihara Terdekat",
		category: "tempat_ibadah",
		description:
			"Vihara dengan arsitektur Tiongkok klasik yang megah dan penuh dengan nilai spiritual",
		imageUrl: "https://picsum.photos/seed/worship4/300/200",
	},
	{
		id: "tempat-ibadah-5",
		name: "Klenteng Terdekat",
		category: "tempat_ibadah",
		description:
			"Klenteng bersejarah dengan dekorasi merah dan emas yang khas, tempat sembahyang umat Konghucu",
		imageUrl: "https://picsum.photos/seed/worship5/300/200",
	},
];

export function getAttractionsByCategory(
	category: AttractionCategory,
): Attraction[] {
	return attractions.filter(
		(attraction) => attraction.category === category,
	);
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
