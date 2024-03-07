const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LedgerSchema = new Schema({

  createDate:{
    type: Date,
    default: Date.now,
  },
  ledgerImage: {
    type: String,
    default: "",
  },
  voucher: {
    type: String,
    required:true,
  },
  ledger: {
    type: String,
    required:true,
  },
  group: {
    label: {
      type: String,
      required:true,
    },
    _id: {
      type: String,
      required:true,
    },
    link: {
      type: String,
      required:true,
    },
  },
  openingBal: {
    type: Number,
    default: 0,
  },
  isDr: {
    type: Boolean,
    default: false,
  },
  gender: {
    label: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    }
  },
  street: {
    type: String,
    default: ""
  },
  unit: {
    type: String,
    default: ""
  },
  mobile: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  zip: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  },
  state: {
    label: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    }
  },
  remark: {
    type: String,
    default: "",
  },
  url: {
    type: String,
    default: "",
  },
  bankName: {
    type: String,
    default: "",
  },
  holderName: {
    type: String,
    default: "",
  },
  accountNo: {
    type: String,
    default: "",
  },
  Aba: {
    type: String,
    default: "",
  },
  swift: {
    type: String,
    default: "",
  },
  branch: {
    type: String,
    default: "",
  },
  communityId: {
    type: String,
    default: "647654545893b52b5c8bbc61",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "myUser",
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "myCompany",
    default: "647644e05117173d58993882",
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Ledger = mongoose.model("Ledger", LedgerSchema);
module.exports = Ledger;
