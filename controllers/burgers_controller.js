const express = require('express');

const router = express.Router();

// Import the model to use its DB functions
const burger = require('../models/burgers.js');

// All Routes

// GET route to display ALL burgers
router.get("/", function(req, res) {
    burger.all(function(data) {
        let hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

// POST route to ADD a new burger to the list
router.post("/api/burgers", function(req, res) {
    burger.create([
        "burger_name", "devoured"
    ], [
        req.body.name, req.body.devoured
    ], function(result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});

// PUT route to UPDATE a burger status to devoured
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition from CONTROLLER", condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// DELETE route to remove a burger from the list
router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    burger.delete(condition, function(result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use.
module.exports = router;