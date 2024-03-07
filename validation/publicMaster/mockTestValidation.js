
const validateRequireField = async (req, res, next) => {
  // Check if the required label fields are present

  if (!req.body.startDate) {
    return res.json({
      message: "Start Date is a required field.",
      variant: "error",
    });
  }
  if (!req.body.endDate) {
    return res.json({
      message: "End Date is a required field.",
      variant: "error",
    });
  }

  if (!req.body.mockTestTitle) {
    return res.json({
      message: "mockTestTitle is a required field.",
      variant: "error",
    });
  }
  if (!req.body.mockTestLink) {
    return res.json({
      message: "MockTest Link is a required field.",
      variant: "error",
    });
  }
  if (!req.body.shortDescription) {
    return res.json({
      message: "shortDescription is a required field.",
      variant: "error",
    });
  }
  if (!req.body.testClass || !req.body.testClass.label || !req.body.testClass.id) {
    return res.json({
      message: "Course Class is a required field.",
      variant: "error",
    });
  }
  if (!req.body.testType || !req.body.testType.label || !req.body.testType.id) {
    return res.json({
      message: "Course Type is a required field.",
      variant: "error",
    });
  }
  if (!req.body.duration || !req.body.duration.label || !req.body.duration.id) {
    return res.json({
      message: "Duration is a required field.",
      variant: "error",
    });
  }
  if (!req.body.url) {
    return res.json({
      message: "Image Thumbnail is a required field.",
      variant: "error",
    });
  }


  next();
};
const validateOnCreate = async (req, res, next) => {
  // Check if the required label fields are present
  let c1 = await MockTest.findOne({mockTestTitle:req.body.mockTestTitle}).catch(err => console.error(err));
  if (c1) {
    return res.json({
      message: "Duplicate MockTest Title",
      variant: "error",
    });
  }
  let c2 = await MockTest.findOne({mockTestLink:req.body.mockTestLink}).catch(err => console.error(err));
  if (c2) {
    return res.json({
      message: "Duplicate MockTest Link",
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
    
      // Check if MockTest Used anywhere
      // let c1 = 

      next();
    };
    
    module.exports = {validateOnDelete,validateRequireField, validateOnCreate, validateOnUpdate };
    