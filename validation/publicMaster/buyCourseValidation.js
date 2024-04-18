
const validateRequireField = async (req, res, next) => {
    // Check if the required label fields are present
  if (!req.body.selectedDates) {
      return res.json({
        message: "Selected Date is a required field.",
        variant: "error",
      });
    }
  if (req.body.selectedDates.length <= 0) {
      return res.json({
        message: "Select atleash one class",
        variant: "error",
      });
    }
  if (!req.body.courseId) {
      return res.json({
        message: "course Id is a required field.",
        variant: "error",
      });
    }
  if (!req.body.firstName) {
      return res.json({
        message: "First Name is a required field.",
        variant: "error",
      });
    }
  if (!req.body.lastName) {
      return res.json({
        message: "Last Name is a required field.",
        variant: "error",
      });
    }
  if (!req.body.email) {
      return res.json({
        message: "Email is a required field.",
        variant: "error",
      });
    }
  if (!req.body.mobile) {
      return res.json({
        message: "Mobile is a required field.",
        variant: "error",
      });
    }
 
  
  
    next();
  };
  const validateOnCreate = async (req, res, next) => {
   
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
      