var supertest = require("supertest");
var should = require("should");
var mongoose = require('mongoose');


var server = supertest.agent("http://localhost:3000/zappos/api/v1");

var restaurant_id = "";


describe('Test Database', function() {
  //Before starting the test, create a database connection
  //Once a connection is established invoke done()
  it("Mongodb connection check",function (done) {
    mongoose.connect('mongodb://localhost/anuj_restaurant_api');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      done();
    });
  });

  //drop database and close connection
  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });

});


// Test Cases for Restaurant API
describe("Test Cases: Restaurant POST GET",function(){

  it("POST should store new restaurant info in database and respond 201 created",function(done){

    var restaurant_info = {
        "name" : "Starbucks",
        "description": "Starbucks is considered the main representative of second wave coffee, initially distinguishing itself from other coffee-serving venues in the US by taste, quality, and customer experience while popularizing darkly roasted coffee",
        "contact_no": "(408) 275-9368",
        "area": "San Jose",
        "cuisines" : ["cafe"],
        "menu": [{
                    "menu_type" :	"Coffee",
                    "menu_items":	[{
                                        "item_name": "Coffee Latte",
                                        "Description": "coffee with the best flovour of latte",
                                        "price"	: 3
                                    },
                                    {
                                        "item_name": "Caffe Mocha",
                                        "Description": "coffee with the best flovour of mocha",
                                        "price"	: 4
                                    }]
                },
                {
                    "menu_type" :	"Tea",
                    "menu_items":	[{
                                        "item_name": "Classic Chai Tea Latte",
                                        "Description": "Classic Chai Tea with the best flovour of latte",
                                        "price"	: 2
                                    }]
                }
            ]
    };

    server
    .post("/restaurants")
    .send(restaurant_info)
    .expect("Content-type",/json/)
    .expect(201) // THis is HTTP response
    .end(function(err,res){      
        restaurant_id = res.body.id;
        res.status.should.equal(201);
        res.body.should.be.a.Object;
        done();
    });
  });

  it("POST should return 404 bad request for invalid restaurant entry as name of restaurant not provided",function(done){
    
    var restaurant_info = {
        "description": "Starbucks is considered the main representative of second wave coffee, initially distinguishing itself from other coffee-serving venues in the US by taste, quality, and customer experience while popularizing darkly roasted coffee",
        "contact_no": "(408) 275-9368",
        "area": "San Jose",
        "cuisines" : ["cafe"],
        "menu": [{
                    "menu_type" :	"Coffee",
                    "menu_items":	[{
                                        "item_name": "Coffee Latte",
                                        "Description": "coffee with the best flovour of latte",
                                        "price"	: 3
                                    },
                                    {
                                        "item_name": "Caffe Mocha",
                                        "Description": "coffee with the best flovour of mocha",
                                        "price"	: 4
                                    }]
                },
                {
                    "menu_type" :	"Tea",
                    "menu_items":	[{
                                        "item_name": "Classic Chai Tea Latte",
                                        "Description": "Classic Chai Tea with the best flovour of latte",
                                        "price"	: 2
                                    }]
                }
            ]
    };

    server
    .post("/restaurants")
    .send(restaurant_info)
    .expect("Content-type",/json/)
    .expect(400) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(400);
      done();
    });
    
  });

  it("GET should return restaurant info as object",function(done){
    
    server
    .get("/restaurants/" + restaurant_id)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.should.be.a.Object;
      done();
    });
    
  });

  it("GET should return 404 Not Found, if requesting restaurant info with wrong restaurant id",function(done){
    
    server
    .get("/restaurants/san-jose")
    .expect("Content-type",/json/)
    .expect(404) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(404);
      done();
    });
    
  });
});


