var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var typeObjectId = mongoose.Schema.Types.ObjectId;

// Database Structure
var foodSchema = new Schema({
    name: {
        type: String,
        default: null
    },
    calories: {
        type: Number,
        default: 0
    },
    addDate: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("Food", foodSchema);