
const validateOnCreate = async (req, res, next) => {
  if (!req.body.formNoLink ) {
    return res.json({
      message: "Form No Link is required fields.",
      variant: "error",
    });  
  }

  if (!req.body.fileLink ) {
    return res.json({
      message: "File Link is required fields.",
      variant: "error",
    });  
  }
   
    next();
  };
  
const validateOnUpdate = async (req, res, next) => {
  

      
    next();
  };
  
  module.exports = { validateOnCreate, validateOnUpdate };
  