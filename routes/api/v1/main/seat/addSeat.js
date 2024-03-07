const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Seat Model
const Seat = require("../../../../../Models/Private/Main/Seat");
const {
  validateOnCreate,
  generalValidation,
  validateOnUpdate,
  validateOnDelete,
} = require("../../../../../validation/main/seatValidation");

// @type    POST
// @route   /api/v1/main/seat/addSeat/save/:changeType
// @desc    Create a new seat
// @access  Public
router.post(
  "/save/:changeType",
  passport.authenticate("jwt", { session: false }),
  generalValidation,
  validateOnCreate,
  async (req, res) => {
    try {
      const seatObj = await getSeatObj(req,"create");
      console.log(seatObj);
      await new Seat(seatObj)
      .save();
      res.status(201).json({
        message: "Successfully Added",
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
// @route   /api/v1/enquiry/seat/seatRequest/addSeat/:id
// @desc    Update a seat by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updateSeat) {
  try {
    const seat = await Seat.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateSeat },
      { new: true }
    );
    if (!seat) {
      return res
        .status(406)
        .json({ message: "Id not found", variant: "error" });
    }
   return res
      .status(200)
      .json({ message: "Updated successfully!!", variant: "success" });
  } catch (error) {
console.log(error)
   return res
      .status(500)
      .json({ variant: "error", message: "Internal server error" + error.message});
  }
}

router.post(
  "/save/:changeType/:id",
  passport.authenticate("jwt", { session: false }),
  generalValidation,
  validateOnUpdate,
  async (req, res) => {
    try {
      const seatObj = await getSeatObj(req,"update");

      updateMe(req, res, seatObj);
    } catch (error) {
console.log(error)
      return res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);


// @type    DELETE
// @route   /api/v1/main/seat/addSeat/deleteOne/:id
// @desc    Delete a seat by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  validateOnDelete,
  async (req, res) => {
    try {
      const seat = await Seat.findByIdAndRemove(req.params.id);
      if (!seat) {
        return res        
          .json({ variant: "error", message: " not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: " deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

async function getSeatObj(req,type) {
  let changeType = req.params.changeType
  let newSeat = {  
  };
  if(type == "create"){
    newSeat.changeType = req.params.changeType  
    }
  
  newSeat.user=  req.user.id;
  newSeat.communityId = req.body.communityId;

// Check and assign values for each parameter based on their type

  
  if(changeType == "floor" || changeType == "room" || changeType == "seat")
  {
    if (req.body.floor) {
    newSeat.floor = {}
    if (req.body.floor.label) {
      newSeat.floor.label = req.body.floor.label;
    }
     if (req.body.floor._id) {
      newSeat.floor._id = req.body.floor._id;
 
    }
  }
  if(changeType == "room" || changeType == "seat")
  {if (req.body.room) {
    newSeat.room = {}
    if (req.body.room.label) {
      newSeat.room.label = req.body.room.label;      
    } 
     if (req.body.room._id) {
      newSeat.room._id = req.body.room._id;
 
    }
  }
  if(changeType == "seat")
 { if (req.body.seat) {
  newSeat.seat = {}
    if (req.body.seat.label) {
      newSeat.seat.label = req.body.seat.label;
   
    } 
     if (req.body.seat._id) {
      newSeat.seat._id = req.body.seat._id;
 
    }
  }}}}

  newSeat.lastModified = new Date();
 
  return newSeat;
}






module.exports = router;
