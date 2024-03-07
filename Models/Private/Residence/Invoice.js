const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
 
  tranDate: {
    type: Date,
    required:true
  },
  voucher: {
    type: String,
    required:true,
  },
  ledger: {
    label:{
    type: String,
    required:true,
  },
  _id:{
    type: String,
    required:true,
  },
},
payer: {
  relation:{
    type: String,
    required:true,
  },
    label:{
    type: String,
    required:true,
  },
  _id:{
    type: String,
    required:true,
  },
  mobile:{
    type: String,
    required:true,
  },
  email:{
    type: String,
    required:true,
  },
  billingAddress:{
    type: String,
    required:true,
  },
  zipCode:{
    type: String,
    required:true,
  }, 
    city:{
    type: String,
    required:true,
  },
  state:{
    type: String,
    required:true,
  },
  
},

payment:[
{
  payDate:{
    type: String,
    required:true,
  },
  amount:{
    type: String,
    required:true,
  },
  mode:{
    _id:{
      type: String,
      required:true,
    },
    label:{
      type: String,
      required:true,
    },
    group:{
      type: String,
      required:true,
    }
  }
}
],
rows:[{
  item:{
    _id:{
  type: String,
  required:true,
},
label:{
  type: String,
  required:true,
},
category:{
  type: String,
  required:true,
},
issuedOn:{
  type: Date,
  required:true,
},
price:{
  type: String,
  required:true,
},
qty:{
  type: String,
  required:true,
},
amount:{
  type: String,
  required:true,
},
taxPercent:{
  type: String,
  required:true,
},
taxValue:{
  type: String,
  required:true,
},
},

}],
freight: {
  type: Number,
    default:0,
  },
  discount: {
    type: Number,
    default:0,
  },
  netAmount: {
    type: Number,
    default:0,
  },
  paid: {
    type: Number,
    default:0,
  },
  dues: {
    type: Number,
    default:0,
  },
  // Default for all
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

const Invoice = mongoose.model("Invoice", InvoiceSchema);

module.exports = Invoice;
