# Restaurant-REST-API

| Technology    | Version       |       
| ------------- |:-------------:|
| npm           | 5.5.5         |
| Node.js       | 6.11.5        |
| MongoDB       | 3.4.9         |
| Redis         | 4.0.8         |

## How to Run the Project

1. Install NodeJs, MongoDB, Redis locally. [Tested with MacOSX 10.13.3]
2. Clone or download the repository.
3. Go to api folder. (package.json file is located here)
4. run following command, to install node modules locally
```javascript
    npm install
```
5. run following command to start node server which exposes restaurant REST api
```javascript
    npm start
```
6. run following command to run unit tests
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


## Functionalities ##

1. Adding new restaurant
```javascript
    POST http://localhost:3000/zappos/api/v1/restaurants
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
```
3. Delete restaurant 
```javascript
    DELETE http://localhost:3000/zappos/api/v1/restaurants/<restaurant-id>

    DELETE http://localhost:3000/zappos/api/v1/restaurants/starbucks-san-jose
```


4. Add Menu
```javascript
    POST http://localhost:3000/zappos/api/v1/restaurants/<restaurant-id>/menus
    
    POST http://localhost:3000/zappos/api/v1/restaurants/starbucks-san-jose/menus
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
```
6. Delete Menu
```javascript
    DELETE http://localhost:3000/zappos/api/v1/restaurants/<restaurant-id>/menus/<menu_type>

    DELETE http://localhost:3000/zappos/api/v1/restaurants/starbucks-san-jose/menus/coffee
```


7. Add MenuItem
```javascript
    POST http://localhost:3000/zappos/api/v1/restaurants/<restaurant-id>/menus/<menu_type>/items

    POST http://localhost:3000/zappos/api/v1/restaurants/starbucks-san-jose/menus/coffee/items
    {
        "item_name": "Hot Chocolate",
        "Description": "hot milk drink with chocolate cyrup",
        "price"	: 3
    }
    
```

8. Get MenuItem
```javascript
    GET http://localhost:3000/zappos/api/v1/restaurants/<restaurant-id>/menus/<menu_type>/items/<item_id>
```

9. Delete MenuItem
```javascript
    DELETE http://localhost:3000/zappos/api/v1/restaurants/<restaurant-id>/menus/<menu_type>/items/<item_id>
```
