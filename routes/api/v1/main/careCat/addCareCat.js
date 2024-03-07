const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load CareCat Model
const CareCat = require("../../../../../Models/Private/Main/CareCat");
const {
  validateOnCreate,
  validateOnUpdate,
} = require("../../../../../validation/main/careCatValidation");

// @type    POST
// @route   /api/v1/main/careCat/addCareCat
// @desc    Create a new careCat
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateOnCreate,
  async (req, res) => {
    try {
      const careCatObj = await getCareCatObj(req,"create");
      await new CareCat(careCatObj)
      .save();
      res.status(201).json({
        message: "CareCat Successfully added",
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
// @route   /api/v1/main/careCat/careCatRequest/addCareCat/:id
// @desc    Update a careCat by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updateCareCat) {
  try {
    const careCat = await CareCat.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateCareCat },
      { new: true }
    );
console.log(updateCareCat)
    if (!careCat) {
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
      const careCatObj = await getCareCatObj(req,"update");

      updateMe(req, res, careCatObj);
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
// @route   /api/v1/careCat/addCareCat/:id
// @desc    Delete a careCat by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const careCat = await CareCat.findByIdAndRemove(req.params.id);
      if (!careCat) {
        return res
          .status(404)
          .json({ variant: "error", message: "CareCat not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "CareCat deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

async function getCareCatObj(req,type) {
  let newCareCat = {  

  };
  if(type == "create"){
   
  } 


  newCareCat.user=  req.user.id;

// Check and assign values for each parameter based on their type

  
  if (req.body.label) {
    let label = req.body.label;
    newCareCat.label = label;
    newCareCat.link = label.toLowerCase().replace(/\s+/g, '');

  }

  if (req.body.prn != undefined) {
    newCareCat.prn = req.body.prn;
  }
  if (req.body.category) {
    newCareCat.category = req.body.category;
  }
  if (req.body.image) {
    newCareCat.image = req.body.image;
  }
  if (req.body.instruction) {
    newCareCat.instruction = req.body.instruction;
  }
  if (req.body.manPower) {
    newCareCat.manPower = req.body.manPower;
  }
  if (req.body.point) {
    newCareCat.point = req.body.point;
  }
  newCareCat.lastModified = new Date();
 
  return newCareCat;
}




module.exports = router;
