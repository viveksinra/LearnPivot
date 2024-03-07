const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load MockTest Model
const {
    validateRequireField,
  validateOnCreate,
  validateOnUpdate,
  validateOnDelete
} = require("../../../../../validation/publicMaster/mockTestValidation");
const MockTest = require("../../../../../Models/Private/PublicMaster/MockTest");

// @type    POST
// @route   /api/v1/publicMaster/mockTest/addMockTest
// @desc    Create a new MockTest
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateRequireField,
  validateOnCreate,
  async (req, res) => {
    try {
      const mockTestObj = await getMockTestObj(req,"create");
      await new MockTest(mockTestObj)
      .save();
      res.status(201).json({
        message: "Mock Test Successfully added",
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
    const community = await MockTest.findOneAndUpdate(
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
      const mockTestObj = await getMockTestObj(req,"update");

      updateMe(req, res, mockTestObj);
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
// @route   /api/v1/publicMaster/mockTest/addMockTest/deleteOne/:id
// @desc    Delete a community by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  validateOnDelete,
  async (req, res) => {
    try {
      const mockTest = await MockTest.findByIdAndRemove(req.params.id);
      if (!mockTest) {
        return res
          .status(404)
          .json({ variant: "error", message: "MockTest not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "MockTest deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

async function getMockTestObj(req,type) {
  let newMockTest = {  
user:  req.user.id,
  };

if (req.body.isPublished != null || req.body.isPublished != undefined) {
  newMockTest.isPublished = req.body.isPublished;
} 
if (req.body.startDate) {
  newMockTest.startDate = req.body.startDate;
} 
if (req.body.endDate) {
  newMockTest.endDate = req.body.endDate;
} 
if (req.body.mockTestTitle) {
  newMockTest.mockTestTitle = req.body.mockTestTitle;
} 
if (req.body.mockTestLink) {
  newMockTest.mockTestLink = req.body.mockTestLink;
} 
if (req.body.shortDescription) {
  newMockTest.shortDescription = req.body.shortDescription;
} 

if (req.body.testClass) {
  newMockTest.testClass = {}
  if (req.body.testClass.label) {
    newMockTest.testClass.label = req.body.testClass.label;
  } 
  if (req.body.testClass.id) {
    newMockTest.testClass.id = req.body.testClass.id;
  } 
} 
if (req.body.testType) {
  newMockTest.testType = {}
  if (req.body.testType.label) {
    newMockTest.testType.label = req.body.testType.label;
  } 
  if (req.body.testType.id) {
    newMockTest.testType.id = req.body.testType.id;
  } 
} 
if (req.body.duration) {
  newMockTest.duration = {}
  if (req.body.duration.label) {
    newMockTest.duration.label = req.body.duration.label;
  } 
  if (req.body.duration.id) {
    newMockTest.duration.id = req.body.duration.id;
  } 
} 
if (req.body.url) {
    newMockTest.url = req.body.url;
  } 
  if (req.body.fullDescription) {
    newMockTest.fullDescription = req.body.fullDescription;
  } 
  if (req.body.totalSeat) {
    newMockTest.totalSeat = req.body.totalSeat;
  } 
  if (req.body.filledSeat) {
    newMockTest.filledSeat = req.body.filledSeat;
  } 
  if (req.body.showRemaining != null || req.body.showRemaining != undefined ) {
    newMockTest.showRemaining = req.body.showRemaining;
  } 
  return newMockTest;
}




module.exports = router;
