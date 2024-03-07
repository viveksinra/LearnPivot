const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  userImage: {
    type: String,
  },
  openingBalance: {
    type:Number,
  },
  important: {
    type: Boolean,
    default: false
  },
  employeeScore: {
    type: Number,
  },
  docUrl: {
    type: String,
  },
  message: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    default: ""
  },
  mobile: {
    type: String,
    default: ""
  },
  dateOfBirth: {
    type: Date,
  },
  applicationDate: {
    type: Date,
  },
  interviewDate: {
    type: Date,
  },
  physicalHiringDate: {
    type: Date,
  },
  gender: {
    label: {
      type: String,
    },
    id: {
      type: String,
    }
  },
  jobRole: {
    label: {
      type: String,
    },
    id: {
      type: String,
      enum: ["admin", "ceo", "buildingManager", "caregiver", "cook", "outdoorWorker", "indoorWorker", "doctor", "accountant", "housekeeper", "other" ]  
    }
  },
  employeeStage: {
    label: {
      type: String,
    },
    id: {
      type: String,
    }
  },
  streetAddress: {
    type: String,
  },
  unit: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    label: {
      type: String,
    },
    id: {
      type: String,
    }
  },
  zipCode: {
    type: String,
  },


  loginAllowed:{
    type:Boolean,
    default:false
  },
  value:{
    type:String,
    default:""
  },
  password:{
    type:String,
    default:""
  },
  // Add more fields as needed
  community: [{
    communityName: {
      type: String,
    },
    _id: {
      type: Schema.Types.ObjectId,
      ref: "myCommunity",
    },
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: "myUser",
    // required: true
  },
  company:{
    type: Schema.Types.ObjectId,
    ref: "myCompany",
    default: "647644e05117173d58993882"

  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("myUser", UserSchema);
