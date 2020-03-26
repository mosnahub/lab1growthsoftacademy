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

// Find All Data (GET)
router.get("/food/", function (request, response) {
    console.log("REQUEST GET!!");
    console.log(request.params.id);
    let data = null;
    Food.find(function (err, mgResponse) {
        response.send(mgResponse);
    });
});


// Find Data by ID (GET)
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


// Delete Data by ID (DELETE)
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

// Update Data (PUT)
router.put("/food/:id", function (request, response) {
    console.log("REQUEST PUT!!");
    console.log(request.params.id);
    const data = null;
    putFoodById(request.params.id, function (err, mgResponse) {
        if (mgResponse == undefined)
            response
            .status(404)
            .send({
                message: `id ${request.params.id} not found`
            });
        else response.send(mgResponse);
    });
});


// Export
module.exports = router;

function findFoodById(id, callback) {
    Food.findById(id, function (err, mgResponse) {
        console.log("GET COMPLETE");
        console.log(mgResponse);
        callback(err, mgResponse);
    });
}

function deleteFoodById(id, callback) {
    Food.remove({ _id: id }, function (err, mgResponse) {
        console.log("DELETE COMPLETE");
        console.log(mgResponse);
        callback(err, mgResponse);
    });
}

function putFoodById(id, callback) {
    Food.findOneAndUpdate({ _id: id }, Food, function (err, mgResponse) {
        if (err) throw err;
        console.log("UPDATE COMPLETE");
        console.log(mgResponse);
        callback(err, mgResponse);
    });
}