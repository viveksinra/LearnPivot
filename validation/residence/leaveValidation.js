var mongoose = require('mongoose');
const Leave = require('../../Models/Private/Residence/Leave');

const validateOnCreate = async (req, res, next) => {

    //   Check if the required fields are present
      if (!req.body.prospectId ) {
        return res.json({
          message: "Residence Id is required fields.",
          variant: "error",
        });  
      }
      if (!req.body.leaveStartDate ) {
        return res.json({
          message: "Leave Start Date is required fields.",
          variant: "error",
        });  
      }

      if((!mongoose.Types.ObjectId.isValid(req.body.prospectId))){
        return res.json({
          message:"prospectId Invalid",
          variant: "error",
        });
      }
    //   Check if the required fields are present
      // check for duplicate
      let sDate = new Date(req.body.leaveStartDate)
      let data = await Leave.findOne({leaveStartDate:sDate})

      if (!data ) {
        return res.json({
          message: "There is already Leave on this date",
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
    
    module.exports = { validateOnCreate, validateOnUpdate };
    