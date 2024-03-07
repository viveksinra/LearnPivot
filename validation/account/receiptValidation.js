var mongoose = require('mongoose');


const validateOnCreate = async (req, res, next) => {
    //   Check if the required label fields are present
      if (!req.body.ledger || !req.body.ledger.label  ) {
        return res.json({
          message: "Ledger label is required fields.",
          variant: "error",
        });  
      }
      if (!req.body.ledger || !req.body.ledger._id  ) {
        return res.json({
          message: "Ledger id is required fields.",
          variant: "error",
        });  
      }
      if (!req.body.ledger || !req.body.ledger.type  ) {
        return res.json({
          message: "Ledger type is required fields.",
          variant: "error",
        });  
      }
      if((!mongoose.Types.ObjectId.isValid(req.body.ledger._id))){
        return res.status(400).json({
          message:"Invalid Ledger Id",
          variant: "error",
        });
      }

      if (!req.body.tranDate  ) {
        return res.json({
          message: "Transaction Date is required fields.",
          variant: "error",
        });  
      }
      if (!req.body.amount  ) {
        return res.json({
          message: "Amount is required fields.",
          variant: "error",
        });  
      }
 
      if (!req.body.mode || !req.body.mode._id  ) {
        return res.json({
          message: "Mode is required fields.",
          variant: "error",
        });  
      }
      if((!mongoose.Types.ObjectId.isValid(req.body.mode._id))){
        return res.status(400).json({
          message:"Invalid Mode Id",
          variant: "error",
        });
      }
      if (req.body.mode._id == req.body.ledger._id ) {
        return res.json({
          message: "Ledger and Mode Can't be Same",
          variant: "error",
        });  
      }

    // check for duplicate data
    // let data1 = await ResCare.find({care:req.body.care._id})
   
    // if (data1.length > 0) {
    //   return res.json({
    //     message: "Seems Duplicate data",
    //     variant: "error",
    //   });
    // }

      next();
    };
    
    const validateOnUpdate = async (req, res, next) => {
    
   
    
    if(!(!req.body.mode || !req.body.mode._id || !req.body.ledger || !req.body.ledger._id))
  {  if (req.body.mode._id == req.body.ledger._id ) {
      return res.json({
        message: "Ledger and Mode Can't be Same",
        variant: "error",
      });  
    }
} else {
        return res.json({
            message: "Ledger and Mode is required",
            variant: "error",
          });  
    }
        
      next();
    };
    
    module.exports = { validateOnCreate, validateOnUpdate };
    