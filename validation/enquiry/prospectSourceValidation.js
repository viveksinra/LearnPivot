
const validateOnCreate = async (req, res, next) => {

    //   Check if the required fields are present
      if (!req.body.locationImg ) {
        return res.json({
          message: "Location Img is required fields.",
          variant: "error",
        });  
      }
      if (!req.body.prospectSource ) {
        return res.json({
          message: "Prospect Source is required fields.",
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
    const validateOnDelete = async (req, res, next) => {
    
      // Check if the required fields are present
      // if (!req.body.salesAgent || !req.body.salesAgent.label || !req.body.salesAgent._id) {
      //   return res.status(406).json({
      //     message: "Sales Agent are required fields.",
      //     variant: "error",
      //   });
      // }
        
      next();
    };
    
    module.exports = { validateOnCreate, validateOnUpdate, validateOnDelete };
    