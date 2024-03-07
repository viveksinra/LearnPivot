const express = require("express");
const router = express.Router();
const passport = require("passport");
const Group = require("../../../../../Models/Private/Account/Group");
const defaultGroup = require("../../../../../utils/defaultGroup");
const { formatDateToLong, formatDateToShortMonth } = require("../../../../../utils/dateFormat");

// @type    GET
// @route   /api/v1/account/group/getGroup/getAll/:id
// @desc    Get a group by ID
// @access  Public

router.get(
  "/getAll/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let myGroup = await Group.findById(req.params.id);
      res.status(200).json({
        variant: "success",
        message: "Group Loaded",
        data: myGroup,
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
  // @route   /api/v1/account/group/getGroup/getAll
  // @desc    Get all groups
  // @access  Public
  router.get(
    "/getAll",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
     
      try {

        const myData = await Group.find({})
         // Merge myData with myGroups
      // const mergedData = defaultGroup.concat(myData);
      const mergedData = myData;
    const arrGrp =  await sortByNatureOfGroup(mergedData)
   
        res
          .status(200)
          .json({ variant: "success", message: "Group Loaded", data: arrGrp.reverse() });
      } catch (error) {
        console.log(error)
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );

  function sortByNatureOfGroup(arr) {
    // Sort the array based on the "natureOfGroup" property
    arr.sort((a, b) => {
      console.log(a)
        const natureA = a.natureOfGroup.label.toUpperCase();
        const natureB = b.natureOfGroup.label.toUpperCase();

        if (natureA < natureB) {
            return -1;
        }
        if (natureA > natureB) {
            return 1;
        }
        return 0;
    });

    return arr
}
  

  
  // @type    GET
  // @route   /api/v1/account/group/getGroup/getDataWithPage/:limit/:PageNumber
  // @desc    Get ledgers with pagination
  // @access  Public
  router.get(
    "/getDataWithPage/:limit/:PageNumber",
    passport.authenticate("jwt", { session: false }),
    async(req, res) => {
      try {
        // Calculate total count if it's the first page
      

        let data = await getSearchFun(req,res,"get")
        res.status(200).json(data);


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
  // @route   /api/v1/account/group/getGroup/getDataWithPage/:limit/:PageNumber/:search
  // @desc    Get ledgers with pagination
  // @access  Public
  router.get(
    "/getDataWithPage/:limit/:PageNumber/:search",
    passport.authenticate("jwt", { session: false }),
    async(req, res) => {
      try {
    


       let data = await getSearchFun(req,res,"search")
        res.status(200).json(data);

      } catch (error) {
  console.log(error)
        res.status(500).json({
          variant: "error",
          message: "Internal server error" + error.message,
        });
      }
    }
  );

  const getSearchFun = async (req, type) => {
    try {
      const page = parseInt(req.params.PageNumber) || 1; // Get the page number from the route parameters (default to 1)
      const limit = parseInt(req.params.limit) || 10; // Number of records to retrieve per page
      let myMatch = { }
      if(req.params.search){
    const searchQuery = req.params.search
    // Calculate total count if it's the first page
     myMatch = {
      $or: [
        { label: { $regex: new RegExp(searchQuery, "i") } },
        { "under.label": { $regex: new RegExp(searchQuery, "i") } },
        // Add more fields as needed for searching
      ],
    }
  }
      const totalCount = await Group.countDocuments(myMatch);
  
      // Retrieve ledgers with pagination, populating the 'under' property
      const allGroup = await Group.find(myMatch)
        .skip((page - 1) * limit) // Calculate the correct skip value
        .limit(limit) // Limit the number of records to retrieve
        .sort({ date: -1 })
        .populate("under._id", "label link defaultGroup"); // Populate the 'under' property
  
      const modifiedDataPromises = allGroup.map((group) => ({
        ...group.toObject(),
        groupImg:"https://res.cloudinary.com/oasismanors/image/upload/v1693850707/Group_haviuf.png",
        date: formatDateToShortMonth(group.date),
      }));
  
      const modifiedData = await Promise.all(modifiedDataPromises);
      const dataToSend = {
        variant: "success",
        message: "Group Loaded",
        data: modifiedData,
        page: page,
        totalCount: totalCount,
      };
  
      return dataToSend;
    } catch (err) {
      console.error("An error occurred while retrieving ledgers:", err);
      throw err; // Re-throw the error so it can be caught in the route handler
    }
  };
  
  

 // @type    GET
  // @route   /api/v1/account/group/getGroup/dropDown/getAll
  // @desc    Get all groups
  // @access  Public
  router.get(
    "/dropDown/getAll",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
     
      try {

        const myData = await Group.aggregate([
          {$project:{label:1,link:1,defaultGroup:1,natureOfGroup:1}}
        ]).exec()
         // Merge myData with myGroups
      // const mergedData = defaultGroup.concat(myData);
      const mergedData = myData;
          const arrGrp =  await sortByNatureOfGroup(mergedData)
   let modifiedData = arrGrp.map((data) => {
    return {
      label:data.label,
      link:data.link,
      defaultGroup:data.defaultGroup,
      natureOfGroup:data.natureOfGroup,
      _id:data._id

    }
   })
   modifiedData.unshift({
    label:"Primary",
    defaultGroup:true,
    link:"primary",
    _id:"64764c71c3790924fc500761",
    natureOfGroup:"Primary",
   })
        res
          .status(200)
          .json({ variant: "success", message: "Group Loaded", data: modifiedData });
      } catch (error) {
        console.log(error)
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );

  module.exports = router;