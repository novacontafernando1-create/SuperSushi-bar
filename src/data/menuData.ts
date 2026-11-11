import { MenuItem, TastingStep } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'flight-divine-18',
    name: 'Divine Dragon Emperor Omakase',
    japaneseName: '神龍 皇帝おまかせ十八貫',
    category: 'flights',
    price: 245,
    kiLevel: 'divine',
    agingDuration: '21-Day Vault Reserve',
    thermalNotes: 'Dual-Zone Thermal Pairing (7°C - 52°C)',
    cutSpec: 'Master Soba-Kiri & Honyaki Blade Angle 32°',
    description: 'Our pinnacle 18-course gastronomic odyssey. Features Otoro with 24k gold leaf, Hokkaido Murasaki Uni, Kaluga Hybrid Caviar, Miyazaki A5 Wagyu, and rare seasonal cellar selections flown in weekly from Toyosu Market.',
    ingredients: ['Otoro', 'Hokkaido Uni', 'Kaluga Caviar', 'A5 Wagyu', 'Shizuoka Wasabi', 'Nikiri Mirin 1998'],
    dietary: ['Chef Signature', 'Seasonal Reserve'],
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    courseSequence: '01',
    pairingNote: 'Recommended with Junmai Daiginjo "Celestial Aura" 720ml'
  },
  {
    id: 'flight-ascended-12',
    name: 'Ascended Ki 12-Course Flight',
    japaneseName: '気の上昇 十二貫コース',
    category: 'flights',
    price: 165,
    kiLevel: 'ascended',
    agingDuration: '14-Day Cedar Dry-Aged',
    thermalNotes: 'Sear-Torch Heat & Controlled Cryo-Chill',
    cutSpec: 'Precision Hirazukuri & Yanagiba Slicing',
    description: 'A 12-course exploration of escalating culinary intensity. Begins with translucent seasonal white fish and accelerates into torch-caramelized fatty cuts, smoked binchotan accents, and umami-rich broths.',
    ingredients: ['Chutoro', 'Botan Ebi', 'Hamachi Belly', 'Akami Zuke', 'Black Truffle Paste', 'Kombu Dashi'],
    dietary: ['Chef Signature'],
    imageUrl: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    courseSequence: '02',
    pairingNote: 'Pairs seamlessly with Niigata Crisp Dry Sake'
  },
  {
    id: 'flight-super-ki-8',
    name: 'Super Ki Torched Tasting 8-Piece',
    japaneseName: '超気 炙り八点盛り',
    category: 'flights',
    price: 98,
    kiLevel: 'super-ki',
    agingDuration: '7-Day Shio-Koji Aged',
    thermalNotes: 'Binchotan Oak Charcoal Sear (320°C Flash)',
    cutSpec: 'Kogane-Zukuri Diamond Scoring',
    description: 'Eight pieces of high-fat nigiri kissed by concentrated white binchotan flame. Renders intramuscular fats to buttery perfection while retaining a crisp crystalline surface.',
    ingredients: ['Salmon Belly', 'Aburi Engawa', 'Saba Battera', 'Hotate Scallop', 'Smoked Sea Salt'],
    dietary: ['Flash-Seared', 'High-Fat'],
    imageUrl: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    courseSequence: '03',
    pairingNote: 'Craft Smoked Shiso Highball'
  },
  {
    id: 'nigiri-otoro-gold',
    name: 'Otoro 24K Gold Leaf Ki',
    japaneseName: '大トロ 純金箔炙り',
    category: 'torched-nigiri',
    price: 36,
    kiLevel: 'divine',
    agingDuration: '21-Day Zero-Moisture Aging',
    thermalNotes: 'Warm Akazu Rice (37°C) & Binchotan Flash',
    cutSpec: 'Master Sogizukuri 4mm Precision Cut',
    description: 'Supreme fatty tuna belly from Southern Bluefin, dry-aged for 21 days. Flash-torched with binchotan oak, glazed with 25-year aged nikiri shoyu, and crowned with edible 24k Japanese gold leaf.',
    ingredients: ['Southern Bluefin Otoro', '24K Gold Leaf', 'Nikiri Glaze', 'Aged Akazu Rice', 'Fresh Wasabi'],
    dietary: ['Signature Reserve', 'Gluten-Free Available'],
    imageUrl: 'https://images.unsplash.com/photo-1563612116625-3012372fccce?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    courseSequence: '04',
    pairingNote: 'Yamazaki 12-Year Single Malt'
  },
  {
    id: 'nigiri-wagyu-a5-uni',
    name: 'Miyazaki A5 Wagyu & Hokkaido Uni',
    japaneseName: '宮崎牛A5 × 北海道産雲丹',
    category: 'torched-nigiri',
    price: 42,
    kiLevel: 'divine',
    agingDuration: '45-Day Dry-Aged Beef',
    thermalNotes: 'Torched Sear Fat Melt (48°C Core)',
    cutSpec: 'Paper-Thin Micro-Laminated Slices',
    description: 'Miyazaki BMS 11 Wagyu beef seared live at counter, wrapped over seasoned warm akazu rice, crowned with creamy fresh Hokkaido Murasaki Uni and finished with Périgord black winter truffle drizzle.',
    ingredients: ['Miyazaki A5 Wagyu', 'Hokkaido Uni', 'Black Truffle Oil', 'Maldon Smoked Salt'],
    dietary: ['Luxury Pairing'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    courseSequence: '05'
  },
  {
    id: 'nigiri-salmon-aburi',
    name: 'Super Saiyan Salmon Aburi',
    japaneseName: 'サーモン 炎気炙り西京味噌',
    category: 'torched-nigiri',
    price: 19,
    kiLevel: 'super-ki',
    agingDuration: '5-Day Kombu Cured',
    thermalNotes: 'High-Temperature Torch Caramelization',
    cutSpec: 'Matsukawazukuri Cross-Hatched Texture',
    description: 'Prime Scottish king salmon belly flame-seared with sweet Kyoto saikyo miso glaze, smoked habanero essence, scallion oil, and puffed crispy quinoa granules for textural contrast.',
    ingredients: ['King Salmon Belly', 'Saikyo Miso', 'Charred Scallion', 'Quinoa Crunch', 'Togarashi'],
    dietary: ['Torched Hot', 'Spicy Kick'],
    imageUrl: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    courseSequence: '06'
  },
  {
    id: 'nigiri-hotate-truffle',
    name: 'Hokkaido Hotate Black Truffle',
    japaneseName: '北海道ホタテ 黒トリュフ炙り',
    category: 'torched-nigiri',
    price: 24,
    kiLevel: 'ascended',
    agingDuration: 'Fresh Harvested Hokkaido Dive',
    thermalNotes: 'Light Surface Sear (2-Second Touch)',
    cutSpec: 'Cross-Butterflied Medallion',
    description: 'Live sweet giant sea scallop butterflied and lightly caramelized with yuzu-kosho brown butter, topped with shaved black summer truffle and pink Himalayan rock salt.',
    ingredients: ['Hokkaido Scallop', 'Black Truffle', 'Yuzu Brown Butter', 'Himalayan Salt'],
    dietary: ['Shellfish', 'Umami Rich'],
    imageUrl: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    courseSequence: '07'
  },
  {
    id: 'roll-dragon-ki',
    name: 'Celestial Dragon Ki Roll',
    japaneseName: '天龍気 プレミアムロール',
    category: 'cosmic-rolls',
    price: 28,
    kiLevel: 'super-ki',
    agingDuration: 'Fresh Daily Preparation',
    thermalNotes: 'Warm Seared Exterior with Chilled Heart',
    cutSpec: '8-Piece Precision Cut with Obsidian Slate Spacing',
    description: 'Torched king salmon and yellowtail draping a core of crunchy ebi tempura, avocado, and spicy bluefin tartar. Finished with spicy dragon tare and toasted black sesame.',
    ingredients: ['Ebi Tempura', 'Torched Salmon', 'Bluefin Tartar', 'Avocado', 'Dragon Tare', 'Leek Strings'],
    dietary: ['Crisp & Torched'],
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    courseSequence: '08'
  },
  {
    id: 'roll-void-tuna',
    name: 'Void Obsidian Bluefin Roll',
    japaneseName: '漆黒のマグロ ロール',
    category: 'cosmic-rolls',
    price: 32,
    kiLevel: 'ascended',
    agingDuration: '10-Day Shoyu Cured',
    thermalNotes: 'Chilled Core (6°C)',
    cutSpec: 'Wrapped in Binchotan-Infused Black Nori',
    description: 'Dark obsidian nori wrapping chutoro, negi-toro, pickled daikon radish, and crispy shallots, drizzled with black garlic reduction and golden tobiko pearls.',
    ingredients: ['Chutoro', 'Negitoro', 'Black Garlic Tare', 'Golden Tobiko', 'Takuan Radish', 'Charcoal Nori'],
    dietary: ['Gluten-Free Available'],
    imageUrl: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    courseSequence: '09'
  },
  {
    id: 'sashimi-caviar-spoon',
    name: 'Dragon Uni Caviar Kinetic Spoon',
    japaneseName: '極上雲丹とキャビアの蓮華',
    category: 'sashimi-crudo',
    price: 38,
    kiLevel: 'divine',
    agingDuration: 'Daily Auction Toyosu Air Freight',
    thermalNotes: 'Cryo-Chilled at 4°C with Ambient Dashi Gelee',
    cutSpec: 'Single-Bite Ceremonial Ceramic Presentation',
    description: 'Served on a forged obsidian ceramic spoon: Sweet Hokkaido Murasaki Uni, Kaluga Hybrid Reserve Caviar, dashi gelee reduction, shiso flower petals, and micro-toasted nori tuile.',
    ingredients: ['Hokkaido Uni', 'Kaluga Caviar', 'Dashi Gelee', 'Shiso Blossom', 'Nori Tuile'],
    dietary: ['Raw Gastronomy', 'Gluten-Free'],
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    courseSequence: '10'
  },
  {
    id: 'sashimi-hamachi-truffle',
    name: 'Kinetic Hamachi Jalapeño Crudo',
    japaneseName: 'ハマチ 薄造り白トリュフポン酢',
    category: 'sashimi-crudo',
    price: 26,
    kiLevel: 'super-ki',
    agingDuration: '7-Day Ice Bath Maturation',
    thermalNotes: 'Crisp Cold Infusion (5°C)',
    cutSpec: 'Usuzukuri Paper-Thin Transparency',
    description: 'Delicate slices of yellowtail loin immersed in white truffle ponzu broth, topped with razor-thin serrano pepper, cilantro oil drops, and micro garlic crisps.',
    ingredients: ['Yellowtail Hamachi', 'White Truffle Ponzu', 'Serrano Chili', 'Garlic Crisp', 'Micro Shiso'],
    dietary: ['Gluten-Free', 'Low-Carb'],
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    courseSequence: '11'
  },
  {
    id: 'libation-celestial-sake',
    name: 'Junmai Daiginjo "Celestial Aura"',
    japaneseName: '純米大吟醸 「天界気」 720ml',
    category: 'libations',
    price: 110,
    kiLevel: 'divine',
    agingDuration: '3-Year Sub-Zero Tank Matured',
    thermalNotes: 'Served Chilled in Hand-Blown Obsidian Glass (8°C)',
    cutSpec: '35% Yamada Nishiki Rice Polish Ratio',
    description: 'Super-premium ceremonial sake brewed with mountain spring waters from Niigata. Delicate aromas of white peach, melon blossom, and a silky minerals finish that amplifies raw umami.',
    ingredients: ['Yamada Nishiki Rice (35% Polish)', 'Glacial Spring Water', 'Special Yeast #9'],
    dietary: ['Sake Reserve', '16% ABV'],
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    courseSequence: '12'
  },
  {
    id: 'libation-smoked-fashion',
    name: 'Binchotan Smoked Tokyo Old Fashioned',
    japaneseName: '備長炭 燻製オールドファッション',
    category: 'libations',
    price: 24,
    kiLevel: 'ascended',
    agingDuration: 'Barrel-Aged 6 Months with Japanese Mizunara Oak',
    thermalNotes: 'Smoked Over Glowing White Binchotan Charcoal',
    cutSpec: 'Carved Clear Ice Sphere with Gold Stamped Dragon Seal',
    description: 'Japanese Yamazaki 12 whisky infused with roasted kinako syrup, aromatic shiso bitters, smoked tableside with white binchotan bark, and expressed with charred yuzu peel.',
    ingredients: ['Japanese Whisky', 'Mizunara Oak Smoke', 'Shiso Bitters', 'Kinako Syrup', 'Yuzu Peel'],
    dietary: ['Smoked Tableside', 'Signature Cocktail'],
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    courseSequence: '13'
  },
  {
    id: 'libation-matcha-yuzu',
    name: 'Zero-Proof Cosmic Matcha Yuzu Spritz',
    japaneseName: 'ノンアルコール 宇治抹茶柚子スパークリング',
    category: 'libations',
    price: 16,
    kiLevel: 'base',
    agingDuration: 'Single-Origin Ceremonial Uji Harvest',
    thermalNotes: 'Chilled Sparkle over Obsidian Crushed Ice',
    cutSpec: 'Hand-Whisked Chasen Froth Layer',
    description: 'Ceremonial grade Uji green tea whisked with Kochi yuzu citrus reduction, sparkling botanical tonic, and edible blue spirulina halo.',
    ingredients: ['Ceremonial Matcha', 'Kochi Yuzu Juice', 'Botanical Tonic', 'Blue Spirulina', 'Mint'],
    dietary: ['Non-Alcoholic', 'Antioxidant Rich'],
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    courseSequence: '14'
  }
];

