const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load BuyCourse Model
const {
    validateRequireField,
  validateOnCreate,
  validateOnUpdate,
  validateOnDelete
} = require("../../../../../validation/publicMaster/buyCourseValidation");
const BuyCourse = require("../../../../../Models/Private/PublicMaster/BuyCourse");
const Course = require("../../../../../Models/Private/PublicMaster/Course");

// @type    POST
// @route   /api/v1/publicMaster/buyCourse/addBuyCourse
// @desc    Create a new BuyCourse
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateRequireField,
  validateOnCreate,
  async (req, res) => {
    try {
      const buyCourseObj = await getBuyCourseObj(req,"create");
      const newBuyCourse =   await new BuyCourse(buyCourseObj)
      .save();
      res.status(201).json({
        message: "step 1 Successfully added",
        variant: "success",
        _id: newBuyCourse._id,
        totalAmount:newBuyCourse.amount 
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
    const community = await BuyCourse.findOneAndUpdate(
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
      const buyCourseObj = await getBuyCourseObj(req,"update");

      updateMe(req, res, buyCourseObj);
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
// @route   /api/v1/publicMaster/buyCourse/addBuyCourse/deleteOne/:id
// @desc    Delete a community by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  validateOnDelete,
  async (req, res) => {
    try {
      const buyCourse = await BuyCourse.findByIdAndRemove(req.params.id);
      if (!buyCourse) {
        return res
          .status(404)
          .json({ variant: "error", message: "BuyCourse not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "BuyCourse deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

async function getBuyCourseObj(req,type) {
  let newBuyCourse = {  
user:  req.user.id,
  };

if (req.body.courseId) {
  newBuyCourse.courseId = req.body.courseId;
} 
if (req.body.selectedDates) {
    if (req.body.selectedDates.length > 0) {
        newBuyCourse.selectedDates = req.body.selectedDates;
      } 
} 
newBuyCourse.amount = await calculateAmount(req.body.courseId,req.body.selectedDates);

if (req.body.firstName) {
  newBuyCourse.firstName = req.body.firstName;
} 
if (req.body.lastName) {
  newBuyCourse.lastName = req.body.lastName;
} 
if (req.body.email) {
  newBuyCourse.email = req.body.email;
} 
if (req.body.mobile) {
  newBuyCourse.mobile = req.body.mobile;
} 
if (req.body.age) {
  newBuyCourse.age = req.body.age;
} 
if (req.body.gender) {
  newBuyCourse.gender = req.body.gender;
} 
if (req.body.address) {
  newBuyCourse.address = req.body.address;
} 
if (req.body.marketing) {
  newBuyCourse.marketing = req.body.marketing;
} 

  return newBuyCourse;
}

const calculateAmount = async(courseId,selectedDates) => {

let couData = await Course.findOne({_id:courseId}).catch(err=> console.log(err))
let oneClassPrice = couData.oneClassPrice
let selectedDatesCount = selectedDates.length
let discountOnFullClass = couData.discountOnFullClass

let allDates = couData.dates
let totalClassCount = 0
for(let x = 0; x<allDates.length; x++){
  let mydate = allDates[x].length
  totalClassCount += mydate
}

let totalAmount = ((+oneClassPrice)*(+selectedDatesCount))
if(totalClassCount === selectedDatesCount){
 return (totalAmount - discountOnFullClass)
}else{
return totalAmount
}
  return 0
}


module.exports = router;
