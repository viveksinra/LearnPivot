const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeatSchema = new mongoose.Schema({
    changeType:{
        type: String,
    required: true,
    enum:[
      "floor","room","seat"
    ]
    },

  floor: {
    label: {
        type: String,
    },
    _id: {
      type: Schema.Types.ObjectId,
      ref: "Seat",
  },
  },
  room: {
    label: {
        type: String,
    },
    _id: {
      type: Schema.Types.ObjectId,
      ref: "Seat",
  },
  },
  seat: {
    label: {
        type: String,
    },
    _id: {
      type: Schema.Types.ObjectId,
      ref: "Seat",
  },
  },
    // Default for all
 communityId: {
  type: Schema.Types.ObjectId,
    required: true,
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

const Seat = mongoose.model('Seat', SeatSchema);

module.exports = Seat;
