const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MockTestSchema = new Schema({
  
    isPublished:{
    type: Boolean,
    default: false
  },
  startDate:{
    type: Date,
    required: true
  },
 
  endDate:{
    type: Date,
    required: true
  },

  mockTestTitle:{
    type: String,
    required: true
  },
  mockTestLink:{
    type: String,
    required: true
  },
  shortDescription:{
    type: String,
    required: true
  },
  testClass:{
     label: {
        type: String,
        required: true
      },
       id: {
        type: String,
        required: true
      }, 
  },
  testType:{
    label: {
        type: String,
        required: true
      },
       id: {
        type: String,
        required: true
      }, 
  },
  duration:{
    label: {
        type: String,
        required: true
      },
       id: {
        type: String,
        required: true
      }, 
  },
  url:{
    type: String,
    required: true
  },
  fullDescription:{
    type: String,
    default:""
  },
  totalSeat:{
    type: Number,
    default:""
  },
  filledSeat:{
    type: Number,
    default:""
  },
  showRemaining:{
    type: Boolean,
    default:false
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

module.exports = MockTest = mongoose.model("myMockTest", MockTestSchema);