export const TASTING_STEPS: TastingStep[] = [
  {
    stepNumber: 1,
    courseTitle: 'Course I: Amuse & Cryo Crudo',
    subtitle: 'Awaken the palate with raw marine mineral freshness',
    options: [
      {
        id: 'opt-crudo-hamachi',
        name: 'Kinetic Hamachi with White Truffle Ponzu',
        japaneseName: 'ハマチ 白トリュフジュレ',
        description: 'Thin yellowtail sashimi with serrano disk and white truffle oil',
        thermalNote: 'Crisp Cold 4°C',
        extraPrice: 0,
        imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
        kiLevel: 'base'
      },
      {
        id: 'opt-spoon-caviar',
        name: 'Dragon Uni Caviar Ceremonial Spoon',
        japaneseName: '極上雲丹＆キャビアスプーン',
        description: 'Hokkaido Murasaki uni with Kaluga caviar and dashi gelee',
        thermalNote: 'Chilled 5°C',
        extraPrice: 18,
        imageUrl: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80',
        kiLevel: 'divine'
      },
      {
        id: 'opt-botan-ebi',
        name: 'Botan Ebi with Yuzu Kosho Gelee',
        japaneseName: 'ボタンエビ 柚子胡椒ジュレ',
        description: 'Sweet jumbo spot prawn, head essence, shiso bloom',
        thermalNote: 'Cold 6°C',
        extraPrice: 10,
        imageUrl: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=800&q=80',
        kiLevel: 'ascended'
      }
    ]
  },
  {
    stepNumber: 2,
    courseTitle: 'Course II: Binchotan Torched Nigiri Duo',
    subtitle: 'Intense sear-torch heat renders intramuscular lipids',
    options: [
      {
        id: 'opt-duo-salmon-engawa',
        name: 'Saikyo Salmon Aburi & Torched Engawa',
        japaneseName: 'サーモン西京＆縁側 炙り二種',
        description: 'Miso glazed salmon belly with torched fluke fin and shiso salt',
        thermalNote: 'Charred Exterior, Warm Interior 42°C',
        extraPrice: 0,
        imageUrl: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&w=800&q=80',
        kiLevel: 'super-ki'
      },
      {
        id: 'opt-duo-hotate-chutoro',
        name: 'Hokkaido Hotate Truffle & Torched Chutoro',
        japaneseName: '北海道ホタテ＆中トロ炙り',
        description: 'Caramelized scallop with brown butter and 14-day dry aged chutoro',
        thermalNote: 'High Heat Kiss 45°C',
        extraPrice: 15,
        imageUrl: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80',
        kiLevel: 'ascended'
      },
      {
        id: 'opt-duo-otoro-gold',
        name: '21-Day Otoro Gold Leaf & Seared Wagyu Nigiri',
        japaneseName: '大トロ金箔＆A5和牛 炙り二貫',
        description: 'Bluefin otoro with 24k gold leaf and A5 Miyazaki beef slice',
        thermalNote: 'Flash Torched 48°C',
        extraPrice: 28,
        imageUrl: 'https://images.unsplash.com/photo-1563612116625-3012372fccce?auto=format&fit=crop&w=800&q=80',
        kiLevel: 'divine'
      }
    ]
  },
  {
    stepNumber: 3,
    courseTitle: 'Course III: Imperial Robata & Prime Cut',
    subtitle: 'The zenith of meat and marine alchemy',
    options: [
      {
        id: 'opt-wagyu-a5-uni',
        name: 'Miyazaki A5 Wagyu Robata with Hokkaido Uni',
        japaneseName: '宮崎牛A5 炉端焼き × 雲丹',
        description: 'Binchotan seared Wagyu striploin, sea urchin crown, truffle shoyu',
        thermalNote: 'Warm Searing 52°C',
        extraPrice: 22,
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        kiLevel: 'divine'
      },
      {
        id: 'opt-unagi-foie',
        name: 'Smoked Freshwater Unagi & Torched Foie Gras',
        japaneseName: '天然鰻とフォアグラ 備長炭燻製',
        description: 'Caramelized lake eel, pan-seared duck liver, sansho pepper glaze',
        thermalNote: 'Hot Binchotan Glaze 55°C',
        extraPrice: 16,
        imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
        kiLevel: 'ascended'
      },
      {
        id: 'opt-king-crab',
        name: 'Red King Crab Leg in Uni Butter Emulsion',
        japaneseName: 'タラバガニ 雲丹バター焼き',
        description: 'Robata grilled Alaskan king crab leg bathed in sea urchin butter',
        thermalNote: 'Wood Fire Roasted 50°C',
        extraPrice: 12,
        imageUrl: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80',
        kiLevel: 'super-ki'
      }
    ]
  },
  {
    stepNumber: 4,
    courseTitle: 'Course IV: Celestial Finale & Rare Elixir',
    subtitle: 'Harmonize your energy with cold crystal sweets and pairings',
    options: [
      {
        id: 'opt-dessert-matcha-sphere',
        name: 'Liquid Ki Uji Matcha Sphere with Black Sesame Tuile',
        japaneseName: '液体気 宇治抹茶球体と黒胡麻',
        description: 'Cryo-frozen white chocolate sphere bursting with warm matcha ganache',
        thermalNote: 'Cryo Exterior (-5°C) to Molten Center (40°C)',
        extraPrice: 0,
        imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
        kiLevel: 'super-ki'
      },
      {
        id: 'opt-dessert-yuzu-gold',
        name: 'Yuzu Blossom Sorbet with 24K Gold & Choya Gelee',
        japaneseName: '柚子ソルベ 金箔と梅酒ジュレ',
        description: 'Tart Japanese citrus sorbet infused with 10-year aged plum liqueur',
        thermalNote: 'Glacial Crisp -8°C',
        extraPrice: 6,
        imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
        kiLevel: 'ascended'
      },
      {
        id: 'opt-dessert-sake-flight',
        name: 'Grand Cru Sake Flight (3 Pours: Junmai Daiginjo)',
        japaneseName: '特撰 純米大吟醸 飲み比べ三種',
        description: 'Three 45ml pours of cellar-aged rare sake from Niigata and Yamagata',
        thermalNote: 'Chilled 8°C',
        extraPrice: 28,
        imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
        kiLevel: 'divine'
      }
    ]
  }
];

export const CHEF_PHILOSOPHY = {
  headChef: 'Master Chef Kenjiro Takahashi (高橋 健二郎)',
  title: 'Omakase Architect & 3rd Gen Itamae',
  bio: 'Trained under Tokyo masters for 18 years before pioneering the Cosmic Cyberpunk-Luxe concept in 2024. Kenjiro balances ancestral Edomae technique—binchotan flame, akazu fermented vinegar, and dry-aging cellar mastery—with dramatic precision and astronomical elegance.',
  principles: [
    {
      title: 'Ancestral Binchotan Flame',
      description: 'We exclusively burn Kishu white oak binchotan charcoal, reaching 1,000°C without flame smoke, imparting pure radiant infrared heat.'
    },
    {
      title: '21-Day Sub-Zero Dry Aging',
      description: 'Our proprietary humidity-controlled cellar breaks down muscle fibers into rich natural glutamic umami without oxidation.'
    },
    {
      title: 'Akazu Red Vinegar Rice',
      description: 'Every grain of Niigata Koshihikari rice is seasoned warm with 10-year aged sake lees vinegar, paired precisely at 37°C body temperature.'
    }
  ]
};
