# Restaurant-REST-API

| Technology    | Version       |       
| ------------- |:-------------:|
| npm           | 5.5.5         |
| Node.js       | 6.11.5        |
| MongoDB       | 3.4.9         |
| Redis         | 4.0.8         |

Name: Anuj Chaudhari (chaudhari.anuj93@gmail.com)

## How to Run the Project

1. Install NodeJs, MongoDB, Redis locally. [Tested with MacOSX 10.13.3]
2. Clone or download the repository.
3. Make sure mongodb and redis database are running locally.
4. Go to api folder. (package.json file is located here)
5. run following command, to install node modules locally
```javascript
    npm install
```
6. run following command to start node server which exposes restaurant REST api
```javascript
    npm start
```
7. run following command to run unit tests
```javascript
    npm test
```
## Database Schema ##

```javascript
Restaurants
{
    _id         : <restaurant_id>,
    name        : <restaurant_name>,
    description : <description>,
    cuisines    : [<cuisines-1>, <cuisines-2>, <cuisines-3>],
    contact_no  : <contact_no>,
    address     : <address>,
    menus       : [
                    { 
                        menu_id     : <menu_id>,
                        menu_type   : <breakfast, lunch, dinner, drinks>,
                        menu_items  : [
                                        {
                                            item_name   : <item_name>,
                                            description : <item_description>,
                                            price       : <price>,
                                            image_url   : <image_url>
                                        }
                                    ]
                    }

                ]
}
```


## REST API Endpoints

BaseURL : localhost:3000/zappos/api/v1 


| Endpoint                         | HTTP Verb | Functionality                                                               | Example                             | Success Response Code |
|----------------------------------|-----------|-------------------------------------------------------------------------|-------------------------------------|--------------------------------------------------------------------------------------------------------|
| /restaurants                                          | GET       | Get list of all the restaurants                                                   | localhost:3000/zappos/api/v1/restaurants                                        | 200 |
| /restaurants                                          | POST      | Add new restaurant entry in the database. Will return restaurant id as string.    | localhost:3000/zappos/api/v1/restaurants                                        | 201 |
| /restaurants/:RestaurantID                            | GET       | Get Restaurant information with the generated restaurant ID                       | localhost:3000/zappos/api/v1/restaurants/starbucks-san-jose                     | 200 |
| /restaurants/:RestaurantID                            | DELETE    | Delete Restaurant information with the generated restaurant ID                    | localhost:3000/zappos/api/v1/restaurants/starbucks-san-jose                     | 204 |
| /restaurants/:RestaurantID/menus                      | POST      | Add new menu to the restaurant with name. Will return menu id as string           | localhost:3000/zappos/api/v1/restaurants/starbucks-san-jose/menus               | 201 |
| /restaurants/:RestaurantID/menus                      | GET       | Get all menus of a restaurant as array                                            | localhost:3000/zappos/api/v1/restaurants/starbucks-san-jose/menus               | 200 |
| /restaurants/:RestaurantID/menus/:MenuID              | GET       | Get single menu of a restaurant with menuid.                                      | localhost:3000/zappos/api/v1/restaurants/starbucks-san-jose/menus/coffee        | 200 |
| /restaurants/:RestaurantID/menus/:MenuID              | DELETE    | Delete single menu of a restaurant with menuid.                                   | localhost:3000/zappos/api/v1/restaurants/starbucks-san-jose/menus/coffee        | 204 |
| /restaurants/:RestaurantID/menus/:MenuID/items        | POST      | Add new menu item to the menu. Will return menuitem id.                           | localhost:3000/zappos/api/v1/restaurants/starbucks-san-jose/menus/coffee/items  | 201 |
| /restaurants/:RestaurantID/menus/:MenuID/items        | GET       | Get all the menu items of the menu as array                                       | localhost:3000/zappos/api/v1/restaurants/starbucks-san-jose/menus/coffee/items  | 200 |
| /restaurants/:RestaurantID/menus/:MenuID/items/:ItemID| GET       | Get menuitem with menuid                                                          | localhost:3000/zappos/api/v1/restaurants/starbucks-san-jose/menus/coffee/items/5a797f026d887752a071a6ae | 200 |
| /restaurants/:RestaurantID/menus/:MenuID/items/:ItemID| DELETE    | Delete menuitem with menuid                                                       | localhost:3000/zappos/api/v1/restaurants/starbucks-san-jose/menus/coffee/items/5a797f026d887752a071a6ae | 204 |


## REST API Requests  ##

