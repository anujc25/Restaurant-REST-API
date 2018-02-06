var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Restaurant = require('../models/restaurant');
var Redis = require('redis');
var RedisClient = Redis.createClient();

RedisClient.on('error', function (err) {
    console.log('error event - ' + RedisClient.host + ':' + RedisClient.port + ' - ' + err);
});

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

        for(var i=0; i<menu.length; i++){
            if(menu[i].menu_type === undefined){
                res.status(400).send();
                return;
            }
            menu[i].menu_id = menu[i].menu_type.replace(/\s+/g, '-').toLowerCase();
        }

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
            id = tempId.replace(/\s+/g, '-').toLowerCase();

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
                  console.log(err);
                res.status(400).send("Bad Request.");
              } else {                
                res.status(201).send(result);
              }
            });
            
        });
    });


router.route('/:restaurant_id')

    // Get Restaurant by ID
    .get(function(req, res, next) {

        console.log("GET Restaurant");
        var RestaurantId = req.params.restaurant_id.toLowerCase();

        var rKey = "Restaurant#" + RestaurantId;

        RedisClient.get(rKey, function(err, redisResponse) {
            // reply is null when the key is missing 
            console.log(redisResponse);
            if(!err && redisResponse){
                res.status(200).send(JSON.parse(redisResponse));
            }
            else{
                Restaurant.findOne({id : RestaurantId}, function (err, result) {
                    if (err) {
                        res.status(404).send('There was an error getting the restaurants');
                    } else if(result){
                        res.status(200).send(result);
                        RedisClient.set(rKey, JSON.stringify(result));
                    }
                    else{
                        res.status(404).send("Restaurant Not Found");
                    }
                });
            }
        });
    })

    // Delete Restaurant by ID
    .delete(function(req, res, next) {

        console.log("DELETE Restaurant");
        var RestaurantId = req.params.restaurant_id.toLowerCase();
        
        var rKey = "Restaurant#" + RestaurantId;
        RedisClient.del(rKey);

        Restaurant.remove({id : RestaurantId}, function (err, result) {
              if (err) {
                  res.status(404).send();
              } else{
                    if(result.n > 0)
                        res.status(200).send();
                    else
                        res.status(404).send();                
              }
        });
    });
    

router.route('/:restaurant_id/menus')

    // Get Restaurant by ID
    .get(function(req, res, next) {

        console.log("GET Restaurant All Menus");
        var RestaurantId = req.params.restaurant_id.toLowerCase();

        Restaurant.find({id : RestaurantId},{menu: 1}, function (err, result) {
            if (err) {
                res.status(404).send('There was an error getting the menus');
            } else{
                if(result.length > 0){
                    var Menus = result[0].menu;
                    res.status(200).send(Menus);
                }
                else
                    res.status(404).send("Not Found");
            }
        });
    })

    .post(function(req, res, next) {

        console.log("Add new menu");
        var RestaurantId = req.params.restaurant_id.toLowerCase();

        var menu = req.body;
        if(!menu.menu_type){
            res.status(400).send('Bad request.');
        }

        menu.menu_id = menu.menu_type.replace(/\s+/g, '-').toLowerCase();

        Restaurant.update({id : RestaurantId}, {$push: { menu : menu }}, function (err, result) {
            if (err) {
                res.status(400).send('There was an error getting the menus');
            } else{
                console.log(result);
                if(result.n > 0){                    
                    res.status(200).send();
                }
                else
                    res.status(404).send("Not Found");
            }
        });
    });

router.route('/:restaurant_id/menus/:menu_id')

    // Get Restaurant's Menu by ID
    .get(function(req, res, next) {

        console.log("GET Menu");
        var RestaurantId = req.params.restaurant_id.toLowerCase();
        var MenuId = req.params.menu_id.toLowerCase();

        var rKey = "Restaurant#" + RestaurantId + "#menu#" + MenuId;


        RedisClient.get(rKey, function(err, redisResponse) {
            // reply is null when the key is missing 
            console.log(redisResponse);
            if(!err && redisResponse){
                res.status(200).send(JSON.parse(redisResponse));
            }
            else{

                Restaurant.aggregate(
                    [
                        { $unwind : "$menu" },
                        { $project : { "menu" : 1, "_id" : 0 , id : 1} },
                        { $match: { id: RestaurantId, "menu.menu_id" : MenuId } },
                    ]
                    , function (err, result) {
                    if (err) {
                        res.status(404).send('There was an error getting the menus');
                    } else{
                        console.log(result);

                        if(result.length > 0){
                            var Menu = result[0].menu;
                            res.status(200).send(Menu);
                            RedisClient.set(rKey, JSON.stringify(Menu));
                        }
                        else
                            res.status(404).send("Not Found");
                    }
                });
                
            }
        });
    })

    // Delete Menu by ID
    .delete(function(req, res, next) {

        console.log("DELETE Menu");
        var RestaurantId = req.params.restaurant_id.toLowerCase();
        var MenuId = req.params.menu_id.toLowerCase();

        var rKey = "Restaurant#" + RestaurantId + "#menu#" + MenuId;
        RedisClient.del(rKey);

        Restaurant.update({id : RestaurantId}, {$pull : { menu : { menu_id: MenuId }}}, function (err, result) {
            console.log(result);
            if (err) {
                res.status(404).send();
            } else{
                if(result.nModified > 0)
                    res.status(200).send();
                else
                    res.status(404).send();                
              }
        });
    });

