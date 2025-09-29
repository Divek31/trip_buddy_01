// TripBuddy - Application Data

// Indian destinations data
const destinations = [
    {
        id: 1,
        name: "Goa",
    image: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&w=1000&q=80",
        description: "Beautiful beaches, Portuguese heritage, and vibrant nightlife",
        fullDescription: "Goa is India's smallest state but biggest tourist destination. Famous for its pristine beaches, Portuguese colonial architecture, and vibrant nightlife. Experience water sports, explore spice plantations, and enjoy the laid-back coastal lifestyle.",
        bestTime: "November - February",
        temperature: "28°C",
        distance: 580,
        activities: ["Beach Activities", "Water Sports", "Nightlife", "Heritage Tours"],
        tags: ["Beaches", "Party", "Historical & Heritage"],
        trending: true, 
        state: "Goa"
    },
    {
        id: 2,
        name: "Manali, Himachal Pradesh",
    image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&w=1000&q=80",
        description: "Snow-capped mountains and adventure sports paradise",
        fullDescription: "Manali is a high-altitude Himalayan resort town famous for its cool climate and snow-capped mountain views. Popular for adventure sports like paragliding, river rafting, and trekking. The nearby Rohtang Pass offers spectacular mountain scenery.",
        bestTime: "March - June, September - December",
        temperature: "15°C",
        distance: 540,
        activities: ["Trekking", "Paragliding", "River Rafting", "Mountain Views"],
        aiRecommended: true,
        tags: ["Hill Stations", "Adventure", "Nature & Wildlife"],
        state: "Himachal Pradesh"
    },
    {
        id: 3,
        name: "Udaipur, Rajasthan",
    image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&w=1000&q=80",
        description: "City of Lakes with magnificent palaces and royal heritage",
        fullDescription: "Udaipur, known as the City of Lakes, is famous for its magnificent palaces, lakes, and royal heritage. The City Palace complex and Lake Pichola offer breathtaking views. Experience royal hospitality and rich Rajasthani culture.",
        bestTime: "September - March",
        temperature: "25°C",
        distance: 420,
        activities: ["Palace Tours", "Boat Rides", "Cultural Shows", "Heritage Walks"],
        tags: ["Historical & Heritage", "Lakes & Rivers", "Royal"],
        trending: true,
        state: "Rajasthan"
    },
    {
        id: 4,
        name: "Kerala Backwaters",
    image: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&w=1000&q=80",
        description: "Serene backwaters, houseboats, and lush greenery",
        fullDescription: "Kerala's backwaters offer a unique experience of cruising through interconnected waterways on traditional houseboats. Enjoy the serene beauty of coconut groves, paddy fields, and local village life along the waterways.",
        bestTime: "September - March",
        temperature: "27°C",
        distance: 1200,
        activities: ["Houseboat Cruise", "Village Tours", "Ayurvedic Spa", "Bird Watching"],
        aiRecommended: true,
        tags: ["Lakes & Rivers", "Nature & Wildlife", "Wellness", "Villages"],
        state: "Kerala"
    },
    {
        id: 5,
        name: "Shimla, Himachal Pradesh",
    image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&w=1000&q=80",
        description: "Colonial hill station with toy train and scenic beauty",
        fullDescription: "Shimla, the former summer capital of British India, is famous for its colonial architecture, toy train, and scenic mountain views. The Mall Road and Ridge offer great shopping and dining experiences.",
        bestTime: "March - June, September - December",
        temperature: "18°C",
        distance: 350,
        activities: ["Toy Train Ride", "Mall Road Shopping", "Temple Visits", "Nature Walks"],
        trending: true,
        tags: ["Hill Stations", "Historical & Heritage"],
        state: "Himachal Pradesh"
    },
    {
        id: 6,
        name: "Rishikesh, Uttarakhand",
    image: "https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg?auto=compress&w=1000&q=80",
        description: "Yoga capital of the world and adventure sports hub",
        fullDescription: "Rishikesh is known as the Yoga Capital of the World and the Gateway to the Garhwal Himalayas. Famous for its ancient temples, yoga ashrams, and adventure sports like white-water rafting and bungee jumping.",
        bestTime: "February - May, September - November",
        temperature: "22°C",
        distance: 240,
        activities: ["Yoga Classes", "River Rafting", "Bungee Jumping", "Temple Visits"],
        aiRecommended: true,
        tags: ["Religious Places", "Adventure", "Wellness", "Lakes & Rivers"],
        state: "Uttarakhand"
    },
    {
        id: 7,
        name: "Agra, Uttar Pradesh",
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&w=1000&q=80",
        description: "Home to the magnificent Taj Mahal",
        fullDescription: "Agra is home to the iconic Taj Mahal, one of the Seven Wonders of the World. This Mughal city also houses the Agra Fort and Fatehpur Sikri, showcasing incredible Indo-Islamic architecture.",
        bestTime: "October - March",
        temperature: "23°C",
        distance: 200,
        activities: ["Taj Mahal Visit", "Agra Fort Tour", "Fatehpur Sikri", "Heritage Walks"],
        trending: true,
        tags: ["Historical & Heritage", "Urban Escapes"],
        state: "Uttar Pradesh"
    },
    {
        id: 8,
        name: "Jaipur, Rajasthan",
    image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&w=1000&q=80", // Jaipur - Hawa Mahal
        description: "Pink City with royal palaces and vibrant culture",
        fullDescription: "Jaipur, the Pink City, is famous for its royal palaces, forts, and vibrant markets. The Amber Fort, City Palace, and Hawa Mahal showcase the rich Rajputana architecture and culture.",
        bestTime: "October - March",
        temperature: "24°C",
        distance: 280,
        activities: ["Palace Tours", "Fort Visits", "Shopping", "Cultural Shows"],
        aiRecommended: true,
        tags: ["Historical & Heritage", "Urban Escapes", "Royal"],
        state: "Rajasthan"
    },
    {
        id: 9,
        name: "Leh-Ladakh",
    image: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&w=1000&q=80", // Leh-Ladakh - Mountains
        description: "High-altitude desert with stunning landscapes and monasteries",
        fullDescription: "Leh-Ladakh is a land of high passes, barren mountains, and pristine lakes. Famous for its breathtaking landscapes, Buddhist monasteries, and adventure activities like motorbiking and trekking.",
        bestTime: "June - September",
        temperature: "10°C",
        distance: 980,
        activities: ["Monastery Visits", "Mountain Biking", "Stargazing", "Pangong Lake"],
        trending: true,
        tags: ["Adventure", "Hill Stations", "Nature & Wildlife", "Road Trips"],
        state: "Ladakh"
    },
    {
        id: 10,
        name: "Varanasi, Uttar Pradesh",
    image: "https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg?auto=compress&w=1000&q=80", // Varanasi - Ganges Ghats
        description: "Spiritual capital of India with ancient ghats on the Ganges",
        fullDescription: "Varanasi, one of the world's oldest living cities, is a spiritual hub for Hindus. Its life revolves around the sacred River Ganges, with ghats for bathing, rituals, and evening Aarti ceremonies.",
        bestTime: "October - March",
        temperature: "22°C",
        distance: 820,
        activities: ["Ganga Aarti", "Boat Ride", "Temple Visits", "Old City Walk"],
        aiRecommended: true,
        tags: ["Religious Places", "Lakes & Rivers", "Food & Culture"],
        state: "Uttar Pradesh"
    },
    {
        id: 11,
        name: "Andaman & Nicobar Islands",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&w=1000&q=80", // Andaman - Beach
        description: "Pristine islands with white-sand beaches and coral reefs",
        fullDescription: "The Andaman and Nicobar Islands are an archipelago in the Bay of Bengal known for their palm-fringed, white-sand beaches, mangroves and tropical rainforests. Ideal for scuba diving, snorkeling, and exploring marine life.",
        bestTime: "October - May",
        temperature: "29°C",
        distance: 2500,
        activities: ["Scuba Diving", "Snorkeling", "Cellular Jail Visit", "Beach Hopping"],
        trending: true,
        tags: ["Islands", "Beaches", "Adventure", "Nature & Wildlife"],
        state: "Andaman & Nicobar"
    },
    {
        id: 12,
        name: "Jaisalmer, Rajasthan",
    image: "https://images.pexels.com/photos/325807/pexels-photo-325807.jpeg?auto=compress&w=1000&q=80", // Jaisalmer - Desert
        description: "The Golden City in the heart of the Thar Desert",
        fullDescription: "Jaisalmer, the 'Golden City', is a former medieval trading center in the heart of the Thar Desert. It's distinguished by its yellow sandstone architecture, the massive Jaisalmer Fort, and opportunities for desert safaris.",
        bestTime: "October - March",
        temperature: "20°C",
        distance: 770,
        activities: ["Desert Safari", "Camel Riding", "Fort Visit", "Cultural Evening"],
        tags: ["Deserts", "Historical & Heritage", "Adventure"],
        state: "Rajasthan"
    },
    {
        id: 13,
        name: "Srinagar, Jammu & Kashmir",
    image: "https://images.pexels.com/photos/417142/pexels-photo-417142.jpeg?auto=compress&w=1000&q=80", // Srinagar - Dal Lake
        description: "Paradise on Earth with Dal Lake and Mughal gardens",
        fullDescription: "Srinagar is famous for its serene Dal Lake, where houseboats and shikaras are a common sight. The city is adorned with beautiful Mughal gardens like Shalimar Bagh and Nishat Bagh, offering a glimpse into its royal past.",
        bestTime: "April - October",
        temperature: "19°C",
        distance: 840,
        activities: ["Shikara Ride", "Houseboat Stay", "Garden Visits", "Local Cuisine"],
        aiRecommended: true,
        tags: ["Hill Stations", "Lakes & Rivers", "Nature & Wildlife"],
        state: "Jammu & Kashmir"
    },
    {
        id: 14,
        name: "Mumbai, Maharashtra",
    image: "https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg?auto=compress&w=1000&q=80", // Mumbai - Gateway of India
        description: "The vibrant financial capital and home of Bollywood",
        fullDescription: "Mumbai, the city that never sleeps, is a bustling metropolis known for its vibrant street life, iconic landmarks like the Gateway of India, and as the heart of the Bollywood film industry.",
        bestTime: "October - March",
        temperature: "27°C",
        distance: 1400,
        activities: ["Marine Drive", "Gateway of India", "Street Food Tour", "Film City"],
        trending: true,
        tags: ["Urban Escapes", "Food & Culture", "Nightlife"],
        state: "Maharashtra"
    },
    {
        id: 15,
        name: "Darjeeling, West Bengal",
    image: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&w=1000&q=80",
        description: "Famous for its tea gardens and Himalayan toy train",
        fullDescription: "Darjeeling is a charming hill station renowned for its lush tea plantations and the historic Darjeeling Himalayan Railway (Toy Train). It offers stunning views of Kanchenjunga, the world's third-highest mountain.",
        bestTime: "April - June, October - December",
        temperature: "14°C",
        distance: 1500,
        activities: ["Tea Garden Visit", "Toy Train Ride", "Tiger Hill Sunrise", "Monastery Visits"],
        tags: ["Hill Stations", "Nature & Wildlife"],
        state: "West Bengal"
    },
    {
        id: 16,
        name: "Munnar, Kerala",
    image: "https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg?auto=compress&w=1000&q=80",
        description: "Rolling hills covered with emerald-green tea plantations",
        fullDescription: "Munnar is a breathtakingly beautiful hill station in Kerala, famous for its vast tea estates, exotic flora and fauna, and misty mountains. It's a perfect retreat for nature lovers and those seeking tranquility.",
        bestTime: "September - March",
        temperature: "20°C",
        distance: 2200,
        activities: ["Tea Plantations", "Eravikulam National Park", "Anamudi Peak", "Mattupetty Dam"],
        aiRecommended: true,
        tags: ["Hill Stations", "Nature & Wildlife", "Wellness"],
        state: "Kerala"
    },
    {
        id: 17,
        name: "Hampi, Karnataka",
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&w=1000&q=80",
        description: "UNESCO site with ruins of the Vijayanagara Empire",
        fullDescription: "Hampi is a UNESCO World Heritage Site featuring the captivating ruins of the ancient Vijayanagara kingdom. The surreal landscape is dotted with giant boulders, ancient temples, and royal enclosures.",
        bestTime: "October - February",
        temperature: "26°C",
        distance: 350,
        activities: ["Temple Ruins Exploration", "Coracle Ride", "Bouldering", "Virupaksha Temple"],
        tags: ["Historical & Heritage", "Religious Places", "Adventure"],
        state: "Karnataka"
    },
    {
        id: 18,
        name: "Spiti Valley, Himachal Pradesh",
    image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&w=1000&q=80",
        description: "A cold desert mountain valley for the adventurous",
        fullDescription: "Spiti Valley is a remote, high-altitude desert valley known for its rugged landscapes, ancient monasteries, and challenging roads. It's a haven for adventurers, trekkers, and those seeking solitude.",
        bestTime: "June - September",
        temperature: "12°C",
        distance: 730,
        activities: ["Road Trip", "Monastery Visits", "Trekking", "Stargazing"],
        trending: true,
        tags: ["Adventure", "Road Trips", "Hill Stations", "Nature & Wildlife"],
        state: "Himachal Pradesh"
    },
    {
        id: 19,
        name: "Meghalaya",
    image: "https://images.pexels.com/photos/417142/pexels-photo-417142.jpeg?auto=compress&w=1000&q=80",
        description: "The abode of clouds with living root bridges and waterfalls",
        fullDescription: "Meghalaya is a hilly state known for its abundant rainfall, subtropical forests, and unique living root bridges. Explore its stunning waterfalls, deep caves, and the cleanest village in Asia, Mawlynnong.",
        bestTime: "October - June",
        temperature: "21°C",
        distance: 2100,
        activities: ["Living Root Bridges", "Caving", "Waterfalls", "Shillong City Tour"],
        aiRecommended: true,
        tags: ["Nature & Wildlife", "Adventure", "Lakes & Rivers"],
        state: "Meghalaya"
    },
    {
        id: 20,
        name: "Pondicherry",
    image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&w=1000&q=80",
        description: "A charming coastal town with French colonial heritage",
        fullDescription: "Pondicherry, with its French Quarter, tree-lined streets, and colonial villas, offers a unique blend of Indian and French culture. Enjoy its serene beaches, spiritual ashrams, and delightful cafes.",
        bestTime: "October - March",
        temperature: "28°C",
        distance: 2400,
        activities: ["French Quarter Walk", "Auroville Visit", "Beach Strolls", "Cafe Hopping"],
        tags: ["Beaches", "Historical & Heritage", "Food & Culture", "Wellness"],
        state: "Puducherry"
    },
    {
        id: 21,
        name: "Coorg, Karnataka",
    image: "https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg?auto=compress&w=1000&q=80",
        description: "The 'Scotland of India' with coffee plantations and misty hills",
        fullDescription: "Coorg, or Kodagu, is a picturesque hill station known for its sprawling coffee plantations, misty landscapes, and lush green forests. It's an ideal destination for trekking, bird watching, and relaxation.",
        bestTime: "September - June",
        temperature: "20°C",
        distance: 265,
        activities: ["Coffee Plantations", "Abbey Falls", "Trekking", "Raja's Seat"],
        tags: ["Hill Stations", "Nature & Wildlife", "Food & Culture"],
        state: "Karnataka"
    },
    {
        id: 22,
        name: "Gokarna, Karnataka",
        image: "https://images.unsplash.com/photo-1621345487883-064433731353?auto=format&fit=crop&w=1000&q=80",
        description: "A laid-back beach town with a spiritual vibe",
        fullDescription: "Gokarna is a small temple town on the coast of Karnataka, known for its pristine beaches and laid-back atmosphere. It's often considered a more tranquil alternative to Goa.",
        bestTime: "October - March",
        temperature: "29°C",
        distance: 485,
        activities: ["Beach Trekking", "Temple Visits", "Yoga", "Relaxation"],
        tags: ["Beaches", "Religious Places", "Wellness"],
        state: "Karnataka"
    },
    {
        id: 23,
        name: "Pushkar, Rajasthan",
        image: "https://images.unsplash.com/photo-1583693109319-897d934f4345?auto=format&fit=crop&w=1000&q=80",
        description: "A holy town famous for its camel fair and Brahma temple",
        fullDescription: "Pushkar is a sacred town surrounding a holy lake, famous for its annual camel fair and one of the few Brahma temples in the world. It has a vibrant, bohemian atmosphere with bustling markets.",
        bestTime: "October - March",
        temperature: "23°C",
        distance: 415,
        activities: ["Camel Fair", "Brahma Temple", "Holy Lake Dip", "Market Shopping"],
        trending: true,
        tags: ["Religious Places", "Festivals", "Deserts", "Food & Culture"],
        state: "Rajasthan"
    },
    {
        id: 24,
        name: "Amritsar, Punjab",
        image: "https://images.unsplash.com/photo-1609920509757-5034743a1a9a?auto=format&fit=crop&w=1000&q=80",
        description: "Home to the Golden Temple and rich Punjabi culture",
        fullDescription: "Amritsar is a major cultural and spiritual center for Sikhs, home to the magnificent Golden Temple. The city is also known for its delicious Punjabi cuisine and the historic Jallianwala Bagh.",
        bestTime: "October - March",
        temperature: "18°C",
        distance: 450,
        activities: ["Golden Temple", "Wagah Border Ceremony", "Jallianwala Bagh", "Food Tour"],
        tags: ["Religious Places", "Historical & Heritage", "Food & Culture"],
        state: "Punjab"
    },
    {
        id: 25,
        name: "Rann of Kutch, Gujarat",
        image: "https://images.unsplash.com/photo-1617473129559-dabe13f09fa2?auto=format&fit=crop&w=1000&q=80",
        description: "A vast salt marsh that glows under the full moon",
        fullDescription: "The Great Rann of Kutch is a massive salt desert that transforms into a surreal white landscape. It's famous for the Rann Utsav, a cultural festival celebrating the region's art, music, and traditions.",
        bestTime: "November - February",
        temperature: "25°C",
        distance: 950,
        activities: ["Rann Utsav", "White Desert Visit", "Handicraft Shopping", "Cultural Events"],
        aiRecommended: true,
        tags: ["Deserts", "Festivals", "Nature & Wildlife"],
        state: "Gujarat"
    },
    {
        id: 26,
        name: "Ooty, Tamil Nadu",
        image: "https://images.unsplash.com/photo-1593641179138-c229a430a7a4?auto=format&fit=crop&w=1000&q=80",
        description: "Queen of Hill Stations with botanical gardens and lakes",
        fullDescription: "Ooty is a popular hill station in the Nilgiri Hills, known for its pleasant climate, botanical gardens, and scenic lakes. The Nilgiri Mountain Railway is a major attraction.",
        bestTime: "October - June",
        temperature: "17°C",
        distance: 270,
        activities: ["Botanical Gardens", "Ooty Lake", "Toy Train Ride", "Doddabetta Peak"],
        tags: ["Hill Stations", "Lakes & Rivers", "Nature & Wildlife"],
        state: "Tamil Nadu"
    },
    {
        id: 27,
        name: "Kolkata, West Bengal",
        image: "https://images.unsplash.com/photo-1596628851433-8c0f33635a0f?auto=format&fit=crop&w=1000&q=80",
        description: "The cultural capital of India with colonial-era architecture",
        fullDescription: "Kolkata, the 'City of Joy', is known for its grand colonial architecture, art galleries, and cultural festivals. It's a city with a rich literary and artistic heritage.",
        bestTime: "October - March",
        temperature: "26°C",
        distance: 1460,
        activities: ["Victoria Memorial", "Howrah Bridge", "Street Food", "Durga Puja"],
        tags: ["Urban Escapes", "Historical & Heritage", "Food & Culture", "Festivals"],
        state: "West Bengal"
    },
    {
        id: 28,
        name: "Khajuraho, Madhya Pradesh",
        image: "https://images.unsplash.com/photo-1580747457748-3ac75b9f45a4?auto=format&fit=crop&w=1000&q=80",
        description: "Famous for its stunning temples with intricate sculptures",
        fullDescription: "Khajuraho is a group of Hindu and Jain temples famous for their nagara-style architectural symbolism and their erotic sculptures. It's a UNESCO World Heritage Site.",
        bestTime: "October - March",
        temperature: "24°C",
        distance: 600,
        activities: ["Temple Tours", "Light and Sound Show", "Panna National Park", "Museum Visit"],
        tags: ["Historical & Heritage", "Religious Places"],
        state: "Madhya Pradesh"
    },
    {
        id: 29,
        name: "Majuli, Assam",
        image: "https://images.unsplash.com/photo-1626815495295-8535a243b59f?auto=format&fit=crop&w=1000&q=80",
        description: "The world's largest river island with unique Vaishnavite culture",
        fullDescription: "Majuli is a lush green, pollution-free river island in the Brahmaputra River. It is the hub of Neo-Vaishnavite culture, with many satras (monasteries) and a unique way of life.",
        bestTime: "October - March",
        temperature: "23°C",
        distance: 2400,
        activities: ["Satra Visits", "Bird Watching", "Village Walks", "Ferry Rides"],
        tags: ["Islands", "Villages", "Nature & Wildlife", "Lakes & Rivers"],
        state: "Assam"
    },
    {
        id: 30,
        name: "Ajanta & Ellora Caves, Maharashtra",
        image: "https://images.unsplash.com/photo-1609624239813-247833883860?auto=format&fit=crop&w=1000&q=80",
        description: "Ancient rock-cut caves with magnificent paintings and sculptures",
        fullDescription: "The Ajanta and Ellora Caves are UNESCO World Heritage sites featuring intricate rock-cut Buddhist, Hindu, and Jain monuments. They are masterpieces of religious art.",
        bestTime: "June - March",
        temperature: "25°C",
        distance: 350,
        activities: ["Cave Exploration", "Archaeological Survey", "Photography", "History Tour"],
        trending: true,
        tags: ["Historical & Heritage", "Caves"],
        state: "Maharashtra"
    },
];

