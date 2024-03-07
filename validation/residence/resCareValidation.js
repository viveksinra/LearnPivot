const ResCare = require("../../Models/Private/Residence/ResCare");
var mongoose = require('mongoose');


const validateOnCreate = async (req, res, next) => {

    //   Check if the required label fields are present
      if (!req.body.care  || !req.body.care._id  ) {
        return res.status(406).json({
          message: "Care is required fields.",
          variant: "error",
        });  
      }

      if((!mongoose.Types.ObjectId.isValid(req.body.care._id))){
        return res.status(400).json({
          message:"Invalid Care",
          variant: "error",
        });
      }

    //   Check if the required label fields are present
      if (!req.body.prospectId ) {
        return res.status(406).json({
          message: "Prospect is required fields.",
          variant: "error",
        });  
      }

      if((!mongoose.Types.ObjectId.isValid(req.body.prospectId))){
        return res.status(400).json({
          message:"Prospect Is is Invalid",
          variant: "error",
        });
      }
    //   Check if the required Enum Values fields are present
    let fValues = ["daily","every"];
    if (req.body.frequency && !fValues.includes(req.body.frequency)) {
      return res.status(406).json({
        message: "Wrong Frequency fields.",
        variant: "error",
      });
    }
    // check for duplicate data
    let data1 = await ResCare.find({care:req.body.care._id})
   
    if (data1.length > 0) {
      return res.status(406).json({
        message: "Seems Duplicate data",
        variant: "error",
      });
    }

      next();
    };
    
    const validateOnUpdate = async (req, res, next) => {
    
    //   Check if the required Enum Values fields are present
    let fValues = ["daily","every"];
    if (req.body.frequency && !fValues.includes(req.body.frequency)) {
      return res.status(406).json({
        message: "Wrong Frequency fields.",
        variant: "error",
      });
    }
        
      next();
    };
   
    
    const validateOnProvideCare = async (req, res, next) => {
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
      if ((req.body.prn == false ||
        req.body.prn == "false" ) && (!req.body.time) && (!req.body.qty) 
        ) {
        return res.status(406).json({
          message: "When Prn is false, time and qty should be there",
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
          
      if (!req.body._id) {
        return res.status(406).json({
          message: "resMedId are required fields.",
          variant: "error",
        });
      }
      if((!mongoose.Types.ObjectId.isValid(req.body._id))){
        return res.status(400).json({
          message:"incorrect resMedId",
          variant: "error",
        });
      }

    
    
        
      next();
    };

    module.exports = { validateOnCreate, validateOnUpdate, validateOnProvideCare };
    