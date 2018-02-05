var mongoose = require('mongoose');

var MenuItem = new mongoose.Schema({
    item_name   : {
        type        : String,
        required    : true
    },
    decription  : {
        type        : String,
        default     : ""
    },
    price       : {
        type        : Number,
        required    : true
    }
});

var Menu = new mongoose.Schema({
  menu_id: {
    type: String,
    required: true
  },
  menu_type: {
     type: String,
     required: true
  },
  menu_items: [MenuItem]}
);

var restaurantSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  contact_no: {
    type: String,
    default: ""
  },
  area: {
    type: String,
    default: ""
  },
  cuisines: {
    type: [String],
    default: []
  },
  menu: {
    type: [Menu]
  },
  locality_count: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: String,
    default: (new Date())
  }
},
{collection: 'restaurant'});

var restaurantModel = mongoose.model('restaurant', restaurantSchema);

/* global db */
module.exports = restaurantModel;