* Here is the sharable link for POSTMAN to use all of this request. Just Import Request from the given link to POSTMAN.
[https://www.getpostman.com/collections/0833962d50247e7f69a0](https://www.getpostman.com/collections/0833962d50247e7f69a0)

1. Adding new restaurant
```javascript
    POST http://localhost:3000/zappos/api/v1/restaurants
    201 Created
    {
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
    }

```
2. Get restaurant details
```javascript
    GET http://localhost:3000/zappos/api/v1/restaurants/<restaurant-id>

    GET http://localhost:3000/zappos/api/v1/restaurants/starbucks-san-jose
    200 OK
    {
        "description": "Starbucks is considered the main representative of second wave coffee, initially distinguishing itself from other coffee-serving venues in the US by taste, quality, and customer experience while popularizing darkly roasted coffee",
        "contact_no": "(408) 275-9368",
        "area": "San Jose",
        "cuisines": [
            "cafe"
        ],
        "menu": [
            {
                "menu_items": [
                    {
                        "decription": "",
                        "_id": "5a7c16156d887752a071b3a2",
                        "item_name": "Coffee Latte",
                        "price": 3
                    },
                    {
                        "decription": "",
                        "item_name": "Caffe Mocha",
                        "price": 4
                    }
                ],
                "_id": "5a7c16156d887752a071b3a0",
                "menu_type": "Coffee",
                "menu_id": "coffee"
            },
            {
                "menu_items": [
                    {
                        "decription": "",
                        "item_name": "Classic Chai Tea Latte",
                        "price": 2
                    }
                ],
                "menu_type": "Tea",
                "menu_id": "tea"
            }
        ],
        "locality_count": 0,
        "timestamp": "Tue Feb 06 2018 01:45:33 GMT-0800 (PST)",
        "id": "starbucks-san-jose",
        "name": "Starbucks",
    }


    
```
3. Delete restaurant 
```javascript
    DELETE http://localhost:3000/zappos/api/v1/restaurants/<restaurant-id>

    DELETE http://localhost:3000/zappos/api/v1/restaurants/starbucks-san-jose
    204 No Content

```


4. Add Menu
```javascript
    POST http://localhost:3000/zappos/api/v1/restaurants/<restaurant-id>/menus
    
    POST http://localhost:3000/zappos/api/v1/restaurants/starbucks-san-jose/menus
    201 Created
    {
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
    }

```
5. Get Menu
```javascript
    GET http://localhost:3000/zappos/api/v1/restaurants/<restaurant-id>/menus/<menu_type>

    GET http://localhost:3000/zappos/api/v1/restaurants/starbucks-san-jose/menus/coffee
    200 OK
    {
        "menu_items": [
            {
                "decription": "",
                "item_name": "Coffee Latte",
                "price": 3
            },
            {
                "decription": "",
                "item_name": "Caffe Mocha",
                "price": 4
            }
        ],
        "menu_type": "Coffee",
        "menu_id": "coffee"
    }

```
6. Delete Menu
```javascript
    DELETE http://localhost:3000/zappos/api/v1/restaurants/<restaurant-id>/menus/<menu_type>

    DELETE http://localhost:3000/zappos/api/v1/restaurants/starbucks-san-jose/menus/coffee
    204 No Content
```


7. Add MenuItem
```javascript
    POST http://localhost:3000/zappos/api/v1/restaurants/<restaurant-id>/menus/<menu_type>/items

    POST http://localhost:3000/zappos/api/v1/restaurants/starbucks-san-jose/menus/coffee/items
    201 Created
    {
        "item_name": "Hot Chocolate",
        "Description": "hot milk drink with chocolate cyrup",
        "price"	: 3
    }
    
```

8. Get MenuItem
```javascript
    GET http://localhost:3000/zappos/api/v1/restaurants/<restaurant-id>/menus/<menu_type>/items/<item_id>


    GET http://localhost:3000/zappos/api/v1/restaurants/starbucks-san-jose/menus/coffee/items/5a7c16156d887752a071b3a2
    200 OK
    {
        "decription": "",
        "_id": "5a7c16156d887752a071b3a2",
        "item_name": "Coffee Latte",
        "price": 3
    }

```

9. Delete MenuItem
```javascript
    DELETE http://localhost:3000/zappos/api/v1/restaurants/<restaurant-id>/menus/<menu_type>/items/<item_id>

    DELETE http://localhost:3000/zappos/api/v1/restaurants/starbucks-san-jose/menus/coffee/items/5a7c16156d887752a071b3a2
    204 No Content
```


## Redis for Caching ##

* To compare the request performace of redis and direct mongodb access, I have added approximatly 30,000 dummy data to the mongodb.

    Import dummy data to mongodb 

    ```
        cd db_backup
        mongorestore -d anuj_restaurant_api anuj_restaurant_api 
    ```

* So, that when randomly sending a GET request for the first time, I can measure response time and sending the same request again, it will hit the redis cache, I can see the response time improvement in the request.

* I have attached some screenshots displaying the response time for both the scenario.

    1. MongoDB Access   :   70ms
    2. Redis Cache      :   5ms

* MongoDB Hit
![Alt text](/images/mongodb_hit.png?raw=true "MongoDB hit")

* Redis Cache Hit
![Alt text](/images/redis_hit.png?raw=true "Redis hit")


## Unit Tests ##

Run following command to run unit tests
```javascript
    npm test
```

![Alt text](/images/unit_tests.png?raw=true "Redis hit")



## Handling millions of request at once ##

For handling these many request at once we can use multiple servers running the same service and we can put the mongodb database on different machine and not where the node server is currently running. 

For this we can use mongodb replicaset as well as load balancer on top of the node server.

If we use AWS services for handling scaling for this type of problem, Here is the server architecture diagram.

I have hosted this service on my AWS EC2 instance. 
Here is the link for the API server. [http://ec2-54-215-224-120.us-west-1.compute.amazonaws.com:3000](http://ec2-54-215-224-120.us-west-1.compute.amazonaws.com:3000/)

![Alt text](/images/architectural_diagram.png?raw=true "Architectural Diagram")

