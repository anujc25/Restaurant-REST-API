# Restaurant-REST-API

| Technology    | Version       |       
| ------------- |:-------------:|
| Node.js       | 8.9.1         |
| MongoDB       | 5.7           |
| Redis         | 3.0.6         |

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
```
2. Get restaurant details
```javascript
    GET http://localhost:3000/zappos/api/v1/restaurants/<restaurant-id>
```
3. Delete restaurant 
```javascript
    DELETE http://localhost:3000/zappos/api/v1/restaurants/<restaurant-id>
```


4. Add Menu
```javascript
    POST http://localhost:3000/zappos/api/v1/restaurants/<restaurant-id>/menus
```
5. Get Menu
```javascript
    GET http://localhost:3000/zappos/api/v1/restaurants/<restaurant-id>/menus/<menu_type>
```
6. Delete Menu
```javascript
    DELETE http://localhost:3000/zappos/api/v1/restaurants/<restaurant-id>/menus/<menu_type>
```


7. Add MenuItem
```javascript
    POST http://localhost:3000/zappos/api/v1/restaurants/<restaurant-id>/menus/<menu_type>/items
```

8. Get MenuItem
```javascript
    GET http://localhost:3000/zappos/api/v1/restaurants/<restaurant-id>/menus/<menu_type>/items/<item_id>
```

9. Delete MenuItem
```javascript
    DELETE http://localhost:3000/zappos/api/v1/restaurants/<restaurant-id>/menus/<menu_type>/items/<item_id>
```
