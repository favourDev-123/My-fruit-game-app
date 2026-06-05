export const fruits = [
  {
    id: 1,
    name: "Banana",
    emoji: "🍌",
    color: "bg-yellow-100 border-yellow-300",
    tagColor: "bg-yellow-200 text-yellow-800",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop",
    description: "Bananas are rich in potassium and natural sugars, making them a quick energy booster.",
    nutrients: ["Potassium", "Vitamin B6", "Vitamin C", "Fiber", "Magnesium"],
    healthBenefits: [
      { condition: "Heart Health", detail: "High potassium helps regulate blood pressure and heart rhythm." },
      { condition: "Digestion", detail: "Fiber and prebiotics support healthy gut bacteria." },
      { condition: "Energy Boost", detail: "Natural sugars provide quick, sustained energy for active lifestyles." },
      { condition: "Muscle Cramps", detail: "Potassium and magnesium help prevent muscle cramps." }
    ],
    ageGroups: {
      children: "Great first food for babies. Mash for infants, slice for toddlers. Provides energy for growing bodies.",
      teens: "Perfect pre-workout snack. Supports muscle development and sustained energy during sports.",
      adults: "Helps manage blood pressure and provides quick energy. Great for busy lifestyles.",
      seniors: "Easy to chew and digest. Supports heart health and bone strength."
    }
  },
  {
    id: 2,
    name: "Blueberry",
    emoji: "🫐",
    color: "bg-indigo-100 border-indigo-300",
    tagColor: "bg-indigo-200 text-indigo-800",
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=300&fit=crop",
    description: "Blueberries are antioxidant powerhouses that support brain health and immunity.",
    nutrients: ["Antioxidants", "Vitamin C", "Vitamin K", "Fiber", "Manganese"],
    healthBenefits: [
      { condition: "Brain Health", detail: "Anthocyanins improve memory and slow cognitive decline." },
      { condition: "Immunity", detail: "High vitamin C content strengthens the immune system." },
      { condition: "Eye Health", detail: "Antioxidants protect against age-related eye conditions." },
      { condition: "Blood Sugar", detail: "Low glycemic index helps regulate blood sugar levels." }
    ],
    ageGroups: {
      children: "Fun finger food packed with vitamins. Supports growing immune systems and brain development.",
      teens: "Boosts concentration and memory — great for studying. Helps skin health too.",
      adults: "Protects against chronic diseases. Supports heart health and cognitive function.",
      seniors: "May slow memory decline. Supports vision health and reduces inflammation."
    }
  },
  {
    id: 3,
    name: "Orange",
    emoji: "🍊",
    color: "bg-orange-100 border-orange-300",
    tagColor: "bg-orange-200 text-orange-800",
    image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=300&fit=crop",
    description: "Oranges are vitamin C champions that boost immunity and skin health.",
    nutrients: ["Vitamin C", "Folate", "Thiamine", "Fiber", "Potassium"],
    healthBenefits: [
      { condition: "Immunity", detail: "One orange provides over 100% daily vitamin C needs." },
      { condition: "Skin Health", detail: "Vitamin C promotes collagen production for healthy skin." },
      { condition: "Iron Absorption", detail: "Vitamin C enhances iron absorption from plant foods." },
      { condition: "Kidney Stones", detail: "Citrate in oranges may help prevent kidney stone formation." }
    ],
    ageGroups: {
      children: "Builds strong immune systems. Dilute juice for babies, segments for toddlers.",
      teens: "Supports clear skin and immune health during growth spurts.",
      adults: "Prevents colds, supports collagen, and aids iron absorption.",
      seniors: "Boosts weakened immune systems and supports wound healing."
    }
  },
  {
    id: 4,
    name: "Apple",
    emoji: "🍎",
    color: "bg-red-100 border-red-300",
    tagColor: "bg-red-200 text-red-800",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop",
    description: "Apples are fiber-rich fruits that support digestive and heart health.",
    nutrients: ["Fiber", "Vitamin C", "Potassium", "Quercetin", "Pectin"],
    healthBenefits: [
      { condition: "Heart Health", detail: "Soluble fiber helps lower cholesterol levels." },
      { condition: "Weight Management", detail: "High fiber content promotes fullness and reduces overeating." },
      { condition: "Gut Health", detail: "Pectin acts as a prebiotic to feed beneficial gut bacteria." },
      { condition: "Diabetes Prevention", detail: "Polyphenols help improve insulin sensitivity." }
    ],
    ageGroups: {
      children: "Applesauce for babies. Crunchy slices promote dental health in older children.",
      teens: "Great portable snack. Supports healthy weight and steady energy levels.",
      adults: "Helps manage cholesterol and weight. Versatile and easy to include in diet.",
      seniors: "Supports digestive regularity and cardiovascular health. Easy to prepare."
    }
  },
  {
    id: 5,
    name: "Avocado",
    emoji: "🥑",
    color: "bg-green-100 border-green-300",
    tagColor: "bg-green-200 text-green-800",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop",
    description: "Avocados are loaded with healthy fats that nourish the brain and heart.",
    nutrients: ["Healthy Fats", "Potassium", "Vitamin E", "Vitamin K", "Folate"],
    healthBenefits: [
      { condition: "Brain Development", detail: "Healthy fats support brain structure and cognitive function." },
      { condition: "Heart Health", detail: "Monounsaturated fats help reduce bad cholesterol." },
      { condition: "Nutrient Absorption", detail: "Fats help absorb vitamins A, D, E, and K from other foods." },
      { condition: "Inflammation", detail: "Contains anti-inflammatory compounds that reduce chronic inflammation." }
    ],
    ageGroups: {
      children: "Excellent brain food for developing minds. Creamy texture perfect for babies.",
      teens: "Supports brain development during crucial teenage years. Great for skin health.",
      adults: "Heart-healthy fats support cardiovascular health and nutrient absorption.",
      seniors: "Anti-inflammatory properties help with joint health and cognitive function."
    }
  },
  {
    id: 6,
    name: "Strawberry",
    emoji: "🍓",
    color: "bg-pink-100 border-pink-300",
    tagColor: "bg-pink-200 text-pink-800",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=300&fit=crop",
    description: "Strawberries are sweet, nutrient-dense berries great for heart and skin health.",
    nutrients: ["Vitamin C", "Manganese", "Folate", "Antioxidants", "Fiber"],
    healthBenefits: [
      { condition: "Skin Health", detail: "Vitamin C and ellagic acid protect skin from UV damage." },
      { condition: "Heart Health", detail: "Anthocyanins reduce risk of heart attacks." },
      { condition: "Blood Sugar", detail: "Slow sugar release helps maintain stable blood glucose." },
      { condition: "Dental Health", detail: "Malic acid is a natural teeth whitener." }
    ],
    ageGroups: {
      children: "Rich in vitamins for growing bodies. Cut into small pieces for safety.",
      teens: "Supports clear skin and provides steady energy. Low calorie, high nutrition.",
      adults: "Protects heart and skin. Perfect healthy dessert alternative.",
      seniors: "Supports cardiovascular health and provides easy-to-eat nutrition."
    }
  },
  {
    id: 7,
    name: "Watermelon",
    emoji: "🍉",
    color: "bg-emerald-100 border-emerald-300",
    tagColor: "bg-emerald-200 text-emerald-800",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop",
    description: "Watermelon is hydrating and refreshing, packed with lycopene and citrulline.",
    nutrients: ["Lycopene", "Vitamin C", "Vitamin A", "Citrulline", "Water"],
    healthBenefits: [
      { condition: "Hydration", detail: "92% water content helps maintain hydration levels." },
      { condition: "Muscle Recovery", detail: "Citrulline reduces muscle soreness after exercise." },
      { condition: "Blood Pressure", detail: "Citrulline helps relax blood vessels and lower BP." },
      { condition: "Skin Protection", detail: "Lycopene provides natural protection against sun damage." }
    ],
    ageGroups: {
      children: "Fun, hydrating summer treat. Remove seeds for young children.",
      teens: "Perfect post-sport recovery. Hydrating and helps with muscle soreness.",
      adults: "Helps with hydration, blood pressure management, and exercise recovery.",
      seniors: "Easy to eat, helps with hydration, and supports cardiovascular health."
    }
  },
  {
    id: 8,
    name: "Mango",
    emoji: "🥭",
    color: "bg-amber-100 border-amber-300",
    tagColor: "bg-amber-200 text-amber-800",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop",
    description: "Mangoes are tropical superfruits loaded with vitamins A and C.",
    nutrients: ["Vitamin A", "Vitamin C", "Folate", "Fiber", "Vitamin E"],
    healthBenefits: [
      { condition: "Vision", detail: "Beta-carotene converts to vitamin A, essential for eye health." },
      { condition: "Immunity", detail: "Rich in vitamin C to fight infections and boost immunity." },
      { condition: "Digestion", detail: "Enzymes like amylase help break down complex carbs." },
      { condition: "Skin & Hair", detail: "Vitamins A and E promote healthy skin and hair growth." }
    ],
    ageGroups: {
      children: "Sweet taste kids love. Puree for babies. Supports vision and immune health.",
      teens: "Supports skin health and immunity. Delicious smoothie ingredient.",
      adults: "Boosts immunity, supports digestion, and promotes glowing skin.",
      seniors: "Easy to digest, supports eye health, and provides essential vitamins."
    }
  },
  {
    id: 9,
    name: "Kiwi",
    emoji: "🥝",
    color: "bg-lime-100 border-lime-300",
    tagColor: "bg-lime-200 text-lime-800",
    image: "https://images.unsplash.com/photo-1585059895524-72f7e77e0e86?w=400&h=300&fit=crop",
    description: "Kiwis pack more vitamin C than oranges and are excellent for sleep and digestion.",
    nutrients: ["Vitamin C", "Vitamin K", "Vitamin E", "Serotonin", "Fiber"],
    healthBenefits: [
      { condition: "Sleep Quality", detail: "Natural serotonin helps improve sleep onset and duration." },
      { condition: "Immunity", detail: "Contains more vitamin C per gram than most citrus fruits." },
      { condition: "Digestion", detail: "Actinidin enzyme helps break down protein for easier digestion." },
      { condition: "Blood Clotting", detail: "Vitamin K supports proper blood clotting and bone health." }
    ],
    ageGroups: {
      children: "Introduce after 8 months. Supports immune health and provides great nutrients.",
      teens: "Helps with sleep quality — eat 2 before bed. Boosts immunity during school.",
      adults: "Improves sleep, digestion, and immune function. Small but mighty fruit.",
      seniors: "Supports bone health, improves sleep quality, and aids digestion."
    }
  },
  {
    id: 10,
    name: "Pomegranate",
    emoji: "🫐",
    color: "bg-rose-100 border-rose-300",
    tagColor: "bg-rose-200 text-rose-800",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=300&fit=crop",
    description: "Pomegranates are antioxidant giants with powerful anti-inflammatory properties.",
    nutrients: ["Punicalagins", "Vitamin C", "Vitamin K", "Folate", "Potassium"],
    healthBenefits: [
      { condition: "Inflammation", detail: "Punicalagins are potent anti-inflammatory compounds." },
      { condition: "Joint Health", detail: "May help reduce arthritis symptoms and joint pain." },
      { condition: "Memory", detail: "Polyphenols support memory and cognitive function." },
      { condition: "Heart Health", detail: "Helps lower blood pressure and reduce arterial plaque." }
    ],
    ageGroups: {
      children: "Rich in vitamins for growing bodies. Remove seeds for young children.",
      teens: "Supports brain health during studying. Anti-inflammatory for active teens.",
      adults: "Protects heart health and reduces chronic inflammation.",
      seniors: "May help with arthritis, memory, and cardiovascular health."
    }
  }
];

