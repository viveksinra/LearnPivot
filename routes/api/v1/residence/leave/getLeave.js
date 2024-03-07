const express = require("express");
const router = express.Router();
const passport = require("passport");
const Leave = require("../../../../../Models/Private/Residence/Leave");
const { formatDateToLong, formatDateToISO } = require("../../../../../utils/dateFormat");
const Prospect = require("../../../../../Models/Private/Enquiry/Prospect");

// @type    GET
// @route   /api/v1/residence/leave/getLeave/getAll/:prospectId/:id
// @desc    Get a leave by ID
// @access  Public
router.get(
    "/getAll/:prospectId/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {

      try {
        const leave = await Leave.findById(req.params.id);
if (!leave) {
  return res
    .status(404)
    .json({ 
      variant: "error", 
      message: "Leave not found" });
}
res.status(200).json({ variant: "success", message: "Leave Loaded", data: leave });
      } catch (error) {
        console.log(error)
        res
          .status(500)
          .json({ 
            variant: "error", 
            message: "Internal server error" + error.message});
      }
    }
  );
  
  // @type    GET
  // @route   /api/v1/residence/leave/getLeave/getAll/:prospectId
  // @desc    Get all leaves
  // @access  Public
  router.get(
    "/getAll/:prospectId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
     
      try {  

        const myData = await Leave.find({prospectId: req.params.prospectId})
        const modifiedData = myData.map((leave) => {
          const leaveStartDateT = formatDateToLong(leave.leaveStartDate);
          const leaveEndDateT = formatDateToLong(leave.leaveEndDate);
          const leaveStartDate = formatDateToISO(leave.leaveStartDate);
          const leaveEndDate = formatDateToISO(leave.leaveEndDate);
          return {
            ...leave.toObject(),     
            leaveStartDateT,
            leaveEndDateT,
            leaveStartDate,
            leaveEndDate,
            leaveReasonLabel:leave.leaveReason.label
          };
        });

        res
          .status(200)
          .json({ variant: "success", message: "Leave Loaded", data: modifiedData });
      } catch (error) {
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );
  
  
  
  // @type    GET
  // @route   /api/v1/leave/getDataWithPage
  // @desc    Get leaves with pagination
  // @access  Public
  router.post(
    "/getDataWithPage/:PageNumber",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      try {
        const page = parseInt(req.params.PageNumber) || 1; // Get the page number from the route parameters (default to 1)
        const limit = 10; // Number of records to retrieve per page
  
        // Retrieve leaves with pagination
        Leave.find()
          .skip((page - 1) * limit) // Skip the appropriate number of records based on the page number
          .limit(limit) // Limit the number of records to retrieve
          .then((leaves) => {
            // Calculate total count if it's the first page
            const totalCountPromise =
              page === 1 ? Leave.countDocuments() : Promise.resolve(0);
  
            // Respond with leaves and total count
            Promise.all([totalCountPromise, leaves])
              .then(([totalCount, leaves]) => {
                const response = {
                  page,
                  totalCount: totalCount || leaves.length, // Use totalCount if available, otherwise use the length of leaves
                  leaves,
                };
                res.status(200).json({ variant: "success",message:"Leave Loaded", data: response });
              })
              .catch((err) => {
                throw new Error("An error occurred while retrieving leaves.");
              });
          })
          .catch((err) => {
            throw new Error("An error occurred while retrieving leaves.");
          });
      } catch (error) {
  console.log(error)
        res.status(500).json({
          variant: "error",
          message: "Internal server error" + error.message,
        });
      }
    }
  );

  
// @type    GET
//@route    /api/v1/residence/leave/getLeave/getall/:searchLeave
// @desc    route for searching of user from searchbox using any text
// @access  PRIVATE
router.get(
    "/getAll/:searchLeave",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
          const search = req.params.searchLeave; 
        
          try {
            const mydata = await Leave.aggregate([
              {$match:{$or: [              
                { firstName: new RegExp(search, "i") },
                { lastName: new RegExp(search, "i") },
                { phone: new RegExp(search, "i") },     
              
            ]}},
          
            ]);
           
            res.status(200).json({ variant: "success",message:"Leave Loaded", data:mydata });
          } catch (error) {
            console.log(error);
            res.status(500).json({
              variant: "error",
              message: "Internal server error" + error.message,
            });
          }
      
    }
  );

  // @type    GET
// @route   /api/v1/residence/leave/getLeave/getLast/:prospectId
// @desc    Get a leave by ID
// @access  Public
router.get(
    "/getLast/:prospectId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {

      try {
        const leave = await Leave.findOne({prospectId: req.params.prospectId});
if (!leave) {
  return res
    
    .json({ 
        data:{},
      variant: "success", 
      message: "Leave not found" });
}
 let leaveStartDate = await formatDateToISO(leave.leaveStartDate)
let modifiedData = {
            ...leave.toObject(),     
            leaveStartDate:leaveStartDate,
          }
res.status(200).json({ variant: "success", message: "Leave Loaded", data: modifiedData });
      } catch (error) {
        console.log(error)
        res
          .status(500)
          .json({ 
            variant: "error", 
            message: "Internal server error" + error.message});
      }
    }
  );
  
  // @type    GET
// @route   /api/v1/residence/leave/getLeave/getRoom/:prospectId
// @desc    Get a leave by ID
// @access  Public
router.get(
    "/getRoom/:prospectId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {

      try {
        const room = await Prospect.findById({_id:req.params.prospectId});
if (!room) {
  return res
    
    .json({ 
        data:{},
      variant: "success", 
      message: "Leave not found" });
}
//  let leaveStartDate = await formatDateToISO(leave.leaveStartDate)
let modifiedData = {
    floor:room.floor,
    room:room.room,
    seat:room.seat,
    community:room.community,

          }
res.status(200).json({ variant: "success", message: "room Loaded", data: modifiedData });
      } catch (error) {
        console.log(error)
        res
          .status(500)
          .json({ 
            variant: "error", 
            message: "Internal server error" + error.message});
      }
    }
  );
  

  module.exports = router;