const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({

label:{
    type:String,
    required:true
},
link:{
    type:String,
    required:true
},
alias:{
    type:String,
    default:""
},
defaultGroup:{
    type:Boolean,
    default:false
},
under:{
    label:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    defaultGroup:{
        type:Boolean,
        required:true
    },
    _id:{
        type: Schema.Types.ObjectId,
        ref: "Group",
       required: true
    },
},
natureOfGroup:{
    label:{
        type:String,
    required:true,
    enum:["Assets","Expenses","Income","Liabilities"]
},
id:{
    type:String,
    required:true,
    enum:["assets","expenses","income","liabilities"]
}
},
remark:{
    type:String,
    default:""
},
showBanking:{
    type:Boolean,
},

showAddress:{
    type:Boolean,
},
isSubLedger:{
    type:Boolean,
},
canDelete:{
    type:Boolean,
},
// Net Debit Credit balance for reporting
netBalance:{
    type:Boolean,
},
forCalculation:{
    type:Boolean,
},
forPurInvoice:{
 label: {   type:String,
    default:"Not-Applicable",
    enum:["Not Applicable","Appropriate By Qty","Appropriate By Value"]},
 id: {   type:String,
    default:"notApplicable",
    enum:["notApplicable","appropriateByQty","appropriateByValue"]}
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

const Group = mongoose.model("Group",GroupSchema);
module.exports = Group;
