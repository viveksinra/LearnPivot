const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MyClassSchema = new Schema({
  
    isPublished:{
    type: Boolean,
    default: false
  },
  startDate:{
    type: Date,
    required: true
  },
 
  startTime:{
    type: String,
    required: true
  },
  endTime:{
    type: String,
    required: true
  },
  classTitle:{
    type: String,
    required: true
  },
  classLink:{
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

module.exports = MyClass = mongoose.model("myMyClass", MyClassSchema);
