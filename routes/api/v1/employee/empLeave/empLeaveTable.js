const express = require("express");
const router = express.Router();
const passport = require("passport");
const EmpLeave = require("../../../../../Models/Private/Employee/EmpLeave");
const { formatDateToLong, formatDateToShortMonth } = require("../../../../../utils/dateFormat");

// @type    GET
// @route   /api/v1/employee/empLeave/empLeaveTable/withFilter
// @desc    Get a empEmpLeave by ID
// @access  Public

router.post(
  "/withFilter",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
        let myMatch = {}
        if(req.body.shift){
            myMatch.shift = req.body.shift
        }

      let myEmpLeave = await EmpLeave.aggregate([
        {
          $match: {
            status: { $ne: "Cancelled" } // Exclude canceled leaves
          }
        },
        {
            $lookup: {
              from: "myusers", // The collection name where users are stored
              localField: "leaveFor",
              foreignField: "_id",
              as: "userDetails",
            },
          },
      ]);
      let myData = await formatData(myEmpLeave)
      res.status(200).json({
        variant: "success",
        message: "EmpLeave Loaded",
        data: myData,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        variant: "error",
        message: "Internal server error",
      });
    }
  }
);

const formatData = async (myEmpLeave) => {
    return myEmpLeave.map(item => {
      const title = item.status === 'Approved'
        ? `${item.userDetails[0].firstName + " " + item.userDetails[0].lastName} is on Leave.`
        : `${item.userDetails[0].firstName + " " + item.userDetails[0].lastName} Leave is Pending.`;
  
      const allDay = item.duration === 'full';
  
      return {
        title,
        allDay,
        start: new Date(item.from),
        end: new Date(item.to),
      };
    });
  }
  

  module.exports = router;