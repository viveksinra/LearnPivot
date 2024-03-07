const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CareCatSchema = new Schema({

    label:{
      type:String,
      required: true,
    },
    link: {
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
        enum:["Adl","Iadl"]
    },
    image:{
        type: String,
        default: ""
    },
    instruction:{
        type: String,
        default: ""
    },
    prn:{
        type: Boolean,
        default:false
    },
    manPower:{
        type: Number,
        default: 1
    },
    point:{
        type: Number,
        default: 0
    },


    communityId: {
      type: String,
      default: "647654545893b52b5c8bbc61"
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "myUser",
      required: true
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "myCompany",
      default: "647644e05117173d58993882"
    },
    lastModified: {
      type: Date,
      default: Date.now
    },
    date: {
      type: Date,
      default: Date.now
    }
  });
  
  const CareCat = mongoose.model("CareCat", CareCatSchema);
  
  module.exports = CareCat;