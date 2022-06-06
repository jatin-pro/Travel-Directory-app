const mongoose = require("mongoose"); 

const Schema = mongoose.Schema; 

const PinSchema = new Schema({ 
    username : {
        type : String,
        required : true
     },
     title :  { 
           type : String,
           required : true
    },
    description : { 
     type : String,
     required : true
    },
    rating : { 
        type : Number,
        required : true,
        min : 0, 
        max : 5
    },
    long: {
        type: Number,
        required: true,
      },
      lat: {
        type: Number,
        required: true,
      },
},
{
    timestamps: true,
  }
);

const Pin = mongoose.model('Pin', PinSchema); 

module.exports =  Pin; 