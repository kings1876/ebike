import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'apex-trail-pro-750',
    name: 'Apex Trail Pro 750W e-MTB',
    tagline: 'Dual-suspension high-torque trail conqueror engineered for rugged Australian terrain',
    category: 'Electric Mountain Bikes',
    subcategory: 'Full-Suspension Enduro',
    price: 1899,
    originalPrice: 2299,
    badge: 'Popular',
    description: 'The Apex Trail Pro 750W delivers unstoppable climbing torque and plush downhill control. Built with a responsive 48V 17.5Ah LG battery and RockShox compatible air suspension, this electric mountain bike tackles fire trails, rocky descents, and steep inclines with effortless grace.',
    keyFeatures: [
      'High-Torque 750W Bafang Bafang Mid-Drive Motor (85Nm)',
      'Dual Air Suspension (140mm front fork + rear shock)',
      'Tektro 4-Piston Hydraulic Disc Brakes with 203mm rotors',
      'Shimano Deore 10-Speed Rapidfire Drivetrain',
      'IP65 water-resistant sealed electronics for creek crossings'
    ],
    specs: {
      motor: '750W Bafang Brushless Mid-Drive (85Nm)',
      battery: '48V 17.5Ah (840Wh) LG Cell Lithium-Ion',
      range: '80 - 110 km per charge',
      topSpeed: '45 km/h (programmable to 25 km/h street-legal)',
      brakes: 'Tektro Hydraulic Quad-Piston Discs',
      gears: 'Shimano Deore 10-Speed Rapidfire',
      weight: '26.5 kg',
      maxLoad: '150 kg',
      frame: '6061 Hydroformed Aircraft-Grade Aluminium'
    },
    inStock: true,
    warranty: '2-Year Nationwide Frame & Motor Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#059669'
  },
  {
    id: 'outback-pioneer-500',
    name: 'Outback Pioneer 500W Hardtail',
    tagline: 'Reliable cross-country mountain bike with lock-out front suspension and agile geometry',
    category: 'Electric Mountain Bikes',
    subcategory: 'Hardtail Trail',
    price: 1349,
    originalPrice: 1599,
    badge: 'Best Value',
    description: 'Designed for versatility between unpaved trail exploration and weekly rail-trail touring. The Outback Pioneer features a stiff lightweight hardtail frame that converts every pedal stroke and watt into forward momentum.',
    keyFeatures: [
      '500W High-Efficiency Rear Hub Motor (65Nm)',
      'Suntour XCM 120mm Travel Suspension Fork with Hydraulic Lockout',
      'Kenda 27.5" x 2.35" Puncture-Resistant Trail Tyres',
      'Shimano Altus 9-Speed Gearing',
      'Integrated front LED spotlight and rear saddle reflector'
    ],
    specs: {
      motor: '500W Rear Hub Brushless Motor',
      battery: '48V 14Ah (672Wh) Samsung Lithium Cells',
      range: '65 - 90 km per charge',
      topSpeed: '38 km/h (restricted to 25 km/h street-legal mode)',
      brakes: 'Zoom Hydraulic Disc Brakes 180mm',
      gears: 'Shimano Altus 9-Speed',
      weight: '24.2 kg',
      maxLoad: '135 kg',
      frame: 'Double-Butted 6061 Alloy'
    },
    inStock: true,
    warranty: '2-Year Frame, 1-Year Battery & Electricals',
    imageUrl: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#0F766E'
  },
  {
    id: 'summit-beast-fat-emtb',
    name: 'Summit Beast 750W All-Terrain Fat e-MTB',
    tagline: '4-inch fat tyre powerhouse for deep sand, Australian beaches, mud, and gravel',
    category: 'Electric Mountain Bikes',
    subcategory: 'All-Terrain Fat Tyre',
    price: 1699,
    originalPrice: 1999,
    badge: 'Premium',
    description: 'Conquer pristine coastal beaches, sandy washouts, and snowy high country paths. The Summit Beast floats over soft ground where conventional bikes sink, backed by a potent 750W hub motor with 5 levels of cadence pedal assist.',
    keyFeatures: [
      'CST BFT 26" x 4.0" All-Terrain Puncture Shield Tyres',
      '750W Sustained Peak Motor (80Nm torque)',
      'Huge 48V 20Ah Long-Range Removable Battery Pack',
      'Colour LCD Display with USB Phone Charging Port',
      'Heavy-duty alloy rear luggage rack included'
    ],
    specs: {
      motor: '750W High-Torque Rear Motor',
      battery: '48V 20Ah (960Wh) High Capacity Removable',
      range: '85 - 120 km',
      topSpeed: '45 km/h',
      brakes: 'Hydraulic Twin-Piston Disc 180mm',
      gears: 'Shimano 7-Speed MegaRange',
      weight: '29.8 kg',
      maxLoad: '160 kg',
      frame: 'Reinforced 6061 Aluminium Alloy'
    },
    inStock: true,
    warranty: '2-Year Nationwide Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#1E293B'
  },
  {
    id: 'metro-glide-stepthrough',
    name: 'Metro Glide Step-Through 250W Commuter',
    tagline: 'Low-step comfort frame with upright ergonomic posture for effortless daily city commuting',
    category: 'Electric Commuter Bikes',
    subcategory: 'Step-Through Comfort',
    price: 1199,
    originalPrice: 1399,
    badge: 'Best Value',
    description: 'The Metro Glide is Australia’s most loved step-through electric commuter bike. Featuring a step-over height of just 38cm, it makes mounting and dismounting effortless in casual attire or work clothes. Fully compliant with Australian standard EN15194 (250W street legal).',
    keyFeatures: [
      'Australian EN15194 Certified 250W Bafang Silent Motor',
      'Ultra-Low Step-Through Frame (Easy on knees and hips)',
      'Plush Selle Royal Ergonomic Gel Saddle with Suspension Seatpost',
      'Front and Rear StVZO German-Standard Integrated Lights',
      'Full-Coverage Mudguards & Sturdy Rear Pannier Rack'
    ],
    specs: {
      motor: '250W EN15194 Certified Street-Legal Motor',
      battery: '36V 15.6Ah (561Wh) Downtube Hidden Battery',
      range: '70 - 100 km per charge',
      topSpeed: '25 km/h (Strict Australian Road Legal)',
      brakes: 'Tektro Mechanical Disc Brakes with Motor Cutoff',
      gears: 'Shimano Nexus 7-Speed Internal Gear Hub',
      weight: '23.8 kg',
      maxLoad: '130 kg',
      frame: 'Low-Step 6061 Aluminium Alloy'
    },
    inStock: true,
    warranty: '2-Year Frame, 18-Month Battery Guarantee',
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#059669'
  },
  {
    id: 'cityline-express-urban',
    name: 'CityLine Express Urban 350W',
    tagline: 'Clean aesthetic, internal routing, and fast 700c wheels for the swift metropolitan rider',
    category: 'Electric Commuter Bikes',
    subcategory: 'Urban Speed Commuter',
    price: 1299,
    badge: 'New',
    description: 'Sleek, stripped-back, and featherlight for an e-bike. The CityLine Express conceals its battery entirely in the downtube, giving it the refined silhouette of a classic road bike with the invisible assist of a 350W whisper-quiet motor.',
    keyFeatures: [
      '350W Lightweight Rear Hub with Smooth Cadence Sensor',
      'Torque-Sensing Bottom Bracket for natural pedalling feel',
      '700c x 38c Schwalbe Citizen K-Guard Puncture Tyres',
      'Clean minimalist cockpit with integrated stem display',
      'Carbon-look fork for vibration dampening'
    ],
    specs: {
      motor: '350W (limited to 250W road mode) Whisper-Hub',
      battery: '36V 10.5Ah (378Wh) Integrated Panasonic Cells',
      range: '55 - 75 km',
      topSpeed: '32 km/h (25 km/h limit toggle)',
      brakes: 'Tektro Flat-Mount Hydraulic Discs',
      gears: 'Shimano Sora 9-Speed',
      weight: '17.6 kg',
      maxLoad: '120 kg',
      frame: 'Custom Hydroformed Alloy with Internal Cable Routing'
    },
    inStock: true,
    warranty: '2-Year Complete Manufacturer Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#3B82F6'
  },
  {
    id: 'courier-hauler-cargo',
    name: 'Courier Hauler Longtail Cargo Pro 500W',
    tagline: 'Heavy-duty electric cargo bike capable of hauling 2 kids, groceries, or commercial deliveries',
    category: 'Electric Commuter Bikes',
    subcategory: 'Cargo & Utility',
    price: 1999,
    originalPrice: 2399,
    badge: 'Popular',
    description: 'Transform your daily school run and grocery trips into a breeze. The Courier Hauler features an extended rear deck compatible with Thule Yepp child seats, oversized panniers, or crate platforms, backed by a massive dual-battery option.',
    keyFeatures: [
      '500W High-Torque Heavy Duty Motor (80Nm)',
      'Dual Battery Ready (48V 15Ah primary included)',
      'Integrated Heavy-Duty Central Double Kickstand',
      'Extended Rear Cargo Deck with Safety Handrails',
      'Magura 4-Piston Cargo-Rated Hydraulic Brakes'
    ],
    specs: {
      motor: '500W Heavy Duty Rear Motor',
      battery: '48V 15Ah (720Wh) Primary Lithium Pack',
      range: '70 - 110 km',
      topSpeed: '35 km/h (25 km/h default)',
      brakes: 'Magura Hydraulic 4-Piston with Motor Inhibitor',
      gears: 'Shimano Acera 8-Speed Wide Ratio',
      weight: '33.5 kg',
      maxLoad: '210 kg (Rider + Cargo)',
      frame: 'Reinforced Chrome-Moly / Alloy Hybrid'
    },
    inStock: true,
    warranty: '3-Year Frame & Fork, 2-Year Motor Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#D97706'
  },
  {
    id: 'voltfold-compact-250',
    name: 'VoltFold Compact 250W Folding e-Bike',
    tagline: 'Folds in 10 seconds for apartments, car boots, campervans, and train transit',
    category: 'Folding Electric Bikes',
    subcategory: 'Compact Commuter Fold',
    price: 899,
    originalPrice: 1099,
    badge: 'Best Value',
    description: 'Our most affordable and space-saving electric bicycle. Folds down to a tidy 78 x 42 x 66 cm package in less than 10 seconds with magnetic frame locks. Ideal for apartment dwellers and caravanners traversing Australia.',
    keyFeatures: [
      '10-Second Quick-Fold Magnetic Mechanism',
      'Removable Seatpost Battery (Charge in your office or caravan)',
      '20" x 2.125" Smooth Rolling City Tyres',
      'Integrated Telescopic Stem for riders from 150cm to 195cm',
      'Foldable Wellgo pedals and rear carry rack'
    ],
    specs: {
      motor: '250W Brushless Geared Hub',
      battery: '36V 10.4Ah (374Wh) Removable Seatpost Battery',
      range: '45 - 65 km',
      topSpeed: '25 km/h',
      brakes: 'Dual Mechanical Disc Brakes',
      gears: 'Shimano Tourney 7-Speed',
      weight: '19.2 kg',
      maxLoad: '115 kg',
      frame: 'Aviation 6061 Alloy Folding Lattice'
    },
    inStock: true,
    warranty: '2-Year Nationwide Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#10B981'
  },
  {
    id: 'nomad-fat-tyre-folder',
    name: 'Nomad Fat-Tyre Explorer Fold 500W',
    tagline: 'Rugged folding e-bike with 20x4.0 fat tyres for off-grid caravanning and beach trails',
    category: 'Folding Electric Bikes',
    subcategory: 'Fat Tyre Explorer Fold',
    price: 1399,
    originalPrice: 1649,
    badge: 'Popular',
    description: 'The ultimate touring companion for Aussie 4WDers and road-trippers. Combines compact folding convenience with wide 4-inch all-terrain tyres, front suspension, and a powerful 500W motor to handle unsealed bush tracks.',
    keyFeatures: [
      '20" x 4.0" Kenda Krusade All-Terrain Fat Tyres',
      'Reinforced folding hinge with dual safety latch',
      'Front Hydraulic Lockout Suspension Fork',
      'Full Color LED Dashboard with Cruise Control',
      'Heavy-duty alloy fenders & reinforced rear rack'
    ],
    specs: {
      motor: '500W High Torque Hub (70Nm)',
      battery: '48V 14.5Ah (696Wh) Hidden Removable Pack',
      range: '60 - 85 km',
      topSpeed: '38 km/h (25 km/h street mode)',
      brakes: 'Hydraulic Disc Brakes 180mm',
      gears: 'Shimano 7-Speed',
      weight: '27.4 kg',
      maxLoad: '140 kg',
      frame: 'Heavy-Duty 6061 Heat-Treated Alloy'
    },
    inStock: true,
    warranty: '2-Year Frame, 1-Year Battery Guarantee',
    imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#7C3AED'
  },
  {
    id: 'certified-refurb-outback',
    name: 'Certified Pre-Owned Outback Ranger 500W',
    tagline: 'Thoroughly bench-tested 42-point inspected e-bike with new battery cells and warranty',
    category: 'Second Hand & Refurbished',
    subcategory: 'Certified Pre-Owned',
    price: 799,
    originalPrice: 1399,
    badge: 'Sale',
    description: 'Save big with an eco-friendly choice. Every Certified Pre-Owned e-bike passes our rigorous 42-point workshop inspection, receives fresh brake pads, tuned gears, and is paired with a tested high-capacity battery holding $\ge$95% original capacity.',
    keyFeatures: [
      'Rigorous 42-Point Workshop Certification by Australian Bike Mechanics',
      'Tested Battery with 95%+ Health Guarantee',
      'Brand New Brake Pads & Fresh Chain Fitted',
      'Includes original charger and manual',
      'Covered by 12-Month Australian Warranty'
    ],
    specs: {
      motor: '500W Rear Hub Motor (Fully Tested)',
      battery: '48V 13Ah Inspected Lithium Battery',
      range: '50 - 75 km',
      topSpeed: '32 km/h',
      brakes: 'Mechanical Disc Brakes with New Pads',
      gears: 'Shimano 7-Speed Tuned',
      weight: '24.0 kg',
      maxLoad: '130 kg',
      frame: '6061 Alloy (Minor cosmetic marks only, Grade A)'
    },
    inStock: true,
    warranty: '12-Month Comprehensive Australian Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#059669'
  },
  {
    id: 'ex-demo-fleet-cityline',
    name: 'Ex-Demo Fleet CityLine Urban 250W',
    tagline: 'Lightly used showroom demonstration model with under 50km on the odometer',
    category: 'Second Hand & Refurbished',
    subcategory: 'Ex-Demo Fleet Special',
    price: 849,
    originalPrice: 1299,
    badge: 'Sale',
    description: 'An exceptional deal on an ex-demo showroom bicycle. Used only for short customer test rides in our Australian facility, showing fewer than 50km total on the digital odometer. Restored to pristine condition and sold with complete peace of mind.',
    keyFeatures: [
      'Low Odometer: Under 50 km Total Mileage',
      'Pristine Showroom Condition (Grade A+)',
      'Full Factory Reset and Diagnostics Report Included',
      'Same 2-Year Warranty as Brand New Units',
      'Free Nationwide Shipping included'
    ],
    specs: {
      motor: '250W Ultra-Quiet Street-Legal Hub',
      battery: '36V 10.4Ah Samsung Cells',
      range: '55 - 75 km',
      topSpeed: '25 km/h',
      brakes: 'Tektro Hydraulic Disc Brakes',
      gears: 'Shimano 8-Speed',
      weight: '18.1 kg',
      maxLoad: '120 kg',
      frame: 'Lightweight Hydroformed Alloy'
    },
    inStock: true,
    warranty: '2-Year Nationwide Factory Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#2563EB'
  },
  {
    id: 'battery-48v-17ah',
    name: '48V 17.5Ah Replacement Lithium Battery',
    tagline: 'Drop-in replacement pack for 48V mid-drive and hub-motor e-bikes',
    category: 'Batteries & Chargers',
    subcategory: 'Replacement Batteries',
    price: 649,
    badge: 'Popular',
    description: 'A 840Wh lithium-ion replacement pack with an integrated battery management system. Restore full range on an older bike or carry a spare for long trail days.',
    keyFeatures: [
      '840Wh capacity with built-in BMS protection',
      'Over-charge, over-discharge and short-circuit protection',
      'Lockable frame-mount design with key'
    ],
    details: {
      'Voltage': '48V',
      'Capacity': '17.5Ah (840Wh)'
    },
    inStock: true,
    warranty: '12-Month Australian Warranty',
    imageUrl: ''
  },
  {
    id: 'battery-36v-10ah',
    name: '36V 10.4Ah Replacement Lithium Battery',
    tagline: 'Compact replacement pack for 36V commuter and folding e-bikes',
    category: 'Batteries & Chargers',
    subcategory: 'Replacement Batteries',
    price: 449,
    description: 'A 374Wh lithium-ion pack for 36V city and folding e-bikes, with integrated BMS protection.',
    keyFeatures: [
      '374Wh capacity with built-in BMS protection',
      'Lightweight, easy-release design',
      'Suits 36V commuter and folding models'
    ],
    details: {
      'Voltage': '36V',
      'Capacity': '10.4Ah (374Wh)'
    },
    inStock: true,
    warranty: '12-Month Australian Warranty',
    imageUrl: ''
  },
  {
    id: 'charger-smart-5a',
    name: 'Smart 5A Fast Charger (48V)',
    tagline: 'Faster top-ups with automatic cut-off when the battery is full',
    category: 'Batteries & Chargers',
    subcategory: 'Chargers',
    price: 129,
    badge: 'Best Value',
    description: 'A smart charger with automatic cut-off and status LEDs. Roughly halves the charge time of a standard 2A charger on 48V packs.',
    keyFeatures: [
      '5A fast-charge output',
      'Automatic cut-off at full charge',
      'Status LED indicator'
    ],
    details: {
      'Output': '54.6V / 5A',
      'Plug': 'Australian 3-pin'
    },
    inStock: true,
    warranty: '12-Month Australian Warranty',
    imageUrl: ''
  },
  {
    id: 'charger-standard-2a',
    name: 'Standard 2A Charger (36V / 48V)',
    tagline: 'Spare or replacement charger for home or workshop',
    category: 'Batteries & Chargers',
    subcategory: 'Chargers',
    price: 79,
    description: 'A reliable standard-rate charger. Keep one at home and one at work, or replace a lost original.',
    keyFeatures: [
      '2A standard charge rate',
      'Status LED indicator',
      'Compact and travel-friendly'
    ],
    details: {
      'Output': '2A',
      'Plug': 'Australian 3-pin'
    },
    inStock: true,
    warranty: '12-Month Australian Warranty',
    imageUrl: ''
  },
  {
    id: 'brake-pads-hydraulic',
    name: 'Hydraulic Disc Brake Pad Set (2 pairs)',
    tagline: 'Semi-metallic replacement pads for front and rear',
    category: 'Parts & Components',
    subcategory: 'Brakes & Tyres',
    price: 39,
    description: 'Semi-metallic pads for strong, consistent stopping in wet and dry. Two pairs cover the front and rear of one bike.',
    keyFeatures: [
      'Semi-metallic compound',
      'Two pairs per pack',
      'Suits common 2-piston hydraulic calipers'
    ],
    details: {
      'Pack': '2 pairs',
      'Type': 'Semi-metallic'
    },
    inStock: true,
    warranty: '30-Day Fit Guarantee',
    imageUrl: ''
  },
  {
    id: 'tyres-puncture-resistant',
    name: 'Puncture-Resistant e-Bike Tyre (single)',
    tagline: 'Reinforced tyre with a puncture-protection layer',
    category: 'Parts & Components',
    subcategory: 'Brakes & Tyres',
    price: 59,
    description: 'A reinforced e-bike tyre with a puncture-protection layer, built for the extra weight and torque of an electric bike.',
    keyFeatures: [
      'Puncture-protection layer',
      'Reflective sidewall',
      'Check your size before ordering'
    ],
    details: {
      'Pack': '1 tyre',
      'Sizes': 'Select size on order'
    },
    inStock: true,
    warranty: '30-Day Fit Guarantee',
    imageUrl: ''
  },
  {
    id: 'drivetrain-chain-kit',
    name: '10-Speed Chain & Cassette Kit',
    tagline: 'Replacement drivetrain wear parts for 10-speed e-bikes',
    category: 'Parts & Components',
    subcategory: 'Drivetrain',
    price: 119,
    description: 'Replace a worn chain and cassette together for crisp shifting. Sized for 10-speed e-bike drivetrains.',
    keyFeatures: [
      'Chain and cassette sold together',
      '10-speed compatible',
      'Hardened steel for e-bike torque'
    ],
    details: {
      'Speeds': '10',
      'Contents': 'Chain + cassette'
    },
    inStock: true,
    warranty: '30-Day Fit Guarantee',
    imageUrl: ''
  },
  {
    id: 'helmet-urban-certified',
    name: 'Urban e-Bike Helmet (AS/NZS 2063)',
    tagline: 'Ventilated commuter helmet with rear LED and adjustable fit',
    category: 'Accessories & Safety Gear',
    subcategory: 'Helmets & Safety',
    price: 89,
    badge: 'Popular',
    description: 'A ventilated helmet with an adjustable dial fit and a rear LED. Helmets are compulsory when riding in Australia.',
    keyFeatures: [
      'Meets AS/NZS 2063',
      'Rear LED light',
      'Adjustable dial fit'
    ],
    details: {
      'Standard': 'AS/NZS 2063',
      'Sizes': 'M / L'
    },
    inStock: true,
    warranty: '12-Month Australian Warranty',
    imageUrl: ''
  },
  {
    id: 'lock-d-lock-heavy',
    name: 'Heavy-Duty D-Lock with Cable',
    tagline: 'Hardened-steel D-lock for urban parking',
    category: 'Accessories & Safety Gear',
    subcategory: 'Locks & Security',
    price: 79,
    description: 'A hardened-steel D-lock plus a flexible cable for securing wheels. A sensible add-on for any e-bike.',
    keyFeatures: [
      'Hardened-steel shackle',
      'Includes cable for the wheels',
      'Mounting bracket included'
    ],
    details: {
      'Type': 'D-lock + cable',
      'Keys': '2 included'
    },
    inStock: true,
    warranty: '12-Month Australian Warranty',
    imageUrl: ''
  },
  {
    id: 'pannier-bag-rack',
    name: 'Rear Pannier Bag (Waterproof)',
    tagline: 'Roll-top commuter pannier for any standard rear rack',
    category: 'Accessories & Safety Gear',
    subcategory: 'Bags & Racks',
    price: 99,
    description: 'A waterproof roll-top pannier with reflective trim and a quick-release hook system for standard rear racks.',
    keyFeatures: [
      'Waterproof roll-top closure',
      'Reflective trim',
      'Quick-release mounting'
    ],
    details: {
      'Capacity': '20L',
      'Material': 'Waterproof fabric'
    },
    inStock: true,
    warranty: '12-Month Australian Warranty',
    imageUrl: ''
  }
];