router.route('/:restaurant_id/menus/:menu_id/items')

    // Get Restaurant's Menu by ID
    .get(function(req, res, next) {

        console.log("GET Menu");
        var RestaurantId = req.params.restaurant_id.toLowerCase();
        var MenuId = req.params.menu_id.toLowerCase();

        Restaurant.aggregate(
            [
              { $unwind : "$menu" },
              { $project : { "menu" : 1, "_id" : 0 , id : 1} },
              { $match: { id: RestaurantId, "menu.menu_id" : MenuId } },
            ]
            , function (err, result) {
            if (err) {
                res.status(404).send('There was an error getting the menus');
            } else{
                if(result.length > 0){
                    var Menu = result[0].menu;
                    res.status(200).send(Menu.menu_items);
                }
                else
                    res.status(404).send("Not Found");
            }
        });
    })

    .post(function(req, res, next) {

        console.log("Add new menu item");
        var RestaurantId = req.params.restaurant_id.toLowerCase();
        var MenuId = req.params.menu_id.toLowerCase();

        var menuItem = req.body;

        Restaurant.update({id : RestaurantId, menu : { $elemMatch : { menu_id: MenuId } } }, {$push: { "menu.$.menu_items" : menuItem }}, function (err, result) {
            if (err) {
                console.log(err);
                res.status(404).send('There was an error getting the menus');
            } else{
                console.log(result);
                if(result.n > 0){                    
                    res.status(200).send();
                }
                else
                    res.status(404).send("Menu Not Found");
            }
        });
    });

router.route('/:restaurant_id/menus/:menu_id/items/:item_id')

    // Get Restaurant's Menu by ID
    .get(function(req, res, next) {

        console.log("GET Menu");
        var RestaurantId = req.params.restaurant_id.toLowerCase();
        var MenuId = req.params.menu_id.toLowerCase();
        var ItemId = req.params.item_id.toLowerCase();

        var rKey = "Restaurant#" + RestaurantId + "#menu#" + MenuId + "#item#" + ItemId;


        RedisClient.get(rKey, function(err, redisResponse) {
            // reply is null when the key is missing 
            console.log(redisResponse);
            if(!err && redisResponse){
                res.status(200).send(JSON.parse(redisResponse));
            }
            else{

                Restaurant.aggregate(
                    [
                        { $unwind : "$menu" },
                        { $project : { "menu" : 1, "_id" : 0, "id":1 } },
                        { $unwind : "$menu.menu_items" },
                        { $match: { id: RestaurantId, "menu.menu_id" : MenuId,  "menu.menu_items._id": mongoose.Types.ObjectId(ItemId)} }
                    ]
                    , function (err, result) {
                    if (err) {
                        res.status(404).send('There was an error getting the menus');
                    } else{
                        if(result.length > 0){
                            var Menu = result[0].menu;
                            res.status(200).send(Menu.menu_items);
                            RedisClient.set(rKey, JSON.stringify(Menu.menu_items));
                        }
                        else
                            res.status(404).send("Not Found");
                    }
                });
                
            }
        });
    })

    // Delete Menu by ID
    .delete(function(req, res, next) {

        console.log("DELETE Menu");
        var RestaurantId = req.params.restaurant_id.toLowerCase();
        var MenuId = req.params.menu_id.toLowerCase();
        var ItemId = req.params.item_id.toLowerCase();

        var rKey = "Restaurant#" + RestaurantId + "#menu#" + MenuId + "#item#" + ItemId;
        RedisClient.del(rKey);

        Restaurant.update({id : RestaurantId, "menu.menu_id": MenuId}, {$pull : { "menu.$.menu_items" : { item_id: ItemId }}}, function (err, result) {
            console.log(result);
            if (err) {
                console.log(err);
                res.status(404).send();
            } else{
                if(result.nModified > 0)
                    res.status(200).send();
                else
                    res.status(404).send();                
                }
        });
    });


module.exports = router;
