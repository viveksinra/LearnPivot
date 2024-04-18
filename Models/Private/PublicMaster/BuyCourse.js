const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BuyCourseSchema = new Schema({
  
 courseId:{
    type: Schema.Types.ObjectId,
    ref: "myCourse",
    required: true
 },
 selectedDates: [{
    type: String,
  }],
  amount:{
    type:Number,
    required:true
  },
 firstName: {
    type: String,
    default: ""
  },
 lastName: {
    type: String,
    default: ""
  },
 email: {
    type: String,
    default: ""
  },
 mobile: {
    type: String,
    default: ""
  },
 age: {
    type: String,
    default: ""
  },
 gender: {
    type: String,
    default: ""
  },
 address: {
    type: String,
    default: ""
  },
 marketing: {
    type: String,
    default: ""
  },
 status: {
    type: String,
    enum:["formFilled","paymentFailed","paymentCOmpleted"],
    default: "formFilled"
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

module.exports = BuyCourse = mongoose.model("myBuyCourse", BuyCourseSchema);
