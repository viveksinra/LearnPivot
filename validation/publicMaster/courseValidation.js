
const validateRequireField = async (req, res, next) => {
  // Check if the required label fields are present


  if (!req.body.startTime) {
    return res.json({
      message: "start Time is a required field.",
      variant: "error",
    });
  }
  if (!req.body.endTime) {
    return res.json({
      message: "endTime is a required field.",
      variant: "error",
    });
  }
  if (!req.body.courseTitle) {
    return res.json({
      message: "courseTitle is a required field.",
      variant: "error",
    });
  }
  if (!req.body.courseLink) {
    return res.json({
      message: "course Link is a required field.",
      variant: "error",
    });
  }
  if (!req.body.shortDescription) {
    return res.json({
      message: "shortDescription is a required field.",
      variant: "error",
    });
  }
  if (!req.body.oneClassPrice) {
    return res.json({
      message: "oneClassPrice is a required field.",
      variant: "error",
    });
  }
  if (!req.body.courseClass || !req.body.courseClass.label || !req.body.courseClass.id) {
    return res.json({
      message: "Course Course is a required field.",
      variant: "error",
    });
  }
  if (!req.body.courseType || !req.body.courseType.label || !req.body.courseType.id) {
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
  let c1 = await Course.findOne({courseTitle:req.body.courseTitle}).catch(err => console.error(err));
  if (c1) {
    return res.json({
      message: "Duplicate Course Title",
      variant: "error",
    });
  }
  let c2 = await Course.findOne({courseLink:req.body.courseLink}).catch(err => console.error(err));
  if (c2) {
    return res.json({
      message: "Duplicate Course Link",
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
    
      // Check if course Used anywhere
      // let c1 = 

      next();
    };
    
    module.exports = {validateOnDelete,validateRequireField, validateOnCreate, validateOnUpdate };
    