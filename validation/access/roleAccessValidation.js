const RoleAccess = require("../../Models/Access/RoleAccess");
const { labelToId } = require("../../utils/generalFun/StringFormat");

const validateOnCreate = async (req, res, next) => {
  const { role, permissions, user } = req.body;

  // Check if the required fields are present
  if (!role ) {
    return res.status(406).json({
      message: "Role information is required.",
      variant: "error",
    });
  }
let roleId = req.body.role;
  if (req.body.role) {    
      roleId = labelToId(req.body.role)  
  }

let rData = await RoleAccess.findOne({'role.id':roleId}).catch(err => {console.log(err)});
if (rData) {
  return res.status(406).json({
    message: "Duplicate role found",
    variant: "error",
  });
}
  if (!permissions || !permissions.length) {
    return res.status(406).json({
      message: "Permissions are required.",
      variant: "error",
    });
  }

  // Check if the role label and id are strings
  if (typeof role !== "string" ) {
    return res.status(406).json({
      message: "Role must be strings.",
      variant: "error",
    });
  }

  // Check if the permissions array contains valid objects
  for (let permission of permissions) {
    // Check if the resource is a string and is required
    if (!permission.resource || typeof permission.resource !== "string") {
      return res.status(406).json({
        message: "Resource must be a string and is required.",
        variant: "error",
      });
    }

    // Check if the actions array is non-empty and contains valid strings
    if (
      !permission.actions ||
      !permission.actions.length ||
      !permission.actions.every(
        (action) =>
          typeof action === "string" &&
          ['create', 'edit', 'delete', 'find', 'get'].includes(action)
      )
    ) {
      return res.status(406).json({
        message:
          "Actions must be a non-empty array of strings and must be one of 'read', 'write', 'delete', or 'update'.",
        variant: "error",
      });
    }

    // Check if the specialPolicies array contains valid objects
    if (permission.specialPolicies) {
      for (let policy of permission.specialPolicies) {
        // Check if the fieldname is a string and is required
        if (!policy.fieldname || typeof policy.fieldname !== "string") {
          return res.status(406).json({
            message: "Fieldname must be a string and is required.",
            variant: "error",
          });
        }

        // Check if the action is a boolean and defaults to false
        if (typeof policy.action !== "boolean") {
          policy.action = false;
        }
      }
    }
  }

  next();
};

const validateOnUpdate = async (req, res, next) => {
  // TODO: validate
  next();
};

module.exports = { validateOnCreate, validateOnUpdate };
