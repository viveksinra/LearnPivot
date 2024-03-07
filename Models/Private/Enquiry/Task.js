const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  employee: {
    _id:{
      type: Schema.Types.ObjectId,
    ref: "myUser",
    required:true
  }
  },
  task: {
    type: String,
    required:true
  },
  taskType: {
    label: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    }
  },
  taskStatus: {
    label: {
      type: String,
      default: "New",
      enum:["New","Completed"]
    },
    id: {
      type: String,
      default: "new",
      enum:["new","completed"]
    }
  },
  taskDueDate: {
    type: Date,
    default: ""
  },
  taskDueTime: {
    type: String,
    default: ""
  },
  dueNote: {
    type: String,
    default: ""
  },
  completionDate: {
    type: Date,
    default: ""
  },
  completionTime: {
    type: String,
    default: ""
  },
  completionNote: {
    type: String,
    default: ""
  },
  completedBy: {
    type: Schema.Types.ObjectId,
    ref: "myUser",
  },
  prospectId:{
    type: Schema.Types.ObjectId,
   ref: "myProspect",
  },
  type: {
    type: String,
    required:true,
    enum:["prospect","general"]
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
  date: {
    type: Date,
    default: Date.now
  }
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
