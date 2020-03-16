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

router.get("/food/", function (request, response) {
    console.log("REQUEST GET!!");
    console.log(request.params.id);
    let data = null;
    Food.find(function (err, mgResponse) {
        response.send(mgResponse);
    });
});

router.get("/food/:id", function (request, response) {
    console.log("REQUEST GET!!");
    console.log(request.params.id);
    let data = null;
    findFoodById(request.params.id, function (err, mgResponse) {
        if (mgResponse == undefined)
            response
            .status(404)
            .send({
                message: `id ${request.params.id} not found`
            });
        else response.send(mgResponse);
    });
});

router.delete("/food/:id", function (request, response) {
    console.log("REQUEST DELETE!!");
    console.log(request.params.id);
    let data = null;
    deleteFoodById(request.params.id, function (err, mgResponse) {
        if (mgResponse == undefined)
            response
            .status(404)
            .send({
                message: `id ${request.params.id} not found`
            });
        else response.send(mgResponse);
    });
});

module.exports = router;

function findFoodById(id, callback) {
    Food.findById(id, function (err, mgResponse) {
        console.log("GET COMPLETE");
        console.log(mgResponse);
        callback(err, mgResponse);

        // console.log(mgResponse[0].name);
    });
}

function deleteFoodById(id, callback) {
    Food.deleteOne(id, function (err, mgResponse) {
        console.log("DELETE COMPLETE");
        console.log(mgResponse);
        callback(err, mgResponse);
    });
}