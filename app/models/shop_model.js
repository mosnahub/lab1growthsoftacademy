// Name, Address, Telephone
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var typeObjectId = mongoose.Schema.Types.ObjectId;

// Database Structure
var shopSchema = new Schema({
    name: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    tel: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Shop", shopSchema);