// Indian car database with accurate mileage
const carDatabase = [
    { model: "Maruti Swift", mileage: 23.2 },
    { model: "Honda City", mileage: 17.8 },
    { model: "Hyundai i20", mileage: 20.4 },
    { model: "Tata Nexon", mileage: 17.4 },
    { model: "Mahindra XUV300", mileage: 16.8 },
    { model: "Toyota Innova Crysta", mileage: 11.2 },
    { model: "Maruti Ertiga", mileage: 19.0 },
    { model: "Honda Amaze", mileage: 21.3 },
    { model: "Hyundai Creta", mileage: 16.5 },
    { model: "Kia Seltos", mileage: 16.8 }
];

// Chatbot response patterns
const chatbotResponses = {
    greeting: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'namaste'],
    recommend: ['recommend', 'destination', 'place', 'where', 'suggest', 'travel', 'visit', 'goa', 'manali', 'kerala', 'rajasthan'],
    cost: ['cost', 'calculate', 'price', 'expense', 'budget', 'money', 'fare', 'cheap', 'expensive'],
    booking: ['save', 'book', 'booking', 'reserve', 'plan', 'summary'],
    help: ['help', 'support', 'guide', 'how', 'what', 'assist'],
    weather: ['weather', 'temperature', 'climate', 'rain', 'cold', 'hot'],
    transport: ['transport', 'car', 'bus', 'train', 'flight', 'fuel', 'petrol']
};

// Indian cities for weather simulation
const indianCities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'];

// Weather conditions with temperature ranges
const weatherConditions = [
    { condition: 'Sunny', icon: 'fas fa-sun', temp: [25, 35] },
    { condition: 'Partly Cloudy', icon: 'fas fa-cloud-sun', temp: [20, 30] },
    { condition: 'Cloudy', icon: 'fas fa-cloud', temp: [18, 28] },
    { condition: 'Light Rain', icon: 'fas fa-cloud-rain', temp: [15, 25] }
];
