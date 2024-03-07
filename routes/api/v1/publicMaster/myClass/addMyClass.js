const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load MyClass Model
const {
    validateRequireField,
  validateOnCreate,
  validateOnUpdate,
  validateOnDelete
} = require("../../../../../validation/publicMaster/myClassValidation");
const MyClass = require("../../../../../Models/Private/PublicMaster/MyClass");

// @type    POST
// @route   /api/v1/publicMaster/myClass/addMyClass
// @desc    Create a new MyClass
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateRequireField,
  validateOnCreate,
  async (req, res) => {
    try {
      const myClassObj = await getMyClassObj(req,"create");
      await new MyClass(myClassObj)
      .save();
      res.status(201).json({
        message: "My Class Successfully added",
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
// @route   /api/v1/enquiry/community/communityRequest/addCommunity/:id
// @desc    Update a community by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updateCommunity) {
  try {
    const community = await MyClass.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateCommunity },
      { new: true }
    );
    if (!community) {
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
  validateRequireField,
  validateOnUpdate,
  async (req, res) => {
    try {
      const myClassObj = await getMyClassObj(req,"update");

      updateMe(req, res, myClassObj);
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
// @route   /api/v1/publicMaster/myClass/addMyClass/deleteOne/:id
// @desc    Delete a community by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  validateOnDelete,
  async (req, res) => {
    try {
      const myClass = await MyClass.findByIdAndRemove(req.params.id);
      if (!myClass) {
        return res
          .status(404)
          .json({ variant: "error", message: "MyClass not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "MyClass deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

async function getMyClassObj(req,type) {
  let newMyClass = {  
user:  req.user.id,
  };

if (req.body.isPublished != null || req.body.isPublished != undefined) {
  newMyClass.isPublished = req.body.isPublished;
} 
if (req.body.startDate) {
  newMyClass.startDate = req.body.startDate;
} 
if (req.body.startTime) {
  newMyClass.startTime = req.body.startTime;
} 
if (req.body.endTime) {
  newMyClass.endTime = req.body.endTime;
} 
if (req.body.classTitle) {
  newMyClass.classTitle = req.body.classTitle;
} 
if (req.body.classLink) {
  newMyClass.classLink = req.body.classLink;
} 
if (req.body.shortDescription) {
  newMyClass.shortDescription = req.body.shortDescription;
} 

if (req.body.courseClass) {
  newMyClass.courseClass = {}
  if (req.body.courseClass.label) {
    newMyClass.courseClass.label = req.body.courseClass.label;
  } 
  if (req.body.courseClass.id) {
    newMyClass.courseClass.id = req.body.courseClass.id;
  } 
} 
if (req.body.courseType) {
  newMyClass.courseType = {}
  if (req.body.courseType.label) {
    newMyClass.courseType.label = req.body.courseType.label;
  } 
  if (req.body.courseType.id) {
    newMyClass.courseType.id = req.body.courseType.id;
  } 
} 
if (req.body.duration) {
  newMyClass.duration = {}
  if (req.body.duration.label) {
    newMyClass.duration.label = req.body.duration.label;
  } 
  if (req.body.duration.id) {
    newMyClass.duration.id = req.body.duration.id;
  } 
} 
if (req.body.url) {
    newMyClass.url = req.body.url;
  } 
  if (req.body.fullDescription) {
    newMyClass.fullDescription = req.body.fullDescription;
  } 
  if (req.body.totalSeat) {
    newMyClass.totalSeat = req.body.totalSeat;
  } 
  if (req.body.filledSeat) {
    newMyClass.filledSeat = req.body.filledSeat;
  } 
  if (req.body.showRemaining != null || req.body.showRemaining != undefined ) {
    newMyClass.showRemaining = req.body.showRemaining;
  } 
  return newMyClass;
}




module.exports = router;
