const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  
    isPublished:{
    type: Boolean,
    default: false
  },
  dates:[],
 
  startTime:{
    type: String,
    required: true
  },
  endTime:{
    type: String,
    required: true
  },
  courseTitle:{
    type: String,
    required: true
  },
  courseLink:{
    type: String,
    required: true
  },
  shortDescription:{
    type: String,
    required: true
  },
  courseClass:{
     label: {
        type: String,
        required: true
      },
       id: {
        type: String,
        required: true
      }, 
  },
  courseType:{
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
  oneClassPrice:{
    type:Number,
    required:true
  },
  discountOnFullClass:{
    type:Number,
    default:0
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

module.exports = Course = mongoose.model("myCourse", CourseSchema);
