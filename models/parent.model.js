const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const parentSchema = new Schema({
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password:{
      type : String,
      required : true
    },
    phone_no: {
      type: String,
      required: true,
      unique: true,
    },
    homeAdress: {
      type: String,
      required: true,
    },
    password:{
      type : String,
      required : true
    },
    role :{
        type : String,
        required : true,
        lowercase : true
      }
  });
  
  // Methods
parentSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

parentSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id, email: this.email, role: this.role, fullname: this.fullname  },
    "secret-of-roy",
    {
      expiresIn: "1h"
    });
}


  var Parent = mongoose.model("Parent", parentSchema);
  module.exports = Parent;