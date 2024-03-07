const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FilterTagSchema = new Schema({
  
FilterTagName:{
    type: String,
    required: true
  },
  buildingNumber:{
    type: String,
    default:""
  },
  licenseNumber:{
    type: String,
    required: true
  },
  FilterTagMobileNumber:{
    type: String,
    required: true
  },
  FilterTagAddress:{
    type: String,
    required: true
  },
  FilterTagCity:{
   city:{ 
    type: String,
    required: true
  },
  state:{
    type: String,
    required: true
  }
  },
  FilterTagState:{
    type: String,
    required: true
  },
  FilterTagZipCode:{
    type: String,
    required: true
  },
  licenseeName:{
    type: String,
    required: true
  },
  licenseeMobileNumber:{
    type: String,
    required: true
  },
  licenseeAddress:{
    type: String,
    required: true
  },
  licenseeCity:{
    city:{ 
      type: String,
      required: true
    },
    state:{
      type: String,
      required: true
    }
  },
  licenseeState:{
    type: String,
    required: true
  },
  licenseeZipCode:{
    type: String,
    required: true
  },  
  // comman data required in every Model
  user: {
    type: Schema.Types.ObjectId,
    ref: "myUser",
    required: true
  },
 
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = FilterTag = mongoose.model("myFilterTag", FilterTagSchema);
