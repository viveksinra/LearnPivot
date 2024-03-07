const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

// Load User Model
const User = require("../../../../../Models/User");
const {
  validateOnCreate,
  validateOnUpdate,
} = require("../../../../../validation/Employee/basicValidation");

const {
  verifyMongoId
} = require("../../../../../validation/verifyId");

// @type    POST
// @route   /api/v1/employee/basic/addEmployee
// @desc    Create a new user
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateOnCreate,
  async (req, res) => {
    try {
      const userObj = await getUserObj(req,"create");
      await new User(userObj)
      .save().then(data => {
        res.status(201).json({
          _id:data._id,
          message: "User Successfully added",
          variant: "success",
        });
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
// @route   /api/v1/enquiry/user/userRequest/addUser/:id
// @desc    Update a user by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updateUser) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateUser },
      { new: true }
    );
    if (!user) {
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
  verifyMongoId,
  passport.authenticate("jwt", { session: false }),  
  validateOnUpdate,
  async (req, res) => {
    try {
      const userObj = await getUserObj(req,"update");

      updateMe(req, res, userObj);
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
// @route   /api/v1/basic/addEmployee/:id
// @desc    Delete a user by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await User.findByIdAndRemove(req.params.id);
      if (!user) {
        return res
          .status(404)
          .json({ variant: "error", message: "User not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "User deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);



async function getUserObj(req, type) {
  let newUser = {
    designation: "employee"
  };

  if (type === "create") {
    // Handle "create" type if needed
  }

  if (req.body.userName) {
    newUser.userName = req.body.userName;
  } 
  if (req.body.userImage) {
    newUser.userImage = req.body.userImage;
  } 
  if (req.body.openingBalance) {
    newUser.openingBalance = req.body.openingBalance;
  } 
  if (req.body.important) {
    newUser.important = req.body.important;
  } 
  if (req.body.employeeScore) {
    newUser.employeeScore = req.body.employeeScore;
  } 
  if (req.body.docUrl) {
    newUser.docUrl = req.body.docUrl;
  } 
  if (req.body.message) {
    newUser.message = req.body.message;
  } 
  if (req.body.firstName) {
    newUser.firstName = req.body.firstName;
  } 
  if (req.body.lastName) {
    newUser.lastName = req.body.lastName;
  } 
  if (req.body.email) {
    newUser.email = req.body.email;
  } 
  if (req.body.mobile) {
    newUser.mobile = req.body.mobile;
  } 
  if (req.body.dateOfBirth) {
    newUser.dateOfBirth = req.body.dateOfBirth;
  } 
  if (req.body.applicationDate) {
    newUser.applicationDate = req.body.applicationDate;
  } 
  if (req.body.interviewDate) {
    newUser.interviewDate = req.body.interviewDate;
  } 
  if (req.body.physicalHiringDate) {
    newUser.physicalHiringDate = req.body.physicalHiringDate;
  } 
  if (req.body.gender) {
    newUser.gender = {};
  if (req.body.gender && req.body.gender.id) {
    newUser.gender.label = req.body.gender.label;
    newUser.gender.id = req.body.gender.id;
  } 
  } 
  if (req.body.jobRole) {
    newUser.jobRole = {};
  if (req.body.jobRole && req.body.jobRole.id) {
    newUser.jobRole.label = req.body.jobRole.label;
    newUser.jobRole.id = req.body.jobRole.id;
  } 
  } 
  if (req.body.employeeStage) {
    newUser.employeeStage = {};
  if (req.body.employeeStage && req.body.employeeStage.id) {
    newUser.employeeStage.label = req.body.employeeStage.label;
    newUser.employeeStage.id = req.body.employeeStage.id;
  } 
  } 
  if (req.body.streetAddress) {
    newUser.streetAddress = req.body.streetAddress;
  } 
  if (req.body.unit) {
    newUser.unit = req.body.unit;
  } 
  if (req.body.city) {
    newUser.city = req.body.city;
  } 
  if (req.body.state) {
    newUser.state = {};
  if (req.body.state && req.body.state.id) {
    newUser.state.label = req.body.state.label;
    newUser.state.id = req.body.state.id;
  } 
  } 
  if (req.body.zipCode) {
    newUser.zipCode = req.body.zipCode;
  } 

  newUser.community = [{
    communityName: req.body.communityName,
    _id: req.body.communityId
  }];

  return newUser;
}



function uniqueUserName(req,userName) {
  // Remove the domain part of the email
User.findOne({userName:userName})
.then(user => {
  if(user){
    if(req.params.id){
      User.findOne({_id:req.params.id})
      .then(data => {
        if(data.userName == userName){
          return false
      }else{
        return true
      }})
    }else{
      return false
    }
  }else{
    return false
  }
})
}

module.exports = router;
