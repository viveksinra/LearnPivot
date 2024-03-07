const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmpLeaveSchema = new Schema({
  leaveFor: {
    type: Schema.Types.ObjectId,
    ref: "myUser",
    required: true
  },
  duration: {
    type: String,
    required:true,
    enum:["half", "full", "longer"]
  },
  from: {
    type: Date,
    require:true
  },
  to: {
    type: Date,
    require:true
  },
  shift: {
    type: String,
    default: "",
    enum: ["First Half", "Second Half","" ]
  },
 
  url: {
    type: String,
    default: ""
  },
 
  leaveType: {
    type: String,
    required: true,
    enum:["Sick Leave","Casual Leave","Paid Leave"]
  },
 
  reason: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    default: "Pending",
    enum:["Pending", "Approved","Rejected","Cancelled"]
  },
  approver:{
    type: Schema.Types.ObjectId,
    ref: "myUser",
  },
  comment: {
    type: String,
    default: "",
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

const EmpLeave = mongoose.model("EmpLeave", EmpLeaveSchema);

module.exports = EmpLeave;
