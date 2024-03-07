const express = require("express");
const router = express.Router();
const passport = require("passport");
const ResCare = require("../../../../../Models/Private/Residence/ResCare");
const CareCat = require("../../../../../Models/Private/Main/CareCat");
const Prospect = require("../../../../../Models/Private/Enquiry/Prospect");
const {verifyMongoId} = require("./../../../../../validation/verifyId");
const ProvideCare = require("../../../../../Models/Private/Residence/ProvideCare");
const {
  formatDateToLong,formatDateToISO,convertTimeTo12HourFormat,convertTimeTo24HourFormat,formatTimeWithTimeZone
} = require("../../../../../utils/dateFormat");
const { careProData } = require("./getCarePro");
// @type    GET
// @route   /api/v1/residence/resCare/getResCare/getAll/:prospectId/:id
// @desc    Get a resCare by ID
// @access  Public
router.get(
    "/getAll/:prospectId/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {

      try {
        const resCare = await ResCare.findById(req.params.id)
        .populate('care', 'label image') // Use populate to replace the care field with label and image fields
        .exec();
        const modifiedData =   {
          ...resCare.toObject(),     
          imageUrl:resCare.care.image,
          careLabel:resCare.care.label,

        };
        
if (!resCare) {
  return res
    .status(404)
    .json({ 
      variant: "error", 
      message: "Care Data not found" });
}
res.status(200).json({ variant: "success", message: "Care Data Loaded", data: modifiedData });
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
  // @route   /api/v1/residence/resCare/getResCare/getAll/:prospectId
  // @desc    Get all resCares
  // @access  Public
  router.get(
    '/getAll/:prospectId',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      try {
        const myData = await ResCare.find({ prospectId: req.params.prospectId })
          .populate('care', 'label image') // Use populate to replace the care field with label and image fields
          .exec();
          const modifiedData = myData.map((ResCare) => {
                 
            return {
              ...ResCare.toObject(),     
              imageUrl:ResCare.care.image,
              careLabel:ResCare.care.label,
              careType: ResCare.fullCare? "Full Care" : "Partial Care",
              frequency: (ResCare.frequency="daily")? "Daily" : `Every - ${ResCare.days} Days`
            };
          });
          let myUser = await Prospect.findById(req.params.prospectId)
          let ourUser = {firstName:myUser.firstName, lastName:myUser.lastName, room:myUser.room.label, seat:myUser.seat.label,important: myUser.important,userImage:myUser.userImage}
       
        res
          .status(200)
          .json({ variant: 'success', message: 'Care Data Loaded',user:ourUser, data: modifiedData });
      } catch (error) {
        console.log(error);
        res.status(500).json({ variant: 'error', message: 'Internal Server Error' });
      }
    }
  );
  
  
  
  
  // @type    GET
  // @route   /api/v1/resCare/getDataWithPage
  // @desc    Get resCares with pagination
  // @access  Public
  router.post(
    "/getDataWithPage/:PageNumber",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      try {
        const page = parseInt(req.params.PageNumber) || 1; // Get the page number from the route parameters (default to 1)
        const limit = 10; // Number of records to retrieve per page
  
        // Retrieve resCares with pagination
        ResCare.find()
          .skip((page - 1) * limit) // Skip the appropriate number of records based on the page number
          .limit(limit) // Limit the number of records to retrieve
          .then((resCares) => {
            // Calculate total count if it's the first page
            const totalCountPromise =
              page === 1 ? ResCare.countDocuments() : Promise.resolve(0);
  
            // Respond with resCares and total count
            Promise.all([totalCountPromise, resCares])
              .then(([totalCount, resCares]) => {
                const response = {
                  page,
                  totalCount: totalCount || resCares.length, // Use totalCount if available, otherwise use the length of resCares
                  resCares,
                };
                res.status(200).json({ variant: "success",message:"Care Data Loaded", data: response });
              })
              .catch((err) => {
                throw new Error("An error occurred while retrieving resCares.");
              });
          })
          .catch((err) => {
            throw new Error("An error occurred while retrieving resCares.");
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
//@route    /api/v1/residence/resCare/getResCare/getall/:searchResCare
// @desc    route for searching of user from searchbox using any text
// @access  PRIVATE
router.get(
    "/getAll/:searchResCare",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
          const search = req.params.searchResCare; 
        
          try {
            const mydata = await ResCare.aggregate([
              {$match:{$or: [              
                { firstName: new RegExp(search, "i") },
                { lastName: new RegExp(search, "i") },
                { phone: new RegExp(search, "i") },     
              
            ]}},
          
            ]);
           
            res.status(200).json({ variant: "success",message:"Care Data Loaded", data:mydata });
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
// @route   /api/v1/residence/resCare/getResCare/byDate/:prospectId
// @desc    Get all resCares by date
// @access  Public
router.post(
  "/byDate/:prospectId",
  verifyMongoId,
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
   try{
    let timeZone = req.body.timeZone || "+5.30"
    let bodyDate = req.body.date
    let dataToSend = await careProData(bodyDate,req.params.prospectId,timeZone)
     res
     .status(200)
     // .json({pData,updatedSecondFilter});
     .json(dataToSend);
    } catch (error) {
      console.log(error);
      res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
    }
  }
);




  
  module.exports = router;