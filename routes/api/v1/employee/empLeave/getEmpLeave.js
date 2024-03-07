const express = require("express");
const router = express.Router();
const passport = require("passport");
const EmpLeave = require("../../../../../Models/Private/Employee/EmpLeave");
const { formatDateToLong, formatDateToShortMonth } = require("../../../../../utils/dateFormat");
const User = require("../../../../../Models/User");

// @type    GET
// @route   /api/v1/empEmpLeave/empEmpLeave/getEmpLeave/getAll/:id
// @desc    Get a empEmpLeave by ID
// @access  Public

router.get(
  "/getAll/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let myEmpLeave = await EmpLeave.findById(req.params.id);
      res.status(200).json({
        variant: "success",
        message: "EmpLeave Loaded",
        data: myEmpLeave,
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


  // @type    GET
  // @route   /api/v1/empEmpLeave/empEmpLeave/getEmpLeave/getAll
  // @desc    Get all empEmpLeaves
  // @access  Public
  router.get(
    "/getAll",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
     
      try {

        const myData = await EmpLeave.find({})
         // Merge myData with myEmpLeaves
      // const mergedData = defaultEmpLeave.concat(myData);
      const mergedData = myData;
    const arrGrp =  await sortByNatureOfEmpLeave(mergedData)
   
        res
          .status(200)
          .json({ variant: "success", message: "EmpLeave Loaded", data: arrGrp.reverse() });
      } catch (error) {
        console.log(error)
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );

  
// @type    GET
// @route   /api/v1/employee/empLeave/getDataWithPage/:limit/:pageNumber
// @desc    Get ledgers with pagination
// @access  Public
router.get(
  "/getDataWithPage/:limit/:pageNumber",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const data = await getSearchFun(req, res, "get");
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

// @type    GET
// @route   /api/v1/employee/empLeave/getEmpLeave/getDataWithPage/:limit/:pageNumber/:search
// @desc    Get ledgers with pagination and search
// @access  Public
router.get(
  "/getDataWithPage/:limit/:pageNumber/:search",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const data = await getSearchFun(req, res, "search");
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

const getSearchFun = async (req, res, type) => {
  try {
    const page = parseInt(req.params.pageNumber) || 1; // Use "pageNumber" instead of "PageNumber" in route parameters
    const limit = parseInt(req.params.limit) || 10;
    let myMatch = {};

    if (req.params.search) {
      const searchQuery = req.params.search;
      myMatch = {
        $or: [
          { shift: { $regex: new RegExp(searchQuery, "i") } },
        ],
      };
    }

    const totalCount = await EmpLeave.countDocuments(myMatch);

    const allEmpLeave = await EmpLeave.find(myMatch)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ date: -1 });

    const modifiedDataPromises = allEmpLeave.map((empLeave) => ({
      ...empLeave.toObject(),
      from: formatDateToShortMonth(empLeave.from),
      to: formatDateToShortMonth(empLeave.to),
      applied:formatDateToShortMonth(empLeave.date)
    }));

    const modifiedData = await Promise.all(modifiedDataPromises);
    const dataToSend = {
      variant: "success",
      message: "Leave loaded",
      data: modifiedData,
      page: page,
      totalCount: totalCount,
    };

    return dataToSend;
  } catch (err) {
    console.error("An error occurred while retrieving ledgers:", err);
    throw err;
  }
};

  
  

 // @type    GET
  // @route   /api/v1/empEmpLeave/empEmpLeave/getEmpLeave/dropDown/getAll
  // @desc    Get all empEmpLeaves
  // @access  Public
  router.get(
    "/dropDown/getAll",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
     
      try {

        const myData = await EmpLeave.aggregate([
          {$project:{label:1,link:1,defaultEmpLeave:1,natureOfEmpLeave:1}}
        ]).exec()
         // Merge myData with myEmpLeaves
      // const mergedData = defaultEmpLeave.concat(myData);
      const mergedData = myData;
          const arrGrp =  await sortByNatureOfEmpLeave(mergedData)
   let modifiedData = arrGrp.map((data) => {
    return {
      label:data.label,
      link:data.link,
      defaultEmpLeave:data.defaultEmpLeave,
      natureOfEmpLeave:data.natureOfEmpLeave,
      _id:data._id

    }
   })
   modifiedData.unshift({
    label:"Primary",
    defaultEmpLeave:true,
    link:"primary",
    _id:"64764c71c3790924fc500761",
    natureOfEmpLeave:"Primary",
   })
        res
          .status(200)
          .json({ variant: "success", message: "EmpLeave Loaded", data: modifiedData });
      } catch (error) {
        console.log(error)
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );

 // @type    GET Dropdown
  // @route   /api/v1/employee/empLeave/getEmpLeave/dropDown/getByRole/:jobRole
  // @desc    Get all empEmpLeaves
  // @access  Public
  router.get(
    "/dropDown/getByRole/:jobRole",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
          let myMatch = {};
          const userJobRole = req.params.jobRole
          if (userJobRole === "admin") {
            myMatch = { "jobRole.id": "admin" };
          } else if (userJobRole === "ceo") {
            myMatch = { "jobRole.id": "admin" };
          } else if (userJobRole === "buildingManager") {
            myMatch = { "jobRole.id": "ceo" };
          } else  {
            myMatch = { "jobRole.id": "buildingManager" };
          }

    let myData = await User.find(myMatch).catch(err => console.log(err))
    let modifiedData = myData.map((data)=>{

      return {
        label:data.lastName + " " + data.firstName,
        _id:data._id
      }
    })
    res
    .status(200)
    .json({ variant: "success", message: "EmpLeave Loaded", data: modifiedData });

        } catch (error) {
        console.log(error)
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );

  module.exports = router;