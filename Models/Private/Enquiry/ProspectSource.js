const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProspectSourceSchema = new Schema({
    locationImg: {
        type: String,
        required: true
    },
    prospectSource: {
        type: String,
        required: true
    },
    contactPerson: {
        _id: {
            type: String,
        },
        label: {
            type: String,
        },
       
    },
    commission: String,
    remark: String,
    locationType: {
        label: String,
        id: String
    },
    street: String,
    unit: String,
    mobile: String,
    email: String,
    zip: String,
    city: String,
    state: {label:String,id:String},
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
      lastModified: {
        type: Date,
        default: Date.now
      },
      date: {
        type: Date,
        default: Date.now
      }
    
});

const ProspectSource = mongoose.model('ProspectSource', ProspectSourceSchema);

module.exports = ProspectSource;
