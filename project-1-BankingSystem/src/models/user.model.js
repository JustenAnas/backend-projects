const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email address.'],
    unique: [true,"Email Already exists."],
    trim:true,
    lowercase: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter a valid email address.'
    ],
  },
  name:{
     type: String,
     required: [true, 'Name is required for creating an account'],
  },
  password:{
     type: String,
     required: [true, 'Password is required for creating an account'],
     minlength:[6,"password should contain more than 6 charchters"],
     select:false
  },
  systemUser:{
    type: Boolean,
    default: false,
    immutable: true,
    select: false
  }
},{
    timestamps:true // will save time and when we update the time 
});

//whenever you save a user or create an account this function will work first this means by that
userSchema.pre("save",async function(){
  if(!this.isModified("password")){
    return  
  }
    const hash = await bcrypt.hash(this.password,10)// makes pasword into hash
    this.password = hash 
    
    return  
})

// this compares the hash of password with the save paswword in database
userSchema.methods.comparePassword = async function (password){
    console.log(password,this.password);
    
    return await bcrypt.compare(password,this.password)
}

const userModel = mongoose.model("user",userSchema)

module.exports = userModel 