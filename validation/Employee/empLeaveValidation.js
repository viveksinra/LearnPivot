const EmpLeave = require("../../Models/Private/Employee/EmpLeave");

const leaveType = ["Sick Leave", "Casual Leave", "Paid Leave"];
const shift = ["First Half", "Second Half"];
const duration = ["half", "full", "longer"];
const status = ["Pending", "Approved","Rejected"];

const validateOnCreate = async (req, res, next) => {
  const { leaveType: requestedLeaveType,
     shift: requestedShift,
      duration: requestedDuration ,
      status:requestedStatus,
      
    } = req.body;
  // Check if leave type and duration are present and match the predefined arrays
  if (!leaveType.includes(requestedLeaveType) || !duration.includes(requestedDuration)) {
    return res.json({
      message: "Leave type and duration must be selected from the predefined options.",
      variant: "error",
    });
  }


  // If shift is provided, check if it matches the predefined array
  if (requestedShift && !shift.includes(requestedShift)) {
    return res.json({
      message: "Shift must be selected from the predefined options.",
      variant: "error",
    });
  }

  // Check if either email or mobile is provided for login
  if (!req.body.from) {
    return res.json({
      message: "from date is mandatory.",
      variant: "error",
    });
  }

  next();
};
    
    const validateOnUpdate = async (req, res, next) => {
    
      const { leaveType: requestedLeaveType,
        shift: requestedShift,
         duration: requestedDuration ,
         status:requestedStatus
       } = req.body;

      // Check if leave type and duration are present and match the predefined arrays
      if (leaveType && !leaveType.includes(requestedLeaveType) ) {
        return res.json({
          message: "Leave type and duration must be selected from the predefined options.",
          variant: "error",
        });
      }
      
      if (duration && !duration.includes(requestedDuration)) {
        return res.json({
          message: "Leave type and duration must be selected from the predefined options.",
          variant: "error",
        });
      }
    
      // If shift is provided, check if it matches the predefined array
      if (requestedShift && !shift.includes(requestedShift)) {
        return res.json({
          message: "Shift must be selected from the predefined options.",
          variant: "error",
        });
      }
      if (requestedStatus && !status.includes(requestedStatus)) {
        return res.json({
          message: "Status must be selected from the predefined options.",
          variant: "error",
        });
      }
    
      // Check if either email or mobile is provided for login
      if (!req.body.status) {
        return res.json({
          message: "from date is mandatory.",
          variant: "error",
        });
      }



      next();
    };
    const validateOnDelete = async (req, res, next) => {
    
      if(req.params.id && req.body.email){
       let data = await User.findOne({_id:req.params.id})
       if(data.email != req.body.email){
        return res.status(406).json({
          message: "Email already register",
          variant: "error",
        }); 
    }
      }



      next();
    };
    const validateOnChangeStatus = async (req, res, next) => {
    
 const Emp = await EmpLeave.findById(req.params.id).catch(err => console.log(err))

 if (Emp.status != "Pending") {
  return res.json({
    message: "Only Pending Leaeve can be cancelled",
    variant: "error",
  });
}
 next();

    };
    const validateOnCancelled = async (req, res, next) => {
    
 const Emp = await EmpLeave.findById(req.params.id).catch(err => console.log(err))

 if (Emp.status != "Pending") {
  return res.json({
    message: "Can't cancel now",
    variant: "error",
  });
}

      next();
    };
    
module.exports = { validateOnCreate, validateOnUpdate,validateOnDelete,validateOnCancelled,validateOnChangeStatus };
    