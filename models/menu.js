const mongoose = require('mongoose');

const menuSchema = {
    day: String,
    mealType: String,
    dishes: [String],
    rating: Number
}

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
