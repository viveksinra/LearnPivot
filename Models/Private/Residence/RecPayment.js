const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecPaymentSchema = new Schema({
 
payerType: {
    label:{
        type: String,
    default: ""
},
    id:{
        type: String,
        default: ""
    }
},
payer: {
  label:{
    type: String,
      default: ""
    },
    
  relation:{
    type: String,
  default: ""
},
  _id:{
    type: Schema.Types.ObjectId,
    }

},
item: {
      label:{
        type: String,
        default: ""
    },
     _id:{
        type: Schema.Types.ObjectId,
    },
     category:{
        type: String,
        default: ""
    },
     price:{
        type: String,
        default: ""
    }   
    
},
description:{
  type: String,
  default: ""
},
startDate:{
    type: Date,
    required:true
},
endDate:{
    type: Date,
    default: ""
},
price:{
    type: String,
    required:true
},
taxPercent:{
    type: String,
    default:"0"
},
countedDays:{
    type:Number,
    default:0
},
isDone:{
  type: Boolean,
  default: false
},
recurring:{
    type: Boolean,
    required:true
},
discontinue:{
    type: Boolean,
    default: false
},
prospectId:{
  type: Schema.Types.ObjectId,
 ref: "myProspect",
},
  // Default for all
community: {
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

const RecPayment = mongoose.model("RecPayment", RecPaymentSchema);

module.exports = RecPayment;
