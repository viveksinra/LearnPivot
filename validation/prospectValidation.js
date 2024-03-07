const Prospect = require("../Models/Private/Enquiry/Prospect");

const validateOnCreate = async (req, res, next) => {
  
  if(!req.body.prospectStage){
    return res.status(406).json({
      message: "Prospect stage is required fields.",
      variant: "error",
    });  } else 
      if(!req.body.prospectStage.id){
        return res.status(406).json({
          message: "Prospect stage id is required fields.",
          variant: "error",
        });  }
    
  // // Check if it is duplicate entry

    const existingProspect = await Prospect.findOne({
      marketingStatus:req.body.marketingStatus,
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      dateOfBirth:req.body.dateOfBirth,
      phone:req.body.phone,
      email:req.body.email,
      streetAddress:req.body.streetAddress,
      unit:req.body.unit,
      city:req.body.city,
      zipCode:req.body.zipCode,

    });

    if (existingProspect) {
      return res.status(406).json({
        message:"Seems to Duplicate Entry Please Check",
        variant: "error",
      });
    }
  
  next();
};

const validateOnUpdate = async (req, res, next) => {


    
  next();
};

module.exports = { validateOnCreate, validateOnUpdate };
