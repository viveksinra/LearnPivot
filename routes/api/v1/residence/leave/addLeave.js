const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Leave Model
const Leave = require("../../../../../Models/Private/Residence/Leave");
const {
  validateOnCreate,
  validateOnUpdate,
} = require("../../../../../validation/residence/leaveValidation");

// @type    POST
// @route   /api/v1/residence/leave/addLeave
// @desc    Create a new leave
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateOnCreate,
  async (req, res) => {
    try {
      const leaveObj = await getLeaveObj(req,"create");
      await new Leave(leaveObj)
      .save();
      res.status(201).json({
        message: "Leave Successfully added",
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
// @route   /api/v1/enquiry/leave/leaveRequest/addLeave/:id
// @desc    Update a leave by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updateLeave) {
  try {
    const leave = await Leave.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateLeave },
      { new: true }
    );
console.log(updateLeave)
    if (!leave) {
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
      const leaveObj = await getLeaveObj(req,"update");

      updateMe(req, res, leaveObj);
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
// @route   /api/v1/residence/leave/addLeave/deleteOne:id
// @desc    Delete a leave by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const leave = await Leave.findByIdAndRemove(req.params.id);
      if (!leave) {
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

async function getLeaveObj(req,type) {
  let newLeave = {  

  };
  if(type == "create"){
   
  } 


  newLeave.user=  req.user.id;

// Check and assign values for each parameter based on their type

  
  if (req.body.leaveStartDate) {
    newLeave.leaveStartDate = req.body.leaveStartDate;
  }
  if (req.body.leaveStartTime) {
    newLeave.leaveStartTime = req.body.leaveStartTime;
  }
  if (req.body.leaveEndDate) {
    newLeave.leaveEndDate = req.body.leaveEndDate;
  }
  if (req.body.leaveEndTime) {
    newLeave.leaveEndTime = req.body.leaveEndTime;
  }
  if (req.body.leaveReason) {
    newLeave.leaveReason = {}
    {
        newLeave.leaveReason.label = req.body.leaveReason.label;
    }
  }
  if (req.body.leaveDestination) {
    newLeave.leaveDestination = {}
    {
        newLeave.leaveDestination.label = req.body.leaveDestination.label;
    }
  }
  if (req.body.leaveRemark) {
    newLeave.leaveRemark = req.body.leaveRemark;
  }

  if (req.body.prospectId) {
    newLeave.prospectId = req.body.prospectId;
  }
  newLeave.lastModified = new Date();
 
  return newLeave;
}




module.exports = router;
