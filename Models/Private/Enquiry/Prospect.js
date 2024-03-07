const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProspectSchema = new Schema({
  inquiryDate: {
    type: Date,
    default:Date.now()
  },
  financialMoveInDate: {
    type: Date
  },
  physicalMoveInDate: {
    type: Date
  },
  salesAgent: {  
    label: {
        type: String,
      },
      _id: {
        type: Schema.Types.ObjectId,
      }    
  },
  prospectStage: {  
      label: {
        type: String,
        enum:["Casual Inquiry","Qualified","Cold","Warm","Hot","Waiting List","Lost","Needs Assessment"],
        default:"Casual Inquiry"
      },
      id: {
        type: String,
        enum:["casualInquiry","qualified","cold","warm","hot","waitingList","lost","needsAssessment"],
        default:"casualInquiry"
      }    
  },

  residenceStage:{
    type:String,
    enum:["prospect","residence","incoming","movedOut"],
    default:"prospect"
  },
  prospectScore: {
    type: Number,
    default:0
  
  },
  marketingStatus: {
    type: Boolean,
  },
  prospectSource: {    
      label: {
        type: String,
      },
      _id: {
        type: Schema.Types.ObjectId,
      }   
  },
  userImage: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  gender: {   
      label: {
        type: String,
        default: ""
      },
      id: {
        type: String,
        default: ""
      }    
  },
  phone: {
    type: String
  },
  ssNumber: {
    type: String,
    default: ""
  },
  email: {
    type: String
  },
  openingBal: {
    type: Number,
    default: 0,
  },
  message: {
    type: String
  },
  streetAddress: {
    type: String
  },
  unit: {
    type: String
  },
  home: {
    type: String
  },
  office: {
    type: String
  },
  city: {
    type: String
  },
  state: {
         label: {
        type: String,
        default: ""
      },
      id: {
        type: String,
        default: ""
      }    
  },
  zipCode: {
    type: String
  },
  important: {
    type: Boolean,
    default: false
  },
  password:{
    type: String,
    default: ""
  },
  value:{
    type: String,
    default: ""
  },
  isResidence: {
    type: Boolean,
    default: false
  },
  isMovedOut: {
    type: Boolean,
    default: false
  },
community: {
    communityName: {
     type: String,
 },
 buildingNumber: {
     type: String,
 },
 _id: {
  type: Schema.Types.ObjectId,
  ref: "myCommunity",
 }, 
},
   floor: {
     label: {
         type: String,
         default: ""
     },
        _id: {
         type: String,
         default: ""
     },
   },
   room: {
     label: {
         type: String,
         default: ""
     },
        _id: {
         type: String,
         default: ""
     },
   },
   seat: {
     label: {
         type: String,
         default: ""
     },
        _id: {
         type: String,
         default: ""
     },
   },
  // Default for all

  user: {
    type: Schema.Types.ObjectId,
    ref: "myUser",
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "myCompany",
    default: "647644e05117173d58993882"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Prospect = mongoose.model("myProspect", ProspectSchema);

module.exports = Prospect;
