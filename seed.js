const dotenv = require('dotenv');

dotenv.config();

const mongoose = require('mongoose');

const Menu = require('./models/menu')

const MONGO_URL = process.env.MONGO_URL || "mongodb://0.0.0.0:27017/Mess";

mongoose.connect(MONGO_URL)
    .then( () => {
        console.log("Database Connection Successful")
    })
    .catch( err=> {
        console.log("Error!");
        console.log(err);
    });


const seedProducts = [
    {
        day: "Monday",
        mealType: "Breakfast",
        dishes: ["Tea/Milk", "Bread", "Butter/Jam", "Banana", "Vada Sambhar"],
        rating: 4.5
    },
    {
        day: "Monday",
        mealType: "Lunch",
        dishes: ["Baigan Bharta", "Dal Makhani", "Plain Rice", "Roti", "Salad & Papap"],
        rating: 4.2
    },
    {
        day: "Monday",
        mealType: "Snacks",
        dishes: ["Pasta", "Coffee"],
        rating: 4.9
    },
    {
        day: "Monday",
        mealType: "Dinner",
        dishes: ["Malai Kofta", "Plain Rice", "Roti", "Salad", "Toor Dal"],
        rating: 4.3
    },
    {
        day: "Tuesday",
        mealType: "Breakfast",
        dishes: ["Tea/Milk", "Bread", "Butter/Jam", "Idli Sambhar", "Coconut chutney"],
        rating: 4.4
    },
    {
        day: "Tuesday",
        mealType: "Lunch",
        dishes: ["Rajma Masala", "Tadka Dal", "Boondi Raita", "Plain Rice", "Roti", "Salad & Papap"],
        rating: 4.2
    },
    {
        day: "Tuesday",
        mealType: "Snacks",
        dishes: ["Vada Pav/Dabeli", "Tea"],
        rating: 4.7
    },
    {
        day: "Tuesday",
        mealType: "Dinner",
        dishes: ["Namdev Rice", "Kadhi", "Salad"],
        rating: 4.3
    },
    {
        day: "Wednesday",
        mealType: "Breakfast",
        dishes: ["Tea/Milk", "Bread", "Butter/Jam", "Mix Parantha", "Curd & Chutney"],
        rating: 4.5
    },
    {
        day: "Wednesday",
        mealType: "Lunch",
        dishes: ["Kashmiri Aloo", "Mix Dal", "Biryani", "Roti", "Salad & Papap"],
        rating: 4.2
    },
    {
        day: "Wednesday",
        mealType: "Snacks",
        dishes: ["Bhel", "Aam Panna"],
        rating: 4.8
    },
    {
        day: "Wednesday",
        mealType: "Dinner",
        dishes: ["Kadhai Paneer", "Jeera Rice", "Besan Roti", "Salad"],
        rating: 4.3
    },
    {
        day: "Thursday",
        mealType: "Breakfast",
        dishes: ["Tea/Milk", "Bread", "Butter/Jam", "Uttapam & Sambhar", "Chutney & Sprouts"],
        rating: 4.5
    },
    {
        day: "Thursday",
        mealType: "Lunch",
        dishes: ["Aloo Gobhi/Aloo Shimla", "Moong Dal", "Jeera Rice", "Roti", "Salad & Papap"],
        rating: 4.2
    },
    {
        day: "Thursday",
        mealType: "Snacks",
        dishes: ["Veg Cutlet/Kachori", "Tea"],
        rating: 4.9
    },
    {
        day: "Thursday",
        mealType: "Dinner",
        dishes: ["Chole", "Lemon Rice", "Roti", "Salad", "Gulab Jamun"],
        rating: 4.3
    },
    {
        day: "Friday",
        mealType: "Breakfast",
        dishes: ["Tea/Milk", "Bread", "Butter/Jam", "Poha & Chana", "Sev"],
        rating: 4.5
    },
    {
        day: "Friday",
        mealType: "Lunch",
        dishes: ["Soyabean", "Toor Dal", "Plain Rice", "Roti & Chaas", "Salad & Papap"],
        rating: 4.2
    },
    {
        day: "Friday",
        mealType: "Snacks",
        dishes: ["Sabudana Vada/Samosa", "Tea"],
        rating: 4.9
    },
    {
        day: "Friday",
        mealType: "Dinner",
        dishes: ["Chana Masala", "Plain Rice", "Roti", "Salad", "Lauki Chana Dal"],
        rating: 4.3
    },
    {
        day: "Saturday",
        mealType: "Breakfast",
        dishes: ["Tea/Milk", "Bread", "Butter/Jam", "Aloo Parantha", "Curd & Chutney"],
        rating: 4.5
    },
    {
        day: "Saturday",
        mealType: "Lunch",
        dishes: ["Kadhi", "Aloo Jeera", "Plain Rice", "Roti", "Salad & Papap"],
        rating: 4.2
    },
    {
        day: "Saturday",
        mealType: "Snacks",
        dishes: ["Veg Puff", "Tea"],
        rating: 4.9
    },
    {
        day: "Saturday",
        mealType: "Dinner",
        dishes: ["Meethi Matar Malai", "Plain Rice", "Roti", "Salad", "Custard"],
        rating: 4.3
    },
    {
        day: "Sunday",
        mealType: "Breakfast",
        dishes: ["Tea/Milk", "Bread", "Butter/Jam", "Bournvita", "Namkeen Sevai"],
        rating: 4.5
    },
    {
        day: "Sunday",
        mealType: "Lunch",
        dishes: ["Mix Veg", "Dal Tadka", "Jeera Rice", "Roti & Curd", "Salad & Papap"],
        rating: 4.2
    },
    {
        day: "Sunday",
        mealType: "Snacks",
        dishes: ["Doughnut", "Coffee"],
        rating: 4.6
    },
    {
        day: "Sunday",
        mealType: "Dinner",
        dishes: ["Paneer Butter Masala", "Matar Rice", "Roti", "Salad"],
        rating: 4.3
    }
];

Menu.insertMany(seedProducts)
.then(res => {
    console.log(res);
})
.catch(err => {
    console.log(err);
})
