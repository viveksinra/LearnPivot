const express = require("express");
const router = express.Router();
const passport = require("passport");
const ProspectSource = require("../../../../../Models/Private/Enquiry/ProspectSource");

const { formatDateToLong, formatDateToShortMonth } = require("../../../../../utils/dateFormat");

// @type    GET
// @route   /api/v1/enquiry/prospectSource/getProspectSource/getAll/:id
// @desc    Get a prospectSource by ID
// @access  Public

router.get(
  "/getAll/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let myProspectSource = await ProspectSource.findById(req.params.id);
      res.status(200).json({
        variant: "success",
        message: "ProspectSource Loaded",
        data: myProspectSource,
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
  // @route   /api/v1/enquiry/prospectSource/getProspectSource/getAll
  // @desc    Get all prospectSources
  // @access  Public
  router.get(
    "/getAll",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
     
      try {

        const myData = await ProspectSource.find({})

   
        res
          .status(200)
          .json({ variant: "success", message: "ProspectSource Loaded", data: myData.reverse() });
      } catch (error) {
        console.log(error)
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );


  

  
  // @type    GET
  // @route   /api/v1/enquiry/prospectSource/getProspectSource/getDataWithPage/:limit/:PageNumber
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
  // @route   /api/v1/enquiry/prospectSource/getProspectSource/getDataWithPage/:limit/:PageNumber/:search
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
        { prospectSource: { $regex: new RegExp(searchQuery, "i") } },
        { "contactPerson.label": { $regex: new RegExp(searchQuery, "i") } },
        // Add more fields as needed for searching
      ],
    }
  }
      const totalCount = await ProspectSource.countDocuments(myMatch);
  
      // Retrieve ledgers with pagination, populating the 'under' property
      const allProspectSource = await ProspectSource.find(myMatch)
        .skip((page - 1) * limit) // Calculate the correct skip value
        .limit(limit) // Limit the number of records to retrieve
        .sort({ date: -1 })
  
      const modifiedDataPromises = allProspectSource.map((prospectSource) => ({
        ...prospectSource.toObject(),
        date: formatDateToShortMonth(prospectSource.date),
      }));
  
      const modifiedData = await Promise.all(modifiedDataPromises);
      const dataToSend = {
        variant: "success",
        message: "ProspectSource Loaded",
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
  // @route   /api/v1/enquiry/prospectSource/getProspectSource/dropDown/getAll
  // @desc    Get all prospectSources
  // @access  Public
  router.get(
    "/dropDown/getAll",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
     
      try {
        const myData = await ProspectSource.aggregate([
          {$project:{prospectSource:1,locationType:1,locationImg:1}}
        ]).exec()
  
   let modifiedData = myData.map((data) => {
    return {
      label:data.prospectSource,
      locationType:data.locationType.label,
      locationImg:data.locationImg,
      _id:data._id

    }
   })

        res
          .status(200)
          .json({ variant: "success", message: "ProspectSource Loaded", data: modifiedData });
      } catch (error) {
        console.log(error)
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );

  module.exports = router;