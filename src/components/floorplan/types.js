/**
 * types.js — Resmî BWA planlarına göre tip-bazlı daire modelleri
 * Birim METRE, üstten bakış (x sağa, y aşağı). Odalar POLİGON (axis-aligned).
 */

export const TYPES = {
  "1+1": {
    code: "1+1", netArea: 43.05, grossArea: 51.42,
    env: [8.2, 6.0],
    rooms: [
      // L-açık plan; sol-üst köşe çıkıntı (notch) dışarıda
      { key: "livingkitchen", label: "Salon + Mutfak", area: 24.39, floor: "parke",
        poly: [[3.5,0.0],[7.5,0.0],[7.5,3.0],[0.0,3.0],[0.0,1.3],[3.5,1.3]] },
      { key: "bedroom", label: "Yatak Odası", area: 13.80, floor: "parke",
        poly: [[2.6,3.0],[7.5,3.0],[7.5,6.0],[2.6,6.0]] },
      { key: "bath", label: "Banyo", area: 2.97, floor: "fayans",
        poly: [[0.0,3.0],[2.3,3.0],[2.3,4.5],[0.0,4.5]] },
      { key: "balcony", label: "Balkon", area: 1.89, floor: "fayans", railing: true,
        poly: [[7.5,0.0],[8.2,0.0],[8.2,6.0],[7.5,6.0]] },
    ],
    doors: [
      { o: "v", at: 0.0, a: 1.85, b: 2.85 }, // giriş kapısı
      { o: "h", at: 3.0, a: 3.15, b: 4.1 },  // yatak odası kapısı (gardıroptan uzak, 90° açılır)
      { o: "h", at: 3.0, a: 0.88, b: 1.58 }, // banyo kapısı (duş ile lavabo arası, mutfağa doğru)
    ],
    glass: [
      { o: "v", at: 7.5, a: 0.4, b: 2.7 },   // salon -> balkon sürme cam
      { o: "v", at: 7.5, a: 3.3, b: 5.7 },   // yatak -> balkon sürme cam
      // L koltuğun arkası (üst duvar) artık cam değil, duvar
    ],
    furniture: [
      // --- MUTFAK (sol-üst, tezgah y1.3-2.0) ---
      { t: "counter", rect: [0.1, 1.3, 3.3, 0.62] },
      { t: "fridge", rect: [0.1, 1.32, 0.62, 0.66] },
      { t: "sink", rect: [1.5, 1.45, 0.6, 0.4] },
      { t: "stove", rect: [2.6, 1.42, 0.6, 0.5] },
      // --- yemek: masa notch duvarına (x3.5) yapışık, 2 sandalye önünde ---
      { t: "table", rect: [3.5, 0.25, 0.55, 1.1] },
      { t: "chair", rect: [4.12, 0.32, 0.46, 0.46], face: "west" },
      { t: "chair", rect: [4.12, 0.86, 0.46, 0.46], face: "west" },
      // --- OTURMA: L koltuk + tekli koltuk + sehpa (aralarda net boşluk) ---
      { t: "rug", rect: [4.7, 0.35, 2.7, 2.3], color: "#9aa3ad" },
      { t: "sofaL", rect: [4.85, 0.4, 1.7, 1.3], face: "topleft" },
      { t: "coffee", rect: [5.15, 1.55, 0.9, 0.55] },
      { t: "armchair", rect: [6.72, 1.45, 0.72, 0.82], face: "west" },
      // --- TV ünitesi (salon/yatak ayıran duvarda, salona bakan, küçük TV) ---
      { t: "console", rect: [4.7, 2.66, 1.7, 0.3], tv: 0.9 },
      // --- YATAK ODASI ---
      { t: "rug", rect: [3.6, 3.2, 3.3, 2.5], color: "#b3a690" },
      { t: "bed", rect: [4.75, 3.12, 1.75, 2.25], face: "top" },
      { t: "nightstand", rect: [4.42, 3.18, 0.42, 0.42], lamp: 1 },
      { t: "nightstand", rect: [6.5, 3.18, 0.42, 0.42], lamp: 1 },
      { t: "wardrobe", rect: [2.6, 3.62, 0.55, 2.15], face: "right" },
      // --- BANYO (duşakabin sol duvarı boydan; lavabo yatak odası duvarına; klozet duşa yakın) ---
      { t: "shower", rect: [0.1, 3.1, 0.72, 1.35] },
      { t: "basin", rect: [1.62, 3.12, 0.62, 0.5], face: "west" },
      { t: "wc", rect: [0.95, 3.9, 0.46, 0.52], face: "south" },
      // --- BALKON ---
      { t: "plant", rect: [7.68, 0.5, 0.42, 0.42] },
      { t: "plant", rect: [7.68, 5.2, 0.42, 0.42] },
    ],
  },

  "2+1": {
    code: "2+1", netArea: 71.59, grossArea: 85.50,
    env: [11.3, 9.1],
    rooms: [
      { key: "salon", label: "Salon", area: 16.90, floor: "parke",
        poly: [[0,1.9],[2.8,1.9],[2.8,7.7],[0,7.7]] },
      { key: "wc", label: "WC", area: 1.90, floor: "fayans",
        poly: [[1.95,0],[3.1,0],[3.1,1.9],[1.95,1.9]] },
      { key: "banyo", label: "Banyo", area: 3.47, floor: "fayans",
        poly: [[3.65,0],[5.45,0],[5.45,1.9],[3.65,1.9]] },
      { key: "hol", label: "Hol", area: 8.31, floor: "fayans",
        poly: [[3.1,0],[3.65,0],[3.65,1.9],[7.5,1.9],[7.5,3.2],[5.45,3.2],[5.45,3.94],[2.8,3.94],[2.8,1.9],[3.1,1.9]] },
      { key: "mutfak", label: "Mutfak", area: 9.77, floor: "fayans",
        poly: [[2.8,3.94],[5.45,3.94],[5.45,7.7],[2.8,7.7]] },
      { key: "yatak", label: "Yatak Odası", area: 9.45, floor: "parke",
        poly: [[5.45,3.2],[7.5,3.2],[7.5,7.7],[5.45,7.7]] },
      { key: "ebeveyn", label: "Ebeveyn Odası", area: 14.71, floor: "parke",
        poly: [[7.5,2.25],[11.3,2.25],[11.3,7.7],[7.5,7.7]] },
      { key: "balsol", label: "Balkon", area: 3.81, floor: "fayans", railing: true,
        poly: [[0,7.7],[2.8,7.7],[2.8,9.06],[0,9.06]] },
      { key: "balsag", label: "Balkon", area: 3.27, floor: "fayans", railing: true,
        poly: [[7.5,7.7],[11.3,7.7],[11.3,8.9],[7.5,8.9]] },
    ],
    doors: [
      { o: "h", at: 0.0, a: 3.15, b: 3.6 },  // giriş
      { o: "v", at: 3.1, a: 0.4, b: 1.3 },   // WC -> hol
      { o: "v", at: 3.65, a: 0.5, b: 1.5 },  // Banyo -> hol
      { o: "v", at: 2.8, a: 2.0, b: 2.9 },   // Salon -> hol
      { o: "v", at: 7.5, a: 2.4, b: 3.1 },   // Ebeveyn -> hol (sağ kol)
      { o: "h", at: 3.2, a: 5.85, b: 6.75 }, // Yatak -> hol
      { o: "h", at: 3.94, a: 3.35, b: 4.45 },// Mutfak -> hol (giriş kapısı)
      { o: "h", at: 7.7, a: 1.2, b: 2.05 },  // SALON -> balkon kapısı (camların ortasında)
      { o: "h", at: 7.7, a: 9.1, b: 10.0 },  // EBEVEYN -> balkon kapısı (camların ortasında)
    ],
    glass: [
      { o: "h", at: 7.7, a: 0.3, b: 1.2 },   // salon balkon camı (sol panel)
      { o: "h", at: 7.7, a: 2.05, b: 2.7 },  // salon balkon camı (sağ panel)
      { o: "h", at: 7.7, a: 7.9, b: 9.1 },   // ebeveyn balkon camı (sol panel)
      { o: "h", at: 7.7, a: 10.0, b: 11.2 }, // ebeveyn balkon camı (sağ panel)
      { o: "h", at: 7.7, a: 2.9, b: 5.3 },   // MUTFAK dış duvar cam
      { o: "h", at: 7.7, a: 5.65, b: 7.3 },  // ÇOCUK ODASI dış duvar cam
    ],
    furniture: [
      // --- SALON: koltuk takımı (dörtgen) — TV mutfak duvarında (sağ), karşısında 2'li koltuk, yanlarda 2 tekli ---
      { t: "rug", rect: [0.15, 3.0, 2.5, 4.2], color: "#9aa3ad" },
      { t: "console", rect: [2.46, 4.55, 0.3, 1.5], tv: 0.95 },               // TV merkezi y≈5.3 (balkona yakın)
      { t: "sofa", rect: [0.05, 4.875, 1.35, 0.85], face: "east" },           // 2'li koltuk TAM TV karşısında (merkez y5.3)
      { t: "armchair", rect: [1.55, 3.4, 0.8, 0.8], face: "north" },          // üst tekli (TV'ye eşit uzaklık)
      { t: "armchair", rect: [1.55, 6.4, 0.8, 0.8], face: "south" },          // alt tekli (TV'ye eşit uzaklık)
      { t: "coffee", rect: [1.1, 4.8, 0.85, 0.95] },
      // --- WC: klozet duvara yapışık ---
      { t: "wc", rect: [2.05, 1.05, 0.42, 0.55], face: "east" },
      { t: "basin", rect: [2.05, 0.12, 0.5, 0.4] },
      // --- BANYO: klozet 180° döndürüldü ---
      { t: "shower", rect: [4.6, 0.12, 0.72, 1.05] },
      { t: "basin", rect: [3.75, 0.12, 0.6, 0.45] },
      { t: "wc", rect: [3.8, 1.3, 0.46, 0.48], face: "south" },
      // --- MUTFAK: masa duvara yapışık + tezgah/buzdolabı/ocak/evye ayrık ---
      { t: "fridge", rect: [4.97, 4.0, 0.43, 0.65] },                 // üstte
      { t: "counter", rect: [4.97, 4.78, 0.43, 2.6] },                // buzdolabının altında
      { t: "stove", rect: [5.0, 5.35, 0.4, 0.45] },
      { t: "sink", rect: [5.0, 6.6, 0.4, 0.4] },
      { t: "table", rect: [2.85, 4.9, 0.9, 2.1] },                    // sol duvara yapışık, kısaltıldı
      { t: "chair", rect: [3.85, 5.35, 0.44, 0.44], face: "west" },
      { t: "chair", rect: [3.85, 6.45, 0.44, 0.44], face: "west" },
      { t: "chair", rect: [3.25, 4.5, 0.44, 0.44], face: "north" },  // giriş tarafı ucu (180° -> masaya bakar)
      { t: "chair", rect: [3.25, 7.05, 0.44, 0.44], face: "south" }, // cam tarafı ucu (180° -> masaya bakar)
      // --- ÇOCUK ODASI: tek yatak cama yapışık + masa duvarda (sağ) + sandalye masaya; gardırop mutfak duvarında ---
      { t: "rug", rect: [5.7, 5.2, 1.6, 2.3], color: "#a9b0bd" },
      { t: "bed", rect: [6.45, 5.6, 0.95, 1.95], face: "south" },
      { t: "wardrobe", rect: [5.5, 5.0, 0.55, 2.4], face: "right" },  // mutfak duvarı (sol), kapı önü açık
      { t: "desk", rect: [6.95, 3.55, 0.55, 1.2] },                   // 90° çevrildi (sağ duvarda dikey)
      { t: "chair", rect: [6.35, 4.0, 0.45, 0.45], face: "east" },    // masaya dönük
      // --- EBEVEYN (doğuya genişletildi): yatak baş doğu duvarda, gardırop karşı (batı) duvarda, arada yürüme alanı ---
      { t: "rug", rect: [8.1, 3.6, 2.9, 3.4], color: "#b3a690" },
      { t: "bed", rect: [9.175, 3.6, 1.85, 2.4], face: "west" },      // baş doğu (x11.3) duvarında; arada ~0.85m boşluk
      { t: "nightstand", rect: [10.9, 3.75, 0.4, 0.4], lamp: 1 },
      { t: "nightstand", rect: [10.9, 5.85, 0.4, 0.4], lamp: 1 },
      { t: "wardrobe", rect: [7.55, 4.6, 0.55, 2.7], face: "right" },  // batı duvar, balkona doğru kaydırıldı
      { t: "vanity", rect: [10.4, 6.35, 0.7, 0.95], face: "west" },    // makyaj masası doğu duvara yapışık (ayna duvar yüzeyinde)
      // --- BALKONLAR: karşılıklı 2 rahat koltuk ---
      { t: "armchair", rect: [0.55, 8.1, 0.66, 0.66], face: "east" },
      { t: "armchair", rect: [1.75, 8.1, 0.66, 0.66], face: "west" },
      { t: "armchair", rect: [8.5, 8.0, 0.66, 0.66], face: "east" },
      { t: "armchair", rect: [10.2, 8.0, 0.66, 0.66], face: "west" },
    ],
  },

  "3+1": {
    code: "3+1", netArea: 113.20, grossArea: 135.00,
    env: [13.0, 10.25],
    rooms: [
      // --- ÜST-SOL: WC + Kiler ---
      { key: "wc", label: "WC", area: 2.23, floor: "fayans",
        poly: [[0,0],[1.65,0],[1.65,1.35],[0,1.35]] },
      { key: "kiler", label: "Kiler", area: 2.23, floor: "fayans",
        poly: [[1.65,0],[3.3,0],[3.3,1.35],[1.65,1.35]] },
      // --- BANYO (üst-orta) ---
      { key: "banyo", label: "Banyo", area: 4.28, floor: "fayans",
        poly: [[4.25,0],[6.15,0],[6.15,2.25],[4.25,2.25]] },
      // --- SALON (sol, büyük) ---
      { key: "salon", label: "Salon", area: 21.30, floor: "parke",
        poly: [[0,2.25],[3.3,2.25],[3.3,8.7],[0,8.7]] },
      // --- MUTFAK (orta) ---
      { key: "mutfak", label: "Mutfak", area: 12.68, floor: "fayans",
        poly: [[3.3,4.25],[6.15,4.25],[6.15,8.7],[3.3,8.7]] },
      // --- YATAK ODASI (orta, tek yatak) ---
      { key: "yatak1", label: "Yatak Odası", area: 11.13, floor: "parke",
        poly: [[6.15,3.4],[8.25,3.4],[8.25,8.7],[6.15,8.7]] },
      // --- YATAK ODASI (üst-sağ, 2 tek yatak) ---
      { key: "yatak2", label: "Yatak Odası", area: 20.69, floor: "parke",
        poly: [[6.15,0],[13.0,0],[13.0,3.4],[9.4,3.4],[9.4,2.6],[6.15,2.6]] },
      // --- EBEVEYN ODASI (sağ, büyük) ---
      { key: "ebeveyn", label: "Ebeveyn Odası", area: 25.18, floor: "parke",
        poly: [[8.25,3.4],[13.0,3.4],[13.0,8.7],[8.25,8.7]] },
      // --- HOL (T/L bağlayıcı: giriş + sol kol + sağ kol) ---
      { key: "hol", label: "Hol", area: 13.42, floor: "fayans",
        poly: [[3.3,0],[4.25,0],[4.25,2.25],[6.15,2.25],[6.15,2.6],[9.4,2.6],[9.4,3.4],[6.15,3.4],[6.15,4.25],[3.3,4.25],[3.3,2.25],[0,2.25],[0,1.35],[3.3,1.35]] },
      // --- BALKONLAR (cam korkuluk) ---
      { key: "balsol", label: "Balkon", area: 4.65, floor: "fayans", railing: true,
        poly: [[0,8.7],[3.0,8.7],[3.0,10.25],[0,10.25]] },
      { key: "balsag", label: "Balkon", area: 4.65, floor: "fayans", railing: true,
        poly: [[10.0,8.7],[13.0,8.7],[13.0,10.25],[10.0,10.25]] },
    ],
    doors: [
      { o: "h", at: 0.0,  a: 3.5,  b: 4.1 },   // GİRİŞ (vestibül)
      { o: "h", at: 1.35, a: 0.5,  b: 1.2 },   // WC -> hol
      { o: "h", at: 1.35, a: 2.0,  b: 2.7 },   // Kiler -> hol
      { o: "h", at: 2.25, a: 1.0,  b: 1.9 },   // Salon -> hol
      { o: "h", at: 2.25, a: 4.6,  b: 5.4 },   // Banyo -> hol
      { o: "h", at: 4.25, a: 3.7,  b: 4.6 },   // Mutfak -> hol
      { o: "h", at: 3.4,  a: 6.6,  b: 7.4 },   // Yatak(orta) -> hol
      { o: "h", at: 2.6,  a: 8.4,  b: 9.2 },   // Yatak(üst-sağ) -> hol (ebeveyn kapısıyla KARŞILIKLI)
      { o: "h", at: 3.4,  a: 8.4,  b: 9.2 },   // Ebeveyn -> hol (yatak2 ile karşılıklı)
      { o: "h", at: 8.7,  a: 1.0,  b: 1.9 },   // Salon -> balkon
      { o: "h", at: 8.7,  a: 11.0, b: 11.9 },  // Ebeveyn -> balkon
    ],
    glass: [
      { o: "h", at: 8.7,  a: 0.3,  b: 1.0 },   // salon balkon camı (sol)
      { o: "h", at: 8.7,  a: 1.9,  b: 2.9 },   // salon balkon camı (sağ)
      { o: "h", at: 8.7,  a: 3.5,  b: 5.9 },   // mutfak güney cam
      { o: "h", at: 8.7,  a: 6.4,  b: 8.0 },   // yatak(orta) güney cam
      { o: "h", at: 8.7,  a: 10.0, b: 11.0 },  // ebeveyn balkon camı (sol)
      { o: "h", at: 8.7,  a: 11.9, b: 12.8 },  // ebeveyn balkon camı (sağ)
    ],
    furniture: [
      // --- SALON: TV batı duvarda, karşısında 2'li koltuk + 2 tekli + sehpa ---
      { t: "rug", rect: [0.5, 4.0, 2.35, 2.8], color: "#9ba2ab" },       // oturma grubu altında, TV eksenine ortalı
      { t: "console", rect: [0.0, 4.55, 0.32, 1.7], tv: 1.15 },          // batı duvar (ekran doğuya), merkez y5.4
      { t: "sofa", rect: [1.95, 4.95, 1.3, 0.9], face: "west" },         // 2'li koltuk TV'nin TAM karşısında (merkez y5.4)
      { t: "armchair", rect: [1.7, 3.31, 0.78, 0.78], face: "north" },   // TV eksenine simetrik (üst)
      { t: "armchair", rect: [1.7, 6.71, 0.78, 0.78], face: "south" },   // TV eksenine simetrik (alt)
      { t: "coffee", rect: [1.1, 4.9, 0.85, 1.0] },                      // TV ile koltuk arası, ortalı
      // --- WC ---
      { t: "wc", rect: [0.45, 0.05, 0.46, 0.55], face: "top" },
      { t: "basin", rect: [1.05, 0.05, 0.45, 0.38], face: "top" },
      // --- KİLER (raf dolabı) ---
      { t: "wardrobe", rect: [1.75, 0.0, 1.45, 0.45], face: "south" },
      // --- BANYO: duşakabin köşe + lavabo + klozet ---
      { t: "shower", rect: [5.5, 0.1, 0.6, 1.05] },
      { t: "basin", rect: [4.4, 0.05, 0.6, 0.45], face: "top" },
      { t: "wc", rect: [4.33, 1.09, 0.46, 0.62], face: "east" },       // 90° saat yönü: hazne batı duvarda, klozet doğuya
      // --- MUTFAK: tezgah DOĞU duvarda dikey (buzdolabı+ocak+evye) + yemek masası sol-orta + avize ---
      { t: "fridge", rect: [5.5, 4.35, 0.65, 0.72] },
      { t: "counter", rect: [5.55, 5.15, 0.6, 3.0] },
      { t: "stove", rect: [5.6, 5.7, 0.5, 0.5] },
      { t: "sink", rect: [5.62, 7.1, 0.45, 0.5] },
      { t: "table", rect: [3.4, 5.2, 0.95, 1.6] },                       // batı duvara yapışık, kısaltıldı (yürüme alanı)
      { t: "chair", rect: [4.4, 5.35, 0.44, 0.44], face: "west" },       // ocak/doğu tarafı
      { t: "chair", rect: [4.4, 6.0, 0.44, 0.44], face: "west" },
      { t: "chair", rect: [3.65, 4.6, 0.44, 0.44], face: "north" },      // üst uç
      { t: "chair", rect: [3.65, 6.85, 0.44, 0.44], face: "south" },     // alt uç
      // --- YATAK ODASI (orta/çocuk): tek yatak güney cama + çalışma masası + gardırop (batı) ---
      { t: "rug", rect: [6.25, 6.3, 1.7, 2.35], color: "#9ba2ab" },     // yatağı çerçeveleyen halı
      { t: "bed", rect: [6.55, 6.6, 1.05, 2.0], face: "south" },
      { t: "nightstand", rect: [7.6, 8.15, 0.4, 0.4], lamp: 1 },
      { t: "wardrobe", rect: [6.15, 4.0, 0.55, 1.9], face: "right" },
      { t: "desk", rect: [7.6, 3.6, 0.6, 1.1] },
      { t: "chair", rect: [7.0, 4.05, 0.44, 0.44], face: "east" },
      // --- YATAK ODASI (üst-sağ): TEK yatak sağ-üst köşe + DOLAP (geniş yatay, güney duvar) ---
      { t: "bed", rect: [11.525, 0.05, 1.05, 1.9], face: "west" },       // 90° CW: yatay, baş DOĞU duvarda
      { t: "nightstand", rect: [12.5, 1.6, 0.35, 0.4], lamp: 1 },
      { t: "rug", rect: [10.7, 0.15, 2.3, 1.7], color: "#9ba2ab" },     // yatay yatağı çerçeveleyen halı
      { t: "wardrobe", rect: [9.7, 2.9, 3.0, 0.5] },                     // DOLAP yatağın yanında (girinti güney duvar), arkası ebeveyn duvarı — koridor yok
      // --- EBEVEYN: DOLAP (geniş yatay, kuzey) + çift yatak + komodin + makyaj (doğu/balkon) + koltuk ---
      { t: "wardrobe", rect: [9.4, 3.45, 3.0, 0.5], face: "south" },     // DOLAP (kuzey) — 5 kapaklı, odaya bakar
      { t: "rug", rect: [9.9, 4.7, 3.05, 2.4], color: "#9ba2ab" },      // çift yatağı çerçeveleyen halı
      { t: "bed", rect: [10.875, 4.7, 1.85, 2.4], face: "west" },        // çift yatak DOĞU duvara yaslı (baş doğu)
      { t: "nightstand", rect: [12.45, 4.5, 0.4, 0.4], lamp: 1 },
      { t: "nightstand", rect: [12.45, 6.95, 0.4, 0.4], lamp: 1 },
      { t: "vanity", rect: [8.45, 5.55, 0.5, 0.9], face: "east" },        // makyaj masası BATI duvara yapışık; ayna duvar yüzeyinde (komşu odaya geçmez)
      { t: "armchair", rect: [10.1, 7.7, 0.72, 0.72], face: "south" },
      { t: "plant", rect: [12.5, 7.6, 0.42, 0.42] },
      // --- BALKON (sol/salon): bistro masa + 2 sandalye + saksılar ---
      { t: "table", rect: [1.0, 9.0, 0.7, 0.7] },
      { t: "chair", rect: [0.45, 9.1, 0.44, 0.44], face: "east" },
      { t: "chair", rect: [1.85, 9.1, 0.44, 0.44], face: "west" },
      { t: "plant", rect: [0.2, 9.6, 0.42, 0.42] },
      { t: "plant", rect: [2.45, 9.6, 0.42, 0.42] },
      // --- BALKON (sağ/ebeveyn): koltuk + saksılar ---
      { t: "armchair", rect: [11.0, 9.1, 0.66, 0.66], face: "north" },
      { t: "plant", rect: [10.3, 9.5, 0.42, 0.42] },
      { t: "plant", rect: [12.4, 9.5, 0.42, 0.42] },
    ],
  },
};
