const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Course Model
const {
    validateRequireField,
  validateOnCreate,
  validateOnUpdate,
  validateOnDelete
} = require("../../../../../validation/publicMaster/courseValidation");
const Course = require("../../../../../Models/Private/PublicMaster/Course");

// @type    POST
// @route   /api/v1/publicMaster/course/addCourse
// @desc    Create a new Course
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateRequireField,
  validateOnCreate,
  async (req, res) => {
    try {
      const courseObj = await getCourseObj(req,"create");
      await new Course(courseObj)
      .save();
      res.status(201).json({
        message: "My Course Successfully added",
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
    const community = await Course.findOneAndUpdate(
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
      const courseObj = await getCourseObj(req,"update");

      updateMe(req, res, courseObj);
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
// @route   /api/v1/publicMaster/course/addCourse/deleteOne/:id
// @desc    Delete a community by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  validateOnDelete,
  async (req, res) => {
    try {
      const course = await Course.findByIdAndRemove(req.params.id);
      if (!course) {
        return res
          .status(404)
          .json({ variant: "error", message: "Course not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "Course deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

async function getCourseObj(req,type) {
  let newCourse = {  
user:  req.user.id,
  };

if (req.body.isPublished != null || req.body.isPublished != undefined) {
  newCourse.isPublished = req.body.isPublished;
} 
if (req.body.dates?.length > 0) {
  newCourse.dates = req.body.dates;
} 
if (req.body.startTime) {
  newCourse.startTime = req.body.startTime;
} 
if (req.body.endTime) {
  newCourse.endTime = req.body.endTime;
} 
if (req.body.courseTitle) {
  newCourse.courseTitle = req.body.courseTitle;
} 
if (req.body.courseLink) {
  newCourse.courseLink = req.body.courseLink;
} 
if (req.body.shortDescription) {
  newCourse.shortDescription = req.body.shortDescription;
} 
if (req.body.oneClassPrice) {
  newCourse.oneClassPrice = req.body.oneClassPrice;
} 
if (req.body.discountOnFullClass) {
  newCourse.discountOnFullClass = req.body.discountOnFullClass;
} 

if (req.body.courseClass) {
  newCourse.courseClass = {}
  if (req.body.courseClass.label) {
    newCourse.courseClass.label = req.body.courseClass.label;
  } 
  if (req.body.courseClass.id) {
    newCourse.courseClass.id = req.body.courseClass.id;
  } 
} 
if (req.body.courseType) {
  newCourse.courseType = {}
  if (req.body.courseType.label) {
    newCourse.courseType.label = req.body.courseType.label;
  } 
  if (req.body.courseType.id) {
    newCourse.courseType.id = req.body.courseType.id;
  } 
} 
if (req.body.duration) {
  newCourse.duration = {}
  if (req.body.duration.label) {
    newCourse.duration.label = req.body.duration.label;
  } 
  if (req.body.duration.id) {
    newCourse.duration.id = req.body.duration.id;
  } 
} 
if (req.body.url) {
    newCourse.url = req.body.url;
  } 
  if (req.body.fullDescription) {
    newCourse.fullDescription = req.body.fullDescription;
  } 
  if (req.body.totalSeat) {
    newCourse.totalSeat = req.body.totalSeat;
  } 
  if (req.body.filledSeat) {
    newCourse.filledSeat = req.body.filledSeat;
  } 
  if (req.body.showRemaining != null || req.body.showRemaining != undefined ) {
    newCourse.showRemaining = req.body.showRemaining;
  } 
  return newCourse;
}




module.exports = router;
