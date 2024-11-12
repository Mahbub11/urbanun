import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const generateRandomPrice = () => {
  return Math.floor(Math.random() * 100000) + 50000; // Random price between 50,000 and 150,000
};

const generateRandomArea = () => {
  return Math.floor(Math.random() * 1000) + 500; // Random area between 500 and 1500 sqft
};

const generateBasicFeatures = () => [
  { featureName: 'Size', value: '250 m²', type: 0 },
  { featureName: 'Furnishing', value: 'Furnished', type: 0 },
  { featureName: 'Bedrooms', value: '4', type: 0 },
  { featureName: 'Ceiling Height', value: '3m', type: 0 },
  { featureName: 'Bathrooms', value: '3', type: 0 },
  { featureName: 'Construction Year', value: '2007', type: 0 },
  { featureName: 'Floor', value: 'Ground', type: 0 },
  { featureName: 'Renovation', value: '2017', type: 0 },
  { featureName: 'Additional space', value: 'Attic', type: 0 },
];

const generatePropertyUtilityFeatures = () => [
  { featureName: 'Heating', value: 'Natural gas', type: 1 },
  { featureName: 'Intercom', value: 'Yes', type: 1 },
  { featureName: 'Air Condition', value: 'Yes', type: 1 },
  { featureName: 'Window Type', value: 'Aluminum frame', type: 1 },
  { featureName: 'Fireplace', value: '-', type: 1 },
  { featureName: 'Cable TV', value: 'Yes', type: 1 },
  { featureName: 'Elevator', value: '-', type: 1 },
  { featureName: 'WiFi', value: 'Yes', type: 1 },
  { featureName: 'Ventilation', value: 'Yes', type: 1 },
];

const generateOutdoorFeatures = () => [
  { featureName: 'Garage', value: 'Yes', type: 2 },
  { featureName: 'Garden', value: '60m²', type: 2 },
  { featureName: 'Disabled Access', value: 'Ramp', type: 2 },
  { featureName: 'Swimming Pool', value: '3x5x1.5m', type: 2 },
  { featureName: 'Fence', value: 'Wood fence', type: 2 },
  { featureName: 'Security', value: '3 Cameras', type: 2 },
  { featureName: 'Pet Friendly', value: 'Yes', type: 2 },
  { featureName: 'Barbeque, Grill', value: 'Yes', type: 2 },
];

const generateRandomFloorPlans = () => {
  const floorPlans = [
    { floor_name: 'Ground Floor', intro: 'Spacious ground floor with large living area', imageUrl: 'https://example.com/ground-floor.jpg' },
    { floor_name: 'First Floor', intro: 'First floor with beautiful view', imageUrl: 'https://example.com/first-floor.jpg' },
    { floor_name: 'Second Floor', intro: 'Second floor with 3 bedrooms', imageUrl: 'https://example.com/second-floor.jpg' },
  ];
  return floorPlans.slice(0, Math.floor(Math.random() * floorPlans.length) + 1); // Pick a random number of floor plans
};

const generateRandomImages = () => {
  const images = [
    'https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/property-grid-img-4.jpg',
    'https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/property-grid-img-3.jpg',
    'https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/south-sun-house03.jpg',
    'https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/property-grid-img-5.jpg',
    'https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/main-home-property.jpg',
  ];
  return images.slice(0, Math.floor(Math.random() * images.length) + 1); // Pick a random number of images
};

const seed = async () => {
  for (let i = 1; i <= 10; i++) {
    const listing = await prisma.listing.create({
      data: {
        categoryId: 1, // Assuming the category with id=1 already exists
        userId: "1", // Assuming the user with id=1 already exists
        type:0,
        title: `Listing Title ${i}`,
        description: `Description for listing number ${i}. This is a placeholder description.`,
        price: generateRandomPrice(),
        address: `Address for listing ${i}, Some city, Some country`,
        bed_rooms: Math.floor(Math.random() * 4) + 2, // Random number of bedrooms (between 2 and 5)
        bath_rooms: Math.floor(Math.random() * 3) + 2, // Random number of bathrooms (between 2 and 4)
        area: generateRandomArea(),
        property_intro: `This is an introduction for property ${i}.`,
        created_at: new Date(),
        coordinates: { lat: 23.205531, lng: 87.189644 }, // Example coordinates
        images: {
          create: generateRandomImages().map((imageUrl, index) => ({
            imageUrl,
            order: index,
          })),
        },
        floor_plans: {
          create: generateRandomFloorPlans().map((floor) => ({
            imageUrl: floor.imageUrl,
            floor_name: floor.floor_name,
            intro: floor.intro,
            order: 0,
          })),
        },
        features: {
          create: [
            ...generateBasicFeatures(),
            ...generatePropertyUtilityFeatures(),
            ...generateOutdoorFeatures(),
          ].map((feature) => ({
            featureName: feature.featureName,
            value: feature.value,
            type: feature.type,
          })),
        },
      },
    });
    console.log(`Created listing: ${listing.title}`);
  }

  console.log("Seeding completed!");
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
