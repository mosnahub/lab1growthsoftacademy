var express = require("express");
var router = express.Router();
let Shop = require("../models/shop_model.js");

// Add Data (POST)
router.post("/shop/", function (request, response) {
    console.log(request.body);
    let shop = new Shop(); // Define 'shop' is Shop (shopSchema)
    console.log(shop);
    shop.name = request.body.shopName;
    shop.address = request.body.address;

    console.log(parseInt(request.body.tel));
    if (isNaN(parseInt(request.body.tel))) // Validate tel is number
        response.status(500).send({
            message: "Telephone is not a number."
        });
    else {
        shop.tel = String(request.body.tel);
        shop.save(function (err, msgResponse) {
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

module.exports = router;

function findFoodById(id, callback) {
    Food.findById(id, function (err, mgResponse) {
        console.log("GET COMPLETE");
        console.log(mgResponse);
        callback(err, mgResponse);

        // console.log(mgResponse[0].name);
    });
}