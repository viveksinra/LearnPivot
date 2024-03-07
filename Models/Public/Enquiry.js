const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EnquirySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default:""
  },
  mobile: {
    type: String,
    default:""
  },
  address: {
    type: String,
    default:""
  },
  city: {
    type: String,
    default:""
  },
  state: {
    id:{
      type: String,
      default:""
    },
    label:{
      type: String,
      default:""
    }
   
  },
  zip: {
    type: String,
    default:""
  },
  enquiryFor: {
    type: String,
    default:""
  },
  marketing: {
    type: String,
    default:""
  },
  message: {
    type: String,
    default:""
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Enquiry = mongoose.model("Enquiry", EnquirySchema);