// Test Case for Menu API
describe("Test Cases: Menu POST GET",function(){

    it("POST should add new menu to restaurants menu list in database and respond 200 OK",function(done){
  
      var menu = {
            "menu_type" :	"Hot Drinks",
            "menu_items":	[{
                                "item_name": "Coffee Latte",
                                "Description": "coffee with the best flovour of latte",
                                "price"	: 3
                            },
                            {
                                "item_name": "Caffe Mocha",
                                "Description": "coffee with the best flovour of mocha",
                                "price"	: 4
                            }]
        };
  
      server
      .post("/restaurants/" + restaurant_id +"/menus")
      .send(menu)
      .expect("Content-type",/json/)
      .expect(200) // THis is HTTP response
      .end(function(err,res){      
        res.status.should.equal(200);
        res.body.should.be.a.Object;
        done();
      });
    });
  
    it("POST should return 404 bad request for invalid restaurant entry as name of restaurant not provided",function(done){
      
        var menu = {
            "menu_items":	[{
                                "item_name": "Coffee Latte",
                                "Description": "coffee with the best flovour of latte",
                                "price"	: 3
                            },
                            {
                                "item_name": "Caffe Mocha",
                                "Description": "coffee with the best flovour of mocha",
                                "price"	: 4
                            }]
        };
  
      server
      .post("/restaurants/" + restaurant_id + "/menus")
      .send(menu)
      .expect("Content-type",/json/)
      .expect(400) // THis is HTTP response
      .end(function(err,res){
        res.status.should.equal(400);
        done();
      });
      
    });
  
    it("GET should return menu as object",function(done){
      
      server
      .get("/restaurants/" + restaurant_id + "/menus/coffee")
      .expect("Content-type",/json/)
      .expect(200) // THis is HTTP response
      .end(function(err,res){
        res.status.should.equal(200);
        res.body.should.be.a.Object;
        done();
      });
      
    });
  
    it("GET should return 404 Not Found, if menu not found with that name in restaurant",function(done){
      
      server
      .get("/restaurants/" + restaurant_id + "/menus/drinks")
      .expect("Content-type",/json/)
      .expect(404) // THis is HTTP response
      .end(function(err,res){
        res.status.should.equal(404);
        done();
      });
      
    });
  
  });
  
  




// Test Case for Menu Item API
describe("Test Cases: Menu Items POST GET",function(){

    it("POST should add new menuitem to restaurants given menu in database and respond 200 OK",function(done){
  
      var menu_item = {
            "item_name": "Coffee Latte",
            "Description": "coffee with the best flovour of latte",
            "price"	: 3
        };
  
      server
      .post("/restaurants/" + restaurant_id + "/menus/coffee/items")
      .send(menu_item)
      .expect("Content-type",/json/)
      .expect(200) // THis is HTTP response
      .end(function(err,res){      
        res.status.should.equal(200);
        res.body.should.be.a.Object;
        done();
      });
    });

    it("POST should return 404 Not Found if Menu does not exists while adding item",function(done){
  
      var menu_item = {
            "item_name": "Coffee Latte",
            "Description": "coffee with the best flovour of latte",
            "price"	: 3
        };
  
      server
      .post("/restaurants/" + restaurant_id + "/menus/abc/items")
      .send(menu_item)
      .expect("Content-type",/json/)
      .expect(404) // THis is HTTP response
      .end(function(err,res){      
        res.status.should.equal(404);
        res.body.should.be.a.Object;
        done();
      });
    });

  
    it("GET should return all menu items for given menu",function(done){
      
      server
      .get("/restaurants/" + restaurant_id + "/menus/coffee/items")
      .expect("Content-type",/json/)
      .expect(200) // THis is HTTP response
      .end(function(err,res){
        res.status.should.equal(200);
        res.body.should.be.a.Array;
        done();
      });
      
    });

      
    it("GET should return 404 Not Found if menu does not exists while fetching items",function(done){
      
      server
      .get("/restaurants/" + restaurant_id + "/menus/coffee/items")
      .expect("Content-type",/json/)
      .expect(200) // THis is HTTP response
      .end(function(err,res){
        res.status.should.equal(200);
        res.body.should.be.a.Array;
        done();
      });
      
    });
  
  });








describe("Test Cases: DELETE Menu, Restaurant",function(){

    it("DELETE should return 200 OK, while deleting menu with MenuID",function(done){
      
        server
        .delete("/restaurants/" + restaurant_id + "/menus/hot-drinks")
        .expect("Content-type",/json/)
        .expect(200) // THis is HTTP response
        .end(function(err,res){
          res.status.should.equal(200);      
          done();
        });
        
      });

      it("DELETE should return 404 Not Found, while deleting menu with MenuID and if restaurant or menu does not exist for that id. ",function(done){
      
        server
        .delete("/restaurants/" + restaurant_id + "/menus/random-text-menu")
        .expect("Content-type",/json/)
        .expect(404) // THis is HTTP response
        .end(function(err,res){
          res.status.should.equal(404);      
          done();
        });
        
      });

      it("DELETE should return 200 OK, while deleting restaurant with it's id",function(done){        
        server
        .delete("/restaurants/" + restaurant_id)
        .expect("Content-type",/json/)
        .expect(200) // THis is HTTP response
        .end(function(err,res){
          res.status.should.equal(200);      
          done();
        });
        
      });

      it("DELETE should return 404 Not Found, while deleting restaurant, if restaurant does not exist for that id. ",function(done){        
        server
        .delete("/restaurants/random-restaurant-id")
        .expect("Content-type",/json/)
        .expect(404) // THis is HTTP response
        .end(function(err,res){
          res.status.should.equal(404);      
          done();
        });
        
      });

  });