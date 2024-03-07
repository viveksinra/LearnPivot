const express = require("express");
const router = express.Router();
const passport = require("passport");
const Ledger = require("../../../../../Models/Private/Account/Ledger");
const { formatDateToLong, formatDateToISO } = require("../../../../../utils/dateFormat");

// @type    GET
// @route   /api/v1/account/ledger/getLedger/getAll/:id
// @desc    Get a ledger by ID
// @access  Public

router.get(
  "/getAll/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let myLedger = await Ledger.findById(req.params.id);
      res.status(200).json({
        variant: "success",
        message: "Ledger Loaded",
        data: myLedger,
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
  // @route   /api/v1/account/ledger/getLedger/getAll
  // @desc    Get all ledgers
  // @access  Public
  router.get(
    "/getAll",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
     
      try {

        const myData = await Ledger.find({})
   
        res
          .status(200)
          .json({ variant: "success", message: "Ledger Loaded", data: myData });
      } catch (error) {
        console.log(error)
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );
  
  
  
  // @type    GET
  // @route   /api/v1/account/ledger/getLedger/getDataWithPage/:limit/:PageNumber
  // @desc    Get ledgers with pagination
  // @access  Public
  router.get(
    "/getDataWithPage/:limit/:PageNumber",
    passport.authenticate("jwt", { session: false }),
    async(req, res) => {
      try {
        const page = parseInt(req.params.PageNumber) || 0; // Get the page number from the route parameters (default to 1)
        const limit = parseInt(req.params.limit) || 10; // Number of records to retrieve per page

        // Calculate total count if it's the first page
        const totalCount = await Ledger.countDocuments() 
        // Retrieve ledgers with pagination
    
   let allLedger = await Ledger.find()
          .skip((page) * limit) // Skip the appropriate number of records based on the page number
          .limit(limit) // Limit the number of records to retrieve
          .sort({ date: -1 })
          .catch((err) => {
            throw new Error("An error occurred while retrieving ledgers.");
          });
   
          const modifiedData = allLedger.map((LedCare) => {
                 
            return {
              ...LedCare.toObject(),     
              ledgerImage:LedCare.ledgerImage || "https://res.cloudinary.com/dncukhilq/image/upload/v1690208267/oasisManors/Default/myledgerDefault_x7kowb.jpg",
              createDate: formatDateToISO(LedCare.createDate),
            };
          });

  
                   res.status(200).json({ 
                     variant: "success",
                    message:"Ledger Loaded",
                    data: modifiedData ,
                    page: page ,
                    totalCount: totalCount ,
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
  // @route   /api/v1/account/ledger/getLedger/getDataWithPage/:limit/:PageNumber/:search
  // @desc    Get ledgers with pagination
  // @access  Public
  router.get(
    "/getDataWithPage/:limit/:PageNumber/:search",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        const searchQuery = req.params.search;
        const page = parseInt(req.params.PageNumber) || 0;
        const limit = parseInt(req.params.limit) || 10;
  
  
        // Calculate total count if it's the first page
        const totalCount = await Ledger.countDocuments({
          $or: [
            { ledger: { $regex: new RegExp(searchQuery, "i") } },
            { "group.label": { $regex: new RegExp(searchQuery, "i") } },
            // Add more fields as needed for searching
          ],
        });
  
        // Retrieve ledgers with pagination and search filter
        let allLedger = await Ledger.find({
          $or: [
            { ledger: { $regex: new RegExp(searchQuery, "i") } },
            { "group.label": { $regex: new RegExp(searchQuery, "i") } },
            // Add more fields as needed for searching
          ],
        })
          .skip(page * limit)
          .limit(limit)
          .sort({ date: -1 })
          .catch((err) => {
            throw new Error("An error occurred while retrieving ledgers.");
          });
  
        const modifiedData = allLedger.map((LedCare) => {
          return {
            ...LedCare.toObject(),
            ledgerImage:
              LedCare.ledgerImage ||
              "https://res.cloudinary.com/dncukhilq/image/upload/v1690208267/oasisManors/Default/myledgerDefault_x7kowb.jpg",
            createDate: formatDateToISO(LedCare.createDate),
          };
        });
  
        res.status(200).json({
          variant: "success",
          message: "Ledger Loaded",
          data: modifiedData,
          page: page,
          totalCount: totalCount,
        });
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
  // @route   /api/v1/account/ledger/getLedger/agentLedger/dropDown/getAll
  // @desc    Get all ledgers
  // @access  Public
  router.get(
    "/agentLedger/dropDown/getAll",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
     
      try {

        const myData = await Ledger.aggregate([
          {$match:{"group.link":"agent"}},
          {$project:{ledgerImage:1,ledger:1}}
        ]).exec()
   let modifiedData = myData.map(data => {

    return {
      label:data.ledger,
      ledgerImage:data.ledgerImage,
      _id:data._id
    }
   })
        res
          .status(200)
          .json({ variant: "success", message: "Agent Loaded", data: modifiedData });
      } catch (error) {
        console.log(error)
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );

  

  module.exports = router;