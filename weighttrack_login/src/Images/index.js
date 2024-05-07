
// Define the foodImages object
export const foodImages = {
    'bread and baked goods': require('./breads and baked goods.jpeg').default,
    'condiments and spices': require('./condiments and spices.jpeg').default,
    'dairy': require('./dairy.jpeg').default,
    'fruit': require('./fruit.jpeg').default,
    'grain': require('./grain.jpeg').default,
    'meat': require('./meat.jpeg').default,
    'snacks': require('./snacks.jpeg').default,
    'sugars and sweets': require('./sugars and sweets.jpeg').default,
    'vegetable': require('./vegetable.jpeg').default,
};

// Preload images
Object.keys(foodImages).forEach(foodName => {
    const img = new Image();
    img.src = foodImages[foodName];
});

// Export the foodImages object
export default foodImages;


