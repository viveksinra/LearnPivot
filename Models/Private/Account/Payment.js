const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
ledger:{
   label: {
    type:String,
    required:true
   },
   _id:{
     type: Schema.Types.ObjectId,
    required: true
  },
  type:{
    type:String,
    required:true,
    enum:["prospect","employee","ledger"]
  }
},
tranDate:{
    type: Date,
    default: Date.now
},
voucher:{
    type:String,
    required:true
},
amount:{
    type:String,
    required:true
},
mode:{
  label: {
    type:String,
    required:true
   },
   _id:{
     type: Schema.Types.ObjectId,
    required: true
  },
},
remark:{
    type:String,
    default:""
},
reminderDate:{
    type: Date,
    default: Date.now
},
url:{
    type:String,
    default:""
},
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
})

const Payment = mongoose.model("Payment",PaymentSchema);
module.exports = Payment;
