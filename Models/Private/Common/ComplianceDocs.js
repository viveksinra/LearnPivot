const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComplianceDocsSchema = new Schema({

formNoLink:{
    type: String,
    required:true
  },
fileLink:{
    type: String,
    required:true
  },
signatureDate:{
    type: Date,
    default: Date.now
},
reminderDate:{
    type: Date,
    default: () => Date.now() + 365 * 24 * 60 * 60 * 1000 // one year in milliseconds
},
expirationDate:{
    type: Date,
    default: () => Date.now() + 365 * 24 * 60 * 60 * 1000 // one year in milliseconds
},
docType:{
    type: String,
    default: 'link',
    enum:['link','data']
},
// if docType is data, then will save backend data here
formData:{
    type: String,
    default: ''
},
residenceId:{
    type: Schema.Types.ObjectId,
    ref: "myProspect",
},
userId:{
  type: Schema.Types.ObjectId,
  ref: "myUser",
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

const ComplianceDocs = mongoose.model('ComplianceDocs', ComplianceDocsSchema);

module.exports = ComplianceDocs;