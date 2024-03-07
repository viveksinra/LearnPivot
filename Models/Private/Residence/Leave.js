const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeaveSchema = new Schema({
 
  leaveStartDate: {
    type: Date,
    required:true
  },
  leaveStartTime: {
    type: String,
    default:""
  },
  leaveEndDate: {
    type: Date,
    default:""
  },
  leaveEndTime: {
    type: String,
    default:""
  },
  leaveReason: {
   label: {
     type: String,
    default:""
}
  },
  leaveDestination: {
   label:{ type: String,
    default:""}
  },  
  leaveRemark: {
    type: String,
    default:""
  },
        
      
  // Default for all
  prospectId:{
    type: Schema.Types.ObjectId,
   ref: "myProspect",
   required:true
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

const Leave = mongoose.model("Leave", LeaveSchema);

module.exports = Leave;
