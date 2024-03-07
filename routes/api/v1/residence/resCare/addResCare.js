const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load ResCare Model
const ResCare = require("../../../../../Models/Private/Residence/ResCare");
const ProvideCare = require("../../../../../Models/Private/Residence/ProvideCare");

const {
  validateOnCreate,
  validateOnUpdate,
  validateOnProvideCare
} = require("../../../../../validation/residence/resCareValidation");

// @type    POST
// @route   /api/v1/residence/resCare/addResCare
// @desc    Create a new resCare
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateOnCreate,
  async (req, res) => {
    try {
      const resCareObj = await getResCareObj(req,"create");
      await new ResCare(resCareObj)
      .save();
      res.status(201).json({
        message: "Care Successfully added",
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
// @route   /api/v1/residence/resCare/resCareRequest/addResCare/:id
// @desc    Update a resCare by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updateResCare) {
  try {
    const resCare = await ResCare.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateResCare },
      { new: true }
    );
    if (!resCare) {
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
      const resCareObj = await getResCareObj(req,"update");

      updateMe(req, res, resCareObj);
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
// @route   /api/v1/resCare/addResCare/:id
// @desc    Delete a resCare by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const resCare = await ResCare.findByIdAndRemove(req.params.id);
      if (!resCare) {
        return res
          .status(404)
          .json({ variant: "error", message: "ResCare not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "ResCare deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

async function getResCareObj(req,type) {
  let newResCare = {  

  };
  if(type == "create"){
   
  } 


  newResCare.user=  req.user.id;

// Check and assign values for each parameter based on their type

  
  if (req.body.care) {

    if(req.body.care._id){
    newResCare.care = req.body.care._id        
    }
  }

  if (req.body.prn != undefined) {
    newResCare.prn = req.body.prn;
  }
  if (req.body.fullCare != undefined) {
    newResCare.fullCare = req.body.fullCare;
  }
  if (req.body.point) {
    newResCare.point = req.body.point;
  }
  if (req.body.discontinue != undefined) {
    newResCare.discontinue = req.body.discontinue;
  }
  
  if (req.body.frequency) {
    newResCare.frequency = req.body.frequency;
  }
  
  if (req.body.days) {
    newResCare.days = req.body.days;
  }
  
  if (req.body.timing) {
    newResCare.timing = req.body.timing;
  }
  if (req.body.manPower) {
    newResCare.manPower = req.body.manPower;
  }
  if (req.body.instruction) {
    newResCare.instruction = req.body.instruction;
  }
  if (req.body.remark) {
    newResCare.remark = req.body.remark;
  }
  if (req.body.prospectId) {
    newResCare.prospectId = req.body.prospectId;
  }


  newResCare.lastModified = new Date();
 
  return newResCare;
}

// @type    POST
// @route   /api/v1/residence/resCare/addResCare/save/passCare
// @desc    Create a new resCare
// @access  Public
router.post(
  "/save/passCare",
  passport.authenticate("jwt", { session: false }),
  validateOnProvideCare,
  async (req, res) => {
    try {
      const provideCareObj = {}
      provideCareObj.user = req.user.id
      provideCareObj.lastModified = new Date();

      if (req.body.rejectionReason) {
        provideCareObj.rejectionReason = req.body.rejectionReason
      }
    
      if (req.body._id) {
        provideCareObj.resCareId = req.body._id
      }
      if (req.body.prospectId) {
        provideCareObj.prospectId = req.body.prospectId
      }

    if (req.body.isProvided != undefined) {
      provideCareObj.isProvided = req.body.isProvided;
      }
    if (req.body.prn != undefined) {
      provideCareObj.prn = req.body.prn;
      }


      await new ProvideCare(provideCareObj)
      .save();
      res.status(201).json({
        message: "Care Successfully saved",
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
