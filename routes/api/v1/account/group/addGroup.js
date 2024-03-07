const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Group Model
const Group = require("../../../../../Models/Private/Account/Group");
const {
  validateOnCreate,
  validateOnUpdate,
  validateOnDelete,
} = require("../../../../../validation/account/groupValidation");

// @type    POST
// @route   /api/v1/account/group/addGroup
// @desc    Create a new group
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateOnCreate,
  async (req, res) => {
    try {
      const groupObj = await getGroupObj(req,"create");
      await new Group(groupObj)
      .save();
      res.status(201).json({
        message: "Group Successfully added",
        variant: "success",
      });
    } catch (error) {
console.log(error)
      res
        .status(500)
        .json({ variant: "error", message: "Internal server error1" });
    }
  }
);



// @type    PUT
// @route   /api/v1/account/group/addGroup/:id
// @desc    Update a group by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updateGroup) {
  try {
    const group = await Group.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateGroup },
      { new: true }
    );
    if (!group) {
      return res
        .status(406)
        .json({ message: "Id not found", variant: "error" });
    }
    res
      .status(200)
      .json({ message: "Updated successfully!!", variant: "success" });
  } catch (error) {
console.log(error)
    res
      .status(500)
      .json({ variant: "error", message: "Internal server error" + error.message});
  }
}

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validateOnUpdate,
  async (req, res) => {
    try {
      const groupObj = await getGroupObj(req,"update");

      updateMe(req, res, groupObj);
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);


// @type    DELETE
// @route   /api/v1/account/group/addGroup/deleteOne/:id
// @desc    Delete a group by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  validateOnDelete,
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const group = await Group.findByIdAndRemove(req.params.id);
      if (!group) {
        return res
          .status(404)
          .json({ variant: "error", message: "Group not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "Group deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

async function getGroupObj(req, type) {
  let newGroup = {
    user: req.user.id,
    lastModified: new Date(),
  };

  // Check and assign values for each parameter based on their type
  if (req.body.label) {
    const label = req.body.label;
    newGroup.label = label;
    newGroup.link = label.toLowerCase().replace(/\s+/g, '');
  }

  if (req.body.alias) {
    newGroup.alias = req.body.alias;
  }
  if (req.body.remark) {
    newGroup.remark = req.body.remark;
  }

  if (req.body.under) {
    newGroup.under = {
      label: req.body.under.label,
      link: req.body.under.link,
      defaultGroup: req.body.under.defaultGroup,
      _id: req.body.under._id,
    };
  }
  newGroup.natureOfGroup = {};

  if (req.body.natureOfGroup) {

    if (req.body.natureOfGroup.label) {
      newGroup.natureOfGroup.label = req.body.natureOfGroup.label;
    }

    if (req.body.natureOfGroup.id) {
      newGroup.natureOfGroup.id = req.body.natureOfGroup.id;
    }
  }

  if (req.body.showBanking !== undefined) {
    newGroup.showBanking = req.body.showBanking;
  }
  if (req.body.showAddress !== undefined) {
    newGroup.showAddress = req.body.showAddress;
  }
  if (req.body.isSubLedger !== undefined) {
    newGroup.isSubLedger = req.body.isSubLedger;
  }
  if (req.body.canDelete !== undefined) {
    newGroup.canDelete = req.body.canDelete;
  }

  if (req.body.netBalance !== undefined) {
    newGroup.netBalance = req.body.netBalance;
  }
  if (req.body.forCalculation !== undefined) {
    newGroup.forCalculation = req.body.forCalculation;
  }

  newGroup.forPurInvoice = {};

  if (req.body.forPurInvoice) {

    if (req.body.forPurInvoice.label) {
      newGroup.forPurInvoice.label = req.body.forPurInvoice.label;
    }

    if (req.body.forPurInvoice.id) {
      newGroup.forPurInvoice.id = req.body.forPurInvoice.id;
    }
  }

  return newGroup;
}





module.exports = router;
