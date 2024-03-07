const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load ComplianceDocs Model
const ComplianceDocs = require("../../../../../Models/Private/Common/ComplianceDocs");
const {
  validateOnCreate,
  validateOnUpdate
} = require("../../../../../validation/common/complianceDocsValidation");
const { labelToId } = require("../../../../../utils/generalFun/StringFormat");

// @type    POST
// @route   /api/v1/common/complianceDocs/addComplianceDocs
// @desc    Create a new common
// @common  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateOnCreate,
  async (req, res) => {
    try {
      const commonObj = await getComplianceDocsObj(req,"create");
      await new ComplianceDocs(commonObj)
      .save();
      res.status(201).json({
        message: "Compliance Docs added Successfully Created",
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
// @route   /api/v1/account/common/addComplianceDocs/:id
// @desc    Update a common by ID
// @common  Public
// @type    POST

async function updateMe(req, res, updateComplianceDocs) {
  try {
    const common = await ComplianceDocs.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateComplianceDocs },
      { new: true }
    );
    if (!common) {
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
      const commonObj = await getComplianceDocsObj(req,"update");

      updateMe(req, res, commonObj);
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
// @route   /api/v1/account/common/addComplianceDocs/deleteOne/:id
// @desc    Delete a common by ID
// @common  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const common = await ComplianceDocs.findByIdAndRemove(req.params.id);
      if (!common) {
        return res
          .status(404)
          .json({ variant: "error", message: "ComplianceDocs not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "ComplianceDocs deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

async function getComplianceDocsObj(req, type) {
  let newComplianceDocs = {
    user: req.user.id,
    lastModified: new Date(),
  };

  if (req.body.formNoLink) {
    newComplianceDocs.formNoLink = req.body.formNoLink;
  }
  if (req.body.fileLink) {
    newComplianceDocs.fileLink = req.body.fileLink;
  }
  if (req.body.signatureDate) {
    newComplianceDocs.signatureDate = req.body.signatureDate;
  }
  if (req.body.expirationDate) {
    newComplianceDocs.expirationDate = req.body.expirationDate;
  }
  if (req.body.docType) {
    newComplianceDocs.docType = req.body.docType;
  }
  if (req.body.allData) {
    newComplianceDocs.allData = req.body.allData;
  }
  if (req.body.residenceId) {
    newComplianceDocs.residenceId = req.body.residenceId;
  }

  return newComplianceDocs;
}





module.exports = router;
