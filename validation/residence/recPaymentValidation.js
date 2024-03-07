var mongoose = require('mongoose');

const validateOnCreate = async (req, res, next) => {

    //   Check if the required fields are present
      if (!req.body.prospectId ) {
        return res.status(406).json({
          message: "Prospect Id is required fields.",
          variant: "error",
        });  
      }
      if(!mongoose.Types.ObjectId.isValid(req.body.prospectId)){
        return res.status(400).json({
          message:"incorrect Prospect id",
          variant: "error",
        });
      }
      if (!req.body.payer || !req.body.payer?._id) {
        return res.status(406).json({
          message: "Payer is required fields.",
          variant: "error",
        });  
      }
      if(!mongoose.Types.ObjectId.isValid(req.body.payer?._id)){
        return res.status(400).json({
          message:"incorrect Payer id",
          variant: "error",
        });
      }
      if (!req.body.item || !req.body.item?._id) {
        return res.status(406).json({
          message: "Item is required field.",
          variant: "error",
        });  
      }
      if(!mongoose.Types.ObjectId.isValid(req.body.item?._id)){
        return res.status(400).json({
          message:"incorrect item id",
          variant: "error",
        });
      }
      if (!req.body.startDate) {
        return res.status(406).json({
          message: "Start Date is required field.",
          variant: "error",
        });  
      }
      if (!req.body.price) {
        return res.status(406).json({
          message: "Price is required field.",
          variant: "error",
        });  
      }

    // //   Check if the required fields are present
    //   if (!req.body.notes ) {
    //     return res.status(406).json({
    //       message: "Notes is required fields.",
    //       variant: "error",
    //     });  
    //   }
    
      next();
    };
    
    const validateOnUpdate = async (req, res, next) => {
    
      if (req.body.prospectId ) {
      
      if(!mongoose.Types.ObjectId.isValid(req.body.prospectId)){
        return res.status(400).json({
          message:"incorrect Prospect id",
          variant: "error",
        });
      }}
      if (req.body.payer && req.body.payer?._id) {
      
      if(!mongoose.Types.ObjectId.isValid(req.body.payer?._id)){
        return res.status(400).json({
          message:"incorrect Payer id",
          variant: "error",
        });
      }
    }

      if (req.body.item && req.body.item?._id) {
    
      if(!mongoose.Types.ObjectId.isValid(req.body.item?._id)){
        return res.status(400).json({
          message:"incorrect item id",
          variant: "error",
        });
      }}
     
        
      next();
    };
    
    module.exports = { validateOnCreate, validateOnUpdate };
    