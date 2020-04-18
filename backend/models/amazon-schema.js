const mongoose = require('mongoose');

const amazonSchema = mongoose.Schema({
    image: [String],
    description: [String],
    price: [Number]
});

module.exports = mongoose.model('Amazon', amazonSchema);

