var express = require("express");
var router = express.Router();
let Food = require("../models/food_model.js");

// Add Data (POST)
router.post("/food/", function (request, response) {
    console.log(request.body);

    let food = new Food(); // Define 'food' is Food (foodSchema)
    console.log(food);
    food.name = request.body.foodName;

    console.log(parseFloat(request.body.calories));
    if (isNaN(parseFloat(request.body.calories))) // Validate calories is number
        response.status(500).send({
            message: "calories is not a number"
        });
    else {
        food.calories = request.body.calories;
        food.save(function (err, msgResponse) {
            if (err) response.status(500).send({
                message: err
            });
            else {
                console.log("Save Complete");
                response.send(msgResponse);
            }
        });
    }
});

module.exports = router;