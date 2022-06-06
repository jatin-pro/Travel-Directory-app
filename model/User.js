const mongoose  = require("mongoose"); 

const Schema = mongoose.Schema; 

const UserSchema = new Schema({ 
    username :  { 
           type : String,
           required : true,
           trim : true,
           minlength : 3,
           unique: true
    }, email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
      },
    password : { 
       type : String,
       required : true,
       trim : true,
       minlength : 5 
    },
},
{
    timestamps: true,
  }
);

const User = mongoose.model('User', UserSchema); 

module.exports = User; 