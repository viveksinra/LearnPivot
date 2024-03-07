const express = require("express");
const router = express.Router();
const passport = require("passport");
const ComplianceDocs = require("../../../../../Models/Private/Common/ComplianceDocs");
const { formatDateToShortMonth } = require("../../../../../utils/dateFormat");
const { findUserOrProspect } = require("../../../../../utils/generalFun/userIdToDetail");

// @type    GET
// @route   /api/v1/common/complianceDocs/getComplianceDocs/getAll/:id
// @desc    Get a complianceDocs by ID
// @common  Public
router.get(
    "/getAll/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        const complianceDocs = await ComplianceDocs.findById(req.params.id);
if (!complianceDocs) {
  return res
    .status(404)
    .json({ 
      variant: "error", 
      message: "ComplianceDocs not found" });
}
res.status(200).json({ variant: "success", message: "ComplianceDocs Loaded", data: complianceDocs });
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
  // @route   /api/v1/common/complianceDocs/getComplianceDocs/getAll
  // @desc    Get all complianceDocss
  // @common  Public
  router.get(
    "/getAll",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
     
      try {

        const myData = await ComplianceDocs.find()    

        res
          .status(200)
          .json({ variant: "success", message: "ComplianceDocs Loaded", data: myData });
      } catch (error) {
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );
 // @type    GET
// @route   /api/v1/common/complianceDocs/getComplianceDocs/formLinkAndResidence/:formNoLink/:residenceId
// @desc    Get all compliance documents
// @common  Public
router.get(
  "/formLinkAndResidence/:formNoLink/:residenceId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { formNoLink, residenceId } = req.params;
    
    try {
      const complianceDocs = await ComplianceDocs.find({ formNoLink, residenceId });
      
      let myData = await modifyData(req,res, complianceDocs)
      
      res.status(200).json({ variant: "success", message: "Docs History Loaded", data: myData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ variant: "error", message: `Internal server error: ${error.message}` });
    }
  }
);
 // @type    GET
// @route   /api/v1/common/complianceDocs/getComplianceDocs/withformNoLink/:formNoLink
// @desc    Get all compliance documents
// @common  Public
router.get(
  "/withformNoLink/:formNoLink/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const  formNoLink  = req.params.formNoLink;
    
    try {
      const complianceDocs = await ComplianceDocs.find({ formNoLink });
      
      let myData = await modifyData(req,res, complianceDocs)
      
      res.status(200).json({ variant: "success", message: "Docs History Loaded", data: myData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ variant: "error", message: `Internal server error: ${error.message}` });
    }
  }
);

const modifyData  = async(req,res, complianceDocs) => { 
  const modifiedData = await Promise.all(complianceDocs.map(async doc => {
    const { _id, fileLink, user, docType, formData } = doc;
    const signatureDate = formatDateToShortMonth(doc.signatureDate);
    const reminderDate = formatDateToShortMonth(doc.reminderDate);
    const expirationDate = formatDateToShortMonth(doc.expirationDate);
    const date = formatDateToShortMonth(doc.date);
    const uploadedBy = await findUserOrProspect(user);
    
    return {
      _id,
      fileLink,
      signatureDate,
      reminderDate,
      expirationDate,
      uploadedBy:uploadedBy.firstName + " " + uploadedBy.lastName,
      docType,
      formData,
      date
    };
}));

return modifiedData
}

  
 
  // @type    GET
  // @route   /api/v1/common/complianceDocs/getComplianceDocs/getDataWithPage/:limit/:PageNumber
  // @desc    Get ledgers with pagination
  // @common  Public
  router.get(
    "/getDataWithPage/:limit/:PageNumber",
    passport.authenticate("jwt", { session: false }),
    async(req, res) => {
      try {
        const page = parseInt(req.params.PageNumber) || 0; // Get the page number from the route parameters (default to 1)
        const limit = parseInt(req.params.limit) || 10; // Number of records to retrieve per page

        // Calculate total count if it's the first page
        const totalCount = await ComplianceDocs.countDocuments() 
        // Retrieve ledgers with pagination
    
   let allComplianceDocs = await ComplianceDocs.find()
          .skip((page) * limit) // Skip the appropriate number of records based on the page number
          .limit(limit) // Limit the number of records to retrieve
          .sort({ date: -1 })
          .catch((err) => {
            throw new Error("An error occurred while retrieving ledgers.");
          });

                   res.status(200).json({ 
                     variant: "success",
                    message:"ComplianceDocs Loaded",
                    data: allComplianceDocs ,
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
  // @route   /api/v1/common/complianceDocs/getComplianceDocs/getDataWithPage/:limit/:PageNumber/:search
  // @desc    Get ledgers with pagination
  // @common  Public
  router.get(
    "/getDataWithPage/:limit/:PageNumber/:search",
    passport.authenticate("jwt", { session: false }),
    async(req, res) => {
      try {
        const page = parseInt(req.params.PageNumber) || 0; // Get the page number from the route parameters (default to 1)
        const limit = parseInt(req.params.limit) || 10; // Number of records to retrieve per page
        const searchQuery = req.params.search

        // Calculate total count if it's the first page
        const totalCount = await ComplianceDocs.countDocuments(
            {
                $or: [

                  { "role.label": { $regex: new RegExp(searchQuery, "i") } },
                  // Add more fields as needed for searching
                ],
              }
        ) 
        // Retrieve ledgers with pagination
    
   let allComplianceDocs = await ComplianceDocs.find( {
    $or: [
   { "role.label": { $regex: new RegExp(searchQuery, "i") } },
      // Add more fields as needed for searching
    ],
  })
          .skip((page) * limit) // Skip the appropriate number of records based on the page number
          .limit(limit) // Limit the number of records to retrieve
          .sort({ date: -1 })
          .catch((err) => {
            throw new Error("An error occurred while retrieving ledgers.");
          });

                   res.status(200).json({ 
                     variant: "success",
                    message:"ComplianceDocs Loaded",
                    data: allComplianceDocs ,
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
  // @route   /api/v1/account/complianceDocs/getComplianceDocs/dropdown/getLedger
  // @desc    Get all complianceDocss
  // @common  Public
  router.get(
    "/dropdown/getLedger",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
     
      try {
        const myData = await Ledger.aggregate([
          {$project:{
            ledger:1,group:1,date:1
          }},
          {$sort:{date:-1}}
        ]).exec()

        const modifiedData = myData.map((resLed) => {
          return {
            ...resLed,
            label: resLed.ledger,
            group: resLed.group.label,
            type:"ledger"
          };
        });


        const myData2 = await Prospect.aggregate([
          {$project:{
            firstName:1,lastName:1,date:1,residenceStage:1
          }},
          {$sort:{date:-1}}
        ]).exec()
        const modifiedData2 = myData2.map((resLed) => {
          let grp = resLed.residenceStage
          return {
            ...resLed,
            label: `${resLed.firstName} ${resLed.lastName}`,
            group: grp.charAt(0).toUpperCase() + grp.slice(1),            
            type:"prospect"
          };
        });
        const myData3 = await User.aggregate([
          {$match:{designation:"employee"}},
          {$project:{
            firstName:1,lastName:1,date:1
          }},
          {$sort:{date:-1}}
        ]).exec()
        const modifiedData3 = myData3.map((resLed) => {
          return {
            ...resLed,
            label: `${resLed.firstName} ${resLed.lastName}`,
            group: "Employee",
            type:"employee"
          };
        });
        var dataToSend = modifiedData.concat(modifiedData2, modifiedData3);
        res
          .status(200)
          .json({ variant: "success", message: "ComplianceDocs Loaded", data: dataToSend });
      } catch (error) {
        console.log(error)
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );

  module.exports = router;