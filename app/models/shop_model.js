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
        type: String,
        default: null
    }
});

module.exports = mongoose.model("Shop", shopSchema);