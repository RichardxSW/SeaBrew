const shows = [
  { 
    id: 1, 
    name: 'Meerkat Feeding', 
    image: require('../shows/meerkat.png'), 
    description: 'Join us for an immersive experience at the "Meerkat Feeding" show. Watch as our adorable meerkats scavenge for food in their natural habitat, showcasing their teamwork and agility. This interactive presentation offers fascinating insights into the lives of these curious creatures. Dont miss the chance to witness the lively antics of our meerkat family!', 
    location: 'Desert Exhibit',
    day: ['Wed', 'Fri', 'Sun'] 
  },
  { 
    id: 2, 
    name: "Tropical Bird's Encounter", 
    image: require('../shows/bird.png'), 
    description: 'Step into the enchanting world of avian wonders at the Tropical Birds Encounter show. Get up close and personal with some of our most vibrant feathered friends as they showcase their dazzling colors and melodious songs. Learn about their unique behaviors, habitats, and the conservation efforts needed to protect these beautiful birds. Join us for an unforgettable journey through the tropical skies!', 
    location: 'Aviary',
    day: ['Tue', 'Thu', 'Sat'] 
  },
  { 
    id: 3, 
    name: 'Mystic Mermaid: Jewel of the Sea', 
    image: require('../shows/mermaid1.png'), 
    description: 'Embark on a magical underwater adventure with the mesmerizing mermaids of the Mystic Mermaid: Jewel of the Sea show. Dive into the mystical depths of our mermaid tank and be transported to a world of wonder and enchantment. Experience their graceful movements, breathtaking performances, and discover the secrets of the ocean as told by these legendary creatures. Join us for an aquatic spectacle like no other!', 
    location: 'Mermaid Tank',
    day: ['Mon', 'Wed', 'Fri', 'Sun'] 
  },
  { 
    id: 4, 
    name: 'Otter Adventure Feeding', 
    image: require('../shows/otter.png'), 
    description: 'Join the fun-loving otters at the Otter Adventure Feeding show for an unforgettable dining experience. Watch as these playful creatures frolic and feast on a delicious meal, showcasing their agility and intelligence. Learn about otter conservation efforts and the importance of protecting their natural habitats. Dive into the world of otters and make memories that will last a lifetime!', 
    location: 'Otter Exhibit',
    day: ['Mon', 'Tue', 'Thu', 'Fri'] 
  },
  { 
    id: 5, 
    name: 'Penguin Parade', 
    image: require('../shows/penguin.png'), 
    description: 'Experience the charm of the Antarctic at the Penguin Parade show. Watch in awe as our adorable penguins waddle and swim in their icy enclosure, entertaining visitors with their playful antics. Learn about the unique adaptations that allow these fascinating birds to thrive in their cold habitat and the conservation efforts in place to protect their future. Join us for a heartwarming journey to the South Pole!', 
    location: 'Penguin Exhibit',
    day: ['Mon', 'Wed', 'Thu', 'Sun', 'Fri'] 
  },
  { 
    id: 6, 
    name: 'Piranha Frenzy Feeding', 
    image: require('../shows/piranha.png'), 
    description: 'Get ready for an adrenaline-pumping adventure at the Piranha Frenzy Feeding show. Witness the thrilling spectacle as piranhas feed with incredible speed and precision, dispelling myths and revealing the truth about these infamous fish. Explore the behavior and ecology of these fascinating predators as our expert guides provide insights into their natural habitat and survival strategies. Join us for an unforgettable journey into the depths of the Amazon!', 
    location: 'Amazon Exhibit',
    day: ['Mon', 'Tue', 'Wed', 'Sun', 'Sat'] 
  },
  { 
    id: 7, 
    name: "Predator's Meal", 
    image: require('../shows/shark.png'), 
    description: 'Dive into the depths of the ocean and witness the power and grace of our sharks at the Predator\'s Meal show. Experience the thrill as these majestic creatures glide through the water during their feeding time, showcasing their incredible hunting skills. Learn about shark conservation efforts and the importance of protecting these apex predators for the health of our oceans. Join us for an exhilarating adventure beneath the waves!', 
    location: 'Shark Tank',
    day: ['Sat'] 
  },
  { 
    id: 8, 
    name: 'Mermaid Legends: Guardian of the Reef', 
    image: require('../shows/mermaid2.png'), 
    description: 'Immerse yourself in the enchanting world of mermaids at the Mermaid Legends: Guardian of the Reef show. Experience a captivating performance that celebrates the beauty and mystery of the ocean, as told through the mesmerizing tales of these mythical beings. Journey to the depths of the sea and discover the wonders that lie beneath the waves. Join us for a magical adventure that will leave you spellbound!', 
    location: 'Mermaid Lagoon',
    day: ['Tue', 'Thu', 'Sat'] 
  },
];

export default shows;