export const quizQuestions = [
  {
    question: "Which fruit is best known for being high in potassium?",
    options: ["Apple", "Banana", "Orange", "Strawberry"],
    correct: 1,
    explanation: "Bananas are famous for their high potassium content, which helps regulate blood pressure and heart rhythm."
  },
  {
    question: "Which fruit can help improve sleep quality?",
    options: ["Mango", "Watermelon", "Kiwi", "Apple"],
    correct: 2,
    explanation: "Kiwis contain natural serotonin that helps improve sleep onset and duration."
  },
  {
    question: "Which fruit is 92% water and great for hydration?",
    options: ["Watermelon", "Orange", "Strawberry", "Banana"],
    correct: 0,
    explanation: "Watermelon is 92% water, making it one of the most hydrating fruits available."
  },
  {
    question: "Which fruit's healthy fats help your brain develop?",
    options: ["Apple", "Blueberry", "Avocado", "Orange"],
    correct: 2,
    explanation: "Avocados are rich in monounsaturated fats that support brain structure and cognitive function."
  },
  {
    question: "Which berry is known as an 'antioxidant powerhouse' for brain health?",
    options: ["Strawberry", "Blueberry", "Pomegranate", "Banana"],
    correct: 1,
    explanation: "Blueberries contain anthocyanins that improve memory and may slow cognitive decline."
  },
  {
    question: "Which fruit provides over 100% of your daily vitamin C needs?",
    options: ["Apple", "Banana", "Mango", "Orange"],
    correct: 3,
    explanation: "One orange provides over 100% of the daily recommended vitamin C intake."
  },
  {
    question: "Which fruit contains citrulline that helps with muscle recovery?",
    options: ["Watermelon", "Pomegranate", "Kiwi", "Avocado"],
    correct: 0,
    explanation: "Watermelon contains citrulline, which reduces muscle soreness after exercise."
  },
  {
    question: "Which fruit is rich in pectin, acting as a prebiotic for gut health?",
    options: ["Mango", "Strawberry", "Apple", "Blueberry"],
    correct: 2,
    explanation: "Apples contain pectin, a soluble fiber that feeds beneficial gut bacteria."
  },
  {
    question: "Which tropical fruit has enzymes that help break down carbohydrates?",
    options: ["Banana", "Mango", "Kiwi", "Orange"],
    correct: 1,
    explanation: "Mangoes contain amylase enzymes that help break down complex carbohydrates for easier digestion."
  },
  {
    question: "Which fruit contains punicalagins, powerful anti-inflammatory compounds?",
    options: ["Strawberry", "Blueberry", "Apple", "Pomegranate"],
    correct: 3,
    explanation: "Pomegranates contain punicalagins, which are extremely potent anti-inflammatory compounds."
  },
  {
    question: "For a baby starting solid foods, which fruit is ideal as a first food?",
    options: ["Pomegranate", "Kiwi", "Avocado", "Watermelon"],
    correct: 2,
    explanation: "Avocado's creamy texture and healthy fats make it an excellent first food for brain development in babies."
  },
  {
    question: "Which fruit may help prevent kidney stone formation?",
    options: ["Banana", "Orange", "Blueberry", "Mango"],
    correct: 1,
    explanation: "Citrate found in oranges may help prevent the formation of kidney stones."
  }
];

export const healthConditions = [
  "Heart Health", "Brain Health", "Digestion", "Immunity", "Skin Health",
  "Energy Boost", "Hydration", "Sleep Quality", "Vision", "Inflammation",
  "Blood Sugar", "Weight Management"
];

export const ageGroupLabels = {
  children: { label: "Children (0-12)", emoji: "👶", color: "bg-blue-100 text-blue-700 border-blue-200" },
  teens: { label: "Teens (13-19)", emoji: "🧑‍🎓", color: "bg-purple-100 text-purple-700 border-purple-200" },
  adults: { label: "Adults (20-59)", emoji: "🧑‍💼", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  seniors: { label: "Seniors (60+)", emoji: "👴", color: "bg-amber-100 text-amber-700 border-amber-200" }
};