var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Restaurant = require('../models/restaurant');

router.route('/')

    // Get All Restaurants
    .get(function(req, res, next) {

        console.log("GET All Restaurants");

        Restaurant.find({}, function (err, result) {
            
              if (err) {
                  res.send('There was an error displaying the collection');
              } else{
                  res.send(result);
              }
        });
    })

    // Add New Restaurant
    .post(function(req, res, next) {

        var id = req.body.id;
        var name = req.body.name;
        var description = req.body.description || "";
        var contact_no = req.body.contact_no;
        var menu = req.body.menu;
        var cuisines = req.body.cuisines;
        var area =  req.body.area;
        var locality_count = 0;

        Restaurant.aggregate([
            { $match: { name: name , area: area} },
            {
                $group:
                  {
                    _id: "$name",
                    maxLocalityCount: { $max: "$locality_count" }
                  }
            }
        ], function (err, result) {
            
            if(!err && result.length > 0){
                console.log(result);
                locality_count = result[0]["maxLocalityCount"] + 1;
            }                
            
            var tempId = name;
            if(locality_count > 0)
                tempId += " " + locality_count;
            tempId += " " + area;
            id = tempId.replace(/\s+/g, '-'); 

            Restaurant.create({
              id : id,
              name : name,
              description : description,
              contact_no : contact_no,
              area : area,
              cuisines : cuisines,
              locality_count: locality_count,
              menu : menu
            }, function(err,result){
              if(err) {
                res.status(500).send("There was a problem adding info to DB");
              } else {                
                res.status(200).send(result);
              }
            });
            
        });
    });

    
router.route('/:restaurant_id')

    // Get Restaurant by ID
    .get(function(req, res, next) {

        console.log("GET Restaurant");

        Restaurant.findOne({id : req.params.restaurant_id}, function (err, result) {
            if (err) {
                res.status(404).send('There was an error displaying the collection');
            } else{
                res.status(200).send(result);
            }
        });
    })

    // Delete Restaurant by ID
    .delete(function(req, res, next) {

        console.log("DELETE Restaurant");

        Restaurant.remove({id : req.params.restaurant_id}, function (err, result) {
              if (err) {
                  res.status(404).send();
              } else{
                    if(result.n > 0)
                        res.status(204).send();
                    else
                        res.status(404).send();                
              }
        });
    });
    

module.exports = router;