export const CATEGORIES_WITH_SUBCATEGORIES = [
  {
    category: 'Electric Mountain Bikes' as const,
    description: 'High-torque e-MTB engineered for trail exploration, steep singletrack, and Australian bush terrain.',
    subcategories: ['All', 'Full-Suspension Enduro', 'Hardtail Trail', 'All-Terrain Fat Tyre']
  },
  {
    category: 'Electric Commuter Bikes' as const,
    description: 'Ergonomic urban and step-through electric bicycles designed for daily commutes and leisurely rides.',
    subcategories: ['All', 'Step-Through Comfort', 'Urban Speed Commuter', 'Cargo & Utility']
  },
  {
    category: 'Folding Electric Bikes' as const,
    description: 'Space-saving foldable e-bikes ideal for apartments, caravans, RV road-trips, and public transit.',
    subcategories: ['All', 'Compact Commuter Fold', 'Fat Tyre Explorer Fold']
  },
  {
    category: 'Second Hand & Refurbished' as const,
    description: 'Certified pre-owned and ex-demo electric bikes thoroughly tested by mechanics with warranty.',
    subcategories: ['All', 'Certified Pre-Owned', 'Ex-Demo Fleet Special']
  },
  {
    category: 'Batteries & Chargers' as const,
    description: 'Replacement lithium packs and chargers to restore range or carry a spare.',
    subcategories: ['All', 'Replacement Batteries', 'Chargers']
  },
  {
    category: 'Parts & Components' as const,
    description: 'Brake pads, tyres and drivetrain parts to keep your e-bike running.',
    subcategories: ['All', 'Brakes & Tyres', 'Drivetrain']
  },
  {
    category: 'Accessories & Safety Gear' as const,
    description: 'Helmets, locks and bags to ride safe and keep your bike secure.',
    subcategories: ['All', 'Helmets & Safety', 'Locks & Security', 'Bags & Racks']
  }
];
