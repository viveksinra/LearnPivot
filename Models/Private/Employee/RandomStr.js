const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RandomStrSchema = new Schema({
  randomString: {
    type: String,
    required:true
  },
  scannedUser: {
    type: Schema.Types.ObjectId,
    ref: "myUser",
  },
 createUser: {
    type: Schema.Types.ObjectId,
    ref: "myUser",
    required: true
  },
scannedDate: {
    type: Date,
  },
  createDate: {
    type: Date,
    default: Date.now
  }
});

const RandomStr = mongoose.model("RandomStr", RandomStrSchema);

module.exports = RandomStr;
