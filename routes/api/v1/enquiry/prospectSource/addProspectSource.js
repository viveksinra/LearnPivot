const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load ProspectSource Model
const ProspectSource = require("../../../../../Models/Private/Enquiry/ProspectSource");
const {
  validateOnCreate,
  validateOnUpdate,
  validateOnDelete,
} = require("../../../../../validation/enquiry/prospectSourceValidation");

// @type    POST
// @route   /api/v1/enquiry/prospectSource/addProspectSource
// @desc    Create a new prospectSource
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateOnCreate,
  async (req, res) => {
    try {
      const prospectSourceObj = await getProspectSourceObj(req,"create");
      await new ProspectSource(prospectSourceObj)
      .save();
      res.status(201).json({
        message: "ProspectSource Successfully added",
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
// @route   /api/v1/enquiry/prospectSource/addProspectSource/:id
// @desc    Update a prospectSource by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updateProspectSource) {
  try {
    const prospectSource = await ProspectSource.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateProspectSource },
      { new: true }
    );
    if (!prospectSource) {
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
      const prospectSourceObj = await getProspectSourceObj(req,"update");

      updateMe(req, res, prospectSourceObj);
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
// @route   /api/v1/enquiry/prospectSource/addProspectSource/deleteOne/:id
// @desc    Delete a prospectSource by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  validateOnDelete,
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const prospectSource = await ProspectSource.findByIdAndRemove(req.params.id);
      if (!prospectSource) {
        return res
          .status(404)
          .json({ variant: "error", message: "ProspectSource not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "ProspectSource deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

// Function to construct a new ProspectSource object
async function getProspectSourceObj(req, type) {
  let newProspectSource = {
    user: req.user.id,
    lastModified: new Date(),
  }

  // Check and assign values for each parameter based on their type
  if (req.body.locationImg) {
    newProspectSource.locationImg = req.body.locationImg;
  }
  if (req.body.prospectSource) {
    newProspectSource.prospectSource = req.body.prospectSource;
  }
  newProspectSource.contactPerson = {}; // Initialize as an empty object

  if (req.body.contactPerson) {
    if (req.body.contactPerson._id) {
      newProspectSource.contactPerson._id = req.body.contactPerson._id;
    }
    if (req.body.contactPerson.label) {
      newProspectSource.contactPerson.label = req.body.contactPerson.label;
    }
  }
  if (req.body.commission) {
    newProspectSource.commission = req.body.commission;
  }
  if (req.body.remark) {
    newProspectSource.remark = req.body.remark;
  }
  newProspectSource.locationType = {};

  if (req.body.locationType) {
    if (req.body.locationType.label) {
      newProspectSource.locationType.label = req.body.locationType.label;
    }
    if (req.body.locationType.id) {
      newProspectSource.locationType.id = req.body.locationType.id;
    }
  }
  if (req.body.street) {
    newProspectSource.street = req.body.street;
  }
  if (req.body.unit) {
    newProspectSource.unit = req.body.unit;
  }
  if (req.body.mobile) {
    newProspectSource.mobile = req.body.mobile;
  }
  if (req.body.email) {
    newProspectSource.email = req.body.email;
  }
  if (req.body.zip) {
    newProspectSource.zip = req.body.zip;
  }
  if (req.body.city) {
    newProspectSource.city = req.body.city;
  }
  newProspectSource.state = {};

  if (req.body.state) {
    if (req.body.state.label) {
      newProspectSource.state.label = req.body.state?.label;
    }
    if (req.body.state.id) {
      newProspectSource.state.id = req.body.state?.id;
    }
  }
  if (req.body.community) {
    newProspectSource.community = req.body.community;
  }

  return newProspectSource;
}


module.exports = router;
