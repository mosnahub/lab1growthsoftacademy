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

module.exports = router;