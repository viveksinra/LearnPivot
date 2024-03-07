const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  action: {
    type: String,
    enum: ['create', 'update', 'delete'],
    required: true,
  },
  collection: {
    type: String,
    required: true,
    enum:['residence']
  },
  residenceId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  changes: {
    type: [{
      field: String,
      oldValue: mongoose.Schema.Types.Mixed,
      newValue: mongoose.Schema.Types.Mixed,
    }],
  },
  note: {
    type: String,
    required: "",

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

const History = mongoose.model("History", HistorySchema);

module.exports = History;
