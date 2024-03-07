const CareCat = require("../../Models/Private/Main/CareCat");

const validateOnCreate = async (req, res, next) => {

    //   Check if the required label fields are present
      if (!req.body.label ) {
        return res.status(406).json({
          message: "Label is required fields.",
          variant: "error",
        });  
      }
    //   Check if the required Enum Values fields are present
    let enumValues = ["Adl", "Iadl"];
    if (!req.body.category || !enumValues.includes(req.body.category)) {
      return res.status(406).json({
        message: "Category required fields.",
        variant: "error",
      });
    }

    let label = req.body.label;  
   let link = label.toLowerCase().replace(/\s+/g, '');
    // check for duplicate data
    let data1 = await CareCat.find({link:link})
   
    if (data1.length > 0) {
      return res.status(406).json({
        message: "Seems Duplicate data",
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
    