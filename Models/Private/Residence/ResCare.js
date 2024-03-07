const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResCareSchema = new Schema({
 care:{
         type: Schema.Types.ObjectId,
          ref: "CareCat",
           required: true         
},
prn:{
    type: Boolean,
    default:false
},
fullCare:{
    type: Boolean,
    default:false
},
point:{
    type: Number,
    default: 0
},
discontinue:{
    type: Boolean,
    default:false
},
frequency: {
    type: String,
    default: "daily",
    enum:["daily","every"]
  },
  // days represent the number days they need to take the break
  days: {
    type: Number,
    default: 0
  },
timing: {
    type: [
      {
        time: String,
        qty: String
      }
    ],
    default: [{ time: "09:00", qty: "1" }]
  },
  manPower:{
    type: Number,
    default: 1
},
    instruction:{
        type: String,
        default: ""
    }, 
    remark:{
        type: String,
        default: ""
    },
 
    prospectId: {
        type: Schema.Types.ObjectId,
        ref: "myProspect",
        required: true
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
  
  const ResCare = 
  mongoose.model("ResCare", ResCareSchema);
  
  module.exports = ResCare;