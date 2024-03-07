const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleAccessSchema = new Schema({
    role: {
        label:{
          type: String,
        required:true,
      },
        id:{
          type: String,
        required:true,
      },
      },
permissions:[{
        resource: {
            type: String,
            required:true,
        },
        actions:[{
            type: String,
            required:true,
            enum:['create', 'edit', 'delete', 'find', 'get'],
        }],
        specialPolicies:[{
            fieldname: {
                type: String,
                required:true,
            },
            action: {
                type: Boolean,
                default:false,
            }
        }]
}],

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
  lastModified: {
    type: Date,
    default: Date.now
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const RoleAccess = mongoose.model("RoleAccess", RoleAccessSchema);

module.exports = RoleAccess;
