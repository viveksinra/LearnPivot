const Ledger = require("../../Models/Private/Account/Ledger");

const validateOnCreate = async (req, res, next) => {
  

    if (!req.body.ledger ) {
        return res.json({
          message: "Ledger is required fields.",
          variant: "error",
        });  
      }

      if (!req.body.group || !req.body.group.label || !req.body.group._id || !req.body.group.link ) {
        return res.json({
          message: "group is required fields.",
          variant: "error",
        });  
      }
   // check for duplicate
 let myData = await Ledger.find({ledger:req.body.ledger}).catch(Err => console.log(Err))

 if (myData.length > 0) {
    return res.json({
      message: "Seems to be duplicate data",
      variant: "error",
    });  
  }
    next();
  };
  
  const validateOnUpdate = async (req, res, next) => {
  
    let myData = await Ledger.find({ledger:req.body.ledger}).catch(Err => console.log(Err))
    let myData2 = await Ledger.findById(req.params.id).catch(Err => console.log(Err))
    let obj = myData[0]
    if (myData.length > 1  ) {
       return res.json({
         message: "Seems to be duplicate data",
         variant: "error",
       });  
     }
    if ((myData.length > 0) && (obj.ledger != myData2.ledger)) {
       return res.json({
         message: "Seems to be duplicate data",
         variant: "error",
       });  
     }
      
    next();
  };
  
  module.exports = { validateOnCreate, validateOnUpdate };
  