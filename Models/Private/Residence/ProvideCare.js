const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProvideCareSchema = new Schema({
  isProvided:{
    type:Boolean,
    required:true
  },
  rejectionReason:{
    type:String,
    default:""
  },
  prn:{
    type:Boolean,
    required:true
  },
 
  provideDate:{
    type: Date,
  },

  resCareId:{
    type: Schema.Types.ObjectId,
    ref: "ResCare",
    required: true
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

const ProvideCare = mongoose.model("ProvideCare", ProvideCareSchema);

module.exports = ProvideCare;
