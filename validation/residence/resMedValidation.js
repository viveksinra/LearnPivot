
var mongoose = require('mongoose');

const validateOnCreate = async (req, res, next) => {
  // Schedule array validation
  if ((req.body.prn == "false" || req.body.prn == false) && (!req.body.timing || !Array.isArray(req.body.timing) || req.body.timing.length === 0)) {
    return res.status(406).json({
      message: "At least one time must be provided in the timing array.",
      variant: "error",
    });
  }  
  const timeSet = new Set();
  for (const obj of req.body.timing) {
    if (!obj.time || !obj.qty) {
      return res.status(406).json({
        message: "Both time and qty must be provided for each object in the timing array.",
        variant: "error",
      });
    }
  
    if (timeSet.has(obj.time)) {
      return res.status(406).json({
        message: "Duplicate time values are not allowed.",
        variant: "error",
      });
    }
  
    timeSet.add(obj.time);
  }
    // Check if the required fields are present

  // Check if the start date is required
  if (!req.body.startDate) {
    return res.status(406).json({
      message: "Start Date is Mandatory",
      variant: "error",
    });
  }
  // Check if the ProspectId is required
  if (!req.body.prospectId) {
    return res.status(406).json({
      message: "prospectId are required fields.",
      variant: "error",
    });
  }
  // Check if the ProspectId is required
  if (!req.body.title) {
    return res.status(406).json({
      message: "Medicine name is required",
      variant: "error",
    });
  }


  next();
};

const validateOnUpdate = async (req, res, next) => {

  // Check if the required fields are present
  // if (!req.body.salesAgent || !req.body.salesAgent.label || !req.body.salesAgent._id) {
  //   return res.status(406).json({
  //     message: "Sales Agent are required fields.",
  //     variant: "error",
  //   });
  // }
    
  next();
};
const validateOnProvideMed = async (req, res, next) => {
  if (req.body.isProvided != true &&
    req.body.isProvided != false &&
    req.body.isProvided != "true" &&
    req.body.isProvided != "false"
    ) {
    return res.status(406).json({
      message: "isProvided is required fields.",
      variant: "error",
    });
  }
  if (req.body.prn != true &&
    req.body.prn != false &&
    req.body.prn != "true" &&
    req.body.prn != "false"
    ) {
    return res.status(406).json({
      message: "isPrn is required fields.",
      variant: "error",
    });
  }
  if ((req.body.prn == true ||
    req.body.prn == "true" ) && (!req.body.time) && (!req.body.qty) 
    ) {
    return res.status(406).json({
      message: "When Prn is true, time and qty should be there",
      variant: "error",
    });
  }
  // Check if the ProspectId is required
  if((!mongoose.Types.ObjectId.isValid(req.body.prospectId))){
    return res.status(400).json({
      message:"incorrect prospect id",
      variant: "error",
    });
  }

  if (!req.body.prospectId) {
    return res.status(406).json({
      message: "prospectId are required fields.",
      variant: "error",
    });
  }
  if((!mongoose.Types.ObjectId.isValid(req.body._id))){
    return res.status(400).json({
      message:"incorrect resMedId",
      variant: "error",
    });
  }

  if (!req.body._id) {
    return res.status(406).json({
      message: "resMedId are required fields.",
      variant: "error",
    });
  }


    
  next();
};

module.exports = { validateOnProvideMed, validateOnCreate, validateOnUpdate };
