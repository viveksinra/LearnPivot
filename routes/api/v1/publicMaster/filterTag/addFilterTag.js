const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load FilterTag Model
const {
    validateRequireField,
  validateOnCreate,
  validateOnUpdate,
  validateOnDelete
} = require("../../../../../validation/publicMaster/courseValidation");
const FilterTag = require("../../../../../Models/Private/PublicMaster/FilterTag");

// @type    POST
// @route   /api/v1/publicMaster/filterTag/addFilterTag
// @desc    Create a new FilterTag
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  // validateRequireField,
  // validateOnCreate,
  async (req, res) => {
    console.log("vivek")
    try {
      const communityObj = await getCommunityObj(req,"create");
      await new FilterTag(communityObj)
      .save();
      res.status(201).json({
        message: "FilterTag Successfully added",
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
    const community = await FilterTag.findOneAndUpdate(
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
      const communityObj = await getCommunityObj(req,"update");

      updateMe(req, res, communityObj);
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
// @route   /api/v1/community/addCommunity/deleteOne/:id
// @desc    Delete a community by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  validateOnDelete,
  async (req, res) => {
    try {
      const community = await FilterTag.findByIdAndRemove(req.params.id);
      if (!community) {
        return res
          .status(404)
          .json({ variant: "error", message: "FilterTag not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "FilterTag deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

async function getCommunityObj(req,type) {
  let newCommunity = {  
user:  req.user.id,
  };

if (req.body.communityName) {
  newCommunity.communityName = req.body.communityName;
} 
if (req.body.buildingNumber) {
  newCommunity.buildingNumber = req.body.buildingNumber;
} 
if (req.body.licenseNumber) {
  newCommunity.licenseNumber = req.body.licenseNumber;
} 
if (req.body.communityMobileNumber) {
  newCommunity.communityMobileNumber = req.body.communityMobileNumber;
} 
if (req.body.communityAddress) {
  newCommunity.communityAddress = req.body.communityAddress;
} 
if (req.body.communityCity) {
  newCommunity.communityCity = {}
  if (req.body.communityCity.city) {
    newCommunity.communityCity.city = req.body.communityCity.city;
  } 
  if (req.body.communityCity.state) {
    newCommunity.communityCity.state = req.body.communityCity.state;
  } 
} 
if (req.body.communityState) {
  newCommunity.communityState = req.body.communityState;
} 
if (req.body.communityZipCode) {
  newCommunity.communityZipCode = req.body.communityZipCode;
} 
if (req.body.licenseeName) {
  newCommunity.licenseeName = req.body.licenseeName;
} 
if (req.body.licenseeMobileNumber) {
  newCommunity.licenseeMobileNumber = req.body.licenseeMobileNumber;
} 
if (req.body.licenseeAddress) {
  newCommunity.licenseeAddress = req.body.licenseeAddress;
} 
if (req.body.licenseeCity) {
  newCommunity.licenseeCity = {}
  if (req.body.licenseeCity.city) {
    newCommunity.licenseeCity.city = req.body.licenseeCity.city;
  } 
  if (req.body.licenseeCity.state) {
    newCommunity.licenseeCity.state = req.body.licenseeCity.state;
  } 
} 
if (req.body.licenseeState) {
  newCommunity.licenseeState = req.body.licenseeState;
} 
if (req.body.licenseeZipCode) {
  newCommunity.licenseeZipCode = req.body.licenseeZipCode;
} 
  return newCommunity;
}




module.exports = router;
