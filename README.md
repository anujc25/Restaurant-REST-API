# Restaurant-REST-API

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
