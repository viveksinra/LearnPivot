
const validateOnCreate = async (req, res, next) => {

//   Check if the required fields are present
  if (!req.body.prospectId ) {
    if(req.body.prospectId != "general"){
    return res.status(406).json({
      message: "Prospect Id is required fields.",
      variant: "error",
    });  }
  }
  if (!req.body.task ) {
    return res.status(406).json({
      message: "task is required fields.",
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
const validateOnComplete = async (req, res, next) => {

  // Check if the required fields are present
    if(!req.body.completionDate){
    return res.json({
      message: "task Completion Date  is required fields.",
      variant: "error",
    });  }


    
  next();
};

module.exports = { validateOnCreate, validateOnUpdate,validateOnComplete };
