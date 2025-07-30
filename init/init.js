let listingItems = [
  {
    title: "Island Pearl Resort",
    description: "Private island retreat with crystal-clear waters and overwater bungalows.",
    image: {
      url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
      filename: "listingImage"
    },
    price: 1750,
    location: "Bora Bora",
    country: "French Polynesia",
    category: ["beach", "amazing views"]
  },
  {
    title: "Historic Palace Stay",
    description: "Stay in a heritage palace with antique decor and royal experiences.",
    image: {
      url: "https://images.unsplash.com/photo-1621891333819-00c206ec8994?auto=format&fit=crop&w=800&q=80",
      filename: "listingImage"
    },
    price: 1220,
    location: "Jaipur",
    country: "India",
    category: ["rooms"]
  },
  {
    title: "Countryside Charm Inn",
    description: "A charming rural escape surrounded by fields, perfect for writers and artists.",
    image: {
      url: "https://images.unsplash.com/photo-1561049933-c7762dbc757e?auto=format&fit=crop&w=800&q=80",
      filename: "listingImage"
    },
    price: 1080,
    location: "Cotswolds",
    country: "UK",
    category: ["country side", "farms"]
  },
  {
    title: "Ocean Breeze Resort",
    description: "A luxury seaside hotel with stunning ocean views and world-class amenities.",
    image: {
      url: "https://images.unsplash.com/photo-1552858725-a19e7fcd3ac4?auto=format&fit=crop&w=800&q=80",
      filename: "listingImage"
    },
    price: 1800,
    location: "Goa",
    country: "India",
    category: ["pools", "beach"]
  },
  {
    title: "Mountain Retreat Lodge",
    description: "Peaceful mountain getaway surrounded by nature. Ideal for relaxation and hiking.",
    image: {
      url: "https://images.unsplash.com/photo-1554647286-f365d7defc2d?auto=format&fit=crop&w=800&q=80",
      filename: "listingImage"
    },
    price: 1200,
    location: "Manali",
    country: "India",
    category: ["cabins", "mountains"]
  },
  {
    title: "Urban Elite Hotel",
    description: "Modern business hotel located in the heart of the city with executive facilities.",
    image: {
      url: "https://images.unsplash.com/photo-1601907560526-d679c8ed95ce?auto=format&fit=crop&w=800&q=80",
      filename: "listingImage"
    },
    price: 1500,
    location: "New York",
    country: "USA",
    category: ["amazing views", "rooms"]
  },
  {
    title: "Desert Mirage Inn",
    description: "An exotic desert hotel offering camel rides and traditional Arabian hospitality.",
    image: {
      url: "https://images.unsplash.com/photo-1564574685150-74a84d02d695?auto=format&fit=crop&w=800&q=80",
      filename: "listingImage"
    },
    price: 1950,
    location: "Dubai",
    country: "UAE",
    category: ["rooms", "amazing views"]
  },
  {
    title: "Alpine Snow Hotel",
    description: "Ski-in/ski-out access with breathtaking snowy views and cozy wooden interiors.",
    image: {
      url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
      filename: "listingImage"
    },
    price: 2000,
    location: "Zermatt",
    country: "Switzerland",
    category: ["cabins", "mountains"]
  },
  {
    title: "Island Pearl Resort",
    description: "Private island retreat with crystal-clear waters and overwater bungalows.",
    image: {
      url: "https://images.unsplash.com/photo-1561049933-c8fbef47b329?auto=format&fit=crop&w=800&q=80",
      filename: "listingImage"
    },
    price: 1750,
    location: "Bora Bora",
    country: "French Polynesia",
    category: ["amazing views", "beach"]
  },
  {
    title: "Historic Palace Stay",
    description: "Stay in a heritage palace with antique decor and royal experiences.",
    image: {
      url: "https://images.unsplash.com/photo-1522587750645-7e0e798b2b59?auto=format&fit=crop&w=800&q=80",
      filename: "listingImage"
    },
    price: 1220,
    location: "Jaipur",
    country: "India",
    category: ["rooms"]
  },
  {
    title: "Countryside Charm Inn",
    description: "A charming rural escape surrounded by fields, perfect for writers and artists.",
    image: {
      url: "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?auto=format&fit=crop&w=800&q=80",
      filename: "listingImage"
    },
    price: 1080,
    location: "Cotswolds",
    country: "UK",
    category: ["farms", "country side"]
  },
  {
    title: "Rainforest Eco Lodge",
    description: "Sustainable eco-lodge deep in the rainforest, with nature trails and organic food.",
    image: {
      url: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80",
      filename: "listingImage"
    },
    price: 1400,
    location: "Costa Rica",
    country: "Costa Rica",
    category: ["cabins", "amazing views"]
  },
  {
    title: "Skylight Capsule Hotel",
    description: "Futuristic capsule hotel with smart pods and city views from the rooftop.",
    image: {
      url: "https://images.unsplash.com/photo-1600435335786-d74d2bb6de37?auto=format&fit=crop&w=800&q=80",
      filename: "listingImage"
    },
    price: 1650,
    location: "Tokyo",
    country: "Japan",
    category: ["amazing views", "rooms"]
  },
  // 10 additional listings
  {
    title: "Lakeside Villa Retreat",
    description: "Serene lakeside property with private dock and stunning sunset views.",
    image: {
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      filename: "listingImage"
    },
    price: 1300,
    location: "Lake Tahoe",
    country: "USA",
    category: ["amazing views", "cabins"]
  },
  {
    title: "Tropical Paradise Resort",
    description: "All-inclusive beachfront resort with multiple pools and spa facilities.",
    image: {
      url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=800&q=80",
      filename: "listingImage"
    },
    price: 1900,
    location: "Maldives",
    country: "Maldives",
    category: ["beach", "pools", "amazing views"]
  },
  {
    title: "Wine Country Estate",
    description: "Elegant vineyard estate with wine tastings and gourmet dining experiences.",
    image: {
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      filename: "listingImage"
    },
    price: 1600,
    location: "Tuscany",
    country: "Italy",
    category: ["country side", "farms"]
  },
  {
    title: "Arctic Ice Hotel",
    description: "Unique ice hotel experience with aurora viewing and reindeer sledding.",
    image: {
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
      filename: "listingImage"
    },
    price: 1100,
    location: "Lapland",
    country: "Finland",
    category: ["amazing views", "rooms"]
  },
  {
    title: "Cliffside Sanctuary",
    description: "Dramatic cliffside retreat with infinity pool and panoramic ocean views.",
    image: {
      url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
      filename: "listingImage"
    },
    price: 1850,
    location: "Santorini",
    country: "Greece",
    category: ["pools", "amazing views", "beach"]
  },

];

  module.exports ={data :  listingItems};
 




 