const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load EmpLeave Model
const EmpLeave = require("../../../../../Models/Private/Employee/EmpLeave");
const {
  validateOnCreate,
  validateOnUpdate,
  validateOnDelete,
  validateOnCancelled,
  validateOnChangeStatus
} = require("../../../../../validation/Employee/empLeaveValidation");
const RandomStr = require("../../../../../Models/Private/Employee/RandomStr");

// @type    POST
// @route   /api/v1/employee/empLeave/addEmpLeave
// @desc    Create a new empLeave
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateOnCreate,
  async (req, res) => {
    try {
      const empLeaveObj = await getEmpLeaveObj(req,"create");
      await new EmpLeave(empLeaveObj)
      .save();
      res.status(201).json({
        message: "Leave applied Successfully.",
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
// @route   /api/v1/employee/empLeave/addEmpLeave/:id
// @desc    Update a empLeave by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updateEmpLeave) {
  try {
    const empLeave = await EmpLeave.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateEmpLeave },
      { new: true }
    );
    if (!empLeave) {
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
      const empLeaveObj = await getEmpLeaveObj(req,"update");
      updateMe(req, res, empLeaveObj);
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);
router.post(
  "/changeStatus/:id",
  passport.authenticate("jwt", { session: false }),
  validateOnChangeStatus,
  async (req, res) => {
    try {
      const empLeaveObj = {
        status:req.body.status,
        comment:req.body.comment,
        approver:req.user.id
      }
      updateMe(req, res, empLeaveObj);
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);
// /api/v1/employee/empLeave/addEmpLeave/cancel/:id
router.get(
  "/cancel/:id",
  passport.authenticate("jwt", { session: false }),
  validateOnCancelled,
  async (req, res) => {
    try {
      const empLeaveObj = {
        status:"Cancelled",
      }
      updateMe(req, res, empLeaveObj);
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
// @route   /api/v1/employee/empLeave/addEmpLeave/deleteOne/:id
// @desc    Delete a empLeave by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  validateOnDelete,
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const empLeave = await EmpLeave.findByIdAndRemove(req.params.id);
      if (!empLeave) {
        return res
          .status(404)
          .json({ variant: "error", message: "Leave not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "Leave deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

async function getEmpLeaveObj(req, type) {
  let newEmpLeave = {
    user: req.user.id,
    leaveFor: req.user.id,
    lastModified: new Date(),
  };
  if (req.body.leaveFor) {
    newEmpLeave.leaveFor = req.body.leaveFor;
  }
  // Check and assign values for each parameter based on their type
  if (req.body.duration) {
    newEmpLeave.duration = req.body.duration;
    if(req.body.duration == "half"){
      if (req.body.shift) {
        newEmpLeave.shift = req.body.shift;
      }
    }
  }
  if (req.body.to) {
    newEmpLeave.to = req.body.to;
  }
  if (req.body.from) {
    newEmpLeave.from = req.body.from;
    if(req.body.duration == "half" || req.body.duration == "full"){
    newEmpLeave.to = req.body.from;
    }
  }


  if (req.body.url) {
    newEmpLeave.url = req.body.url;
  }
  if (req.body.leaveType) {
    newEmpLeave.leaveType = req.body.leaveType;
  }
  if (req.body.reason) {
    newEmpLeave.reason = req.body.reason;
  }

  return newEmpLeave;
}

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

// @type    GET
// @route   /api/v1/employee/empLeave/addEmpLeave/random/generate
// @desc    Create a new empLeave
// @access  Private
router.get(
  "/random/generate",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const randomString = await generateRandomString(8);
      const empLeaveObj = {
        createUser:req.user.id,
        randomString:randomString,
        createDate: new Date()
      };
      await new RandomStr(empLeaveObj)
      .save();
      res.status(201).json({
        randomString:randomString,
        message: "New QR Generated",
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




module.exports = router;
