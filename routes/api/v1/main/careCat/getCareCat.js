const express = require("express");
const router = express.Router();
const passport = require("passport");
const CareCat = require("../../../../../Models/Private/Main/CareCat");
const { verifyMongoId } = require("../../../../../validation/verifyId");

// @type    GET
// @route   /api/v1/main/careCat/getCareCat/getAll/:id
// @desc    Get a careCat by ID
// @access  Public
router.get(
    "/getAll/:id",
  verifyMongoId,
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {

      try {
        const careCat = await CareCat.findById(req.params.id);
if (!careCat) {
  return res
    .status(404)
    .json({ 
      variant: "error", 
      message: "CareCat not found" });
}
res.status(200).json({ variant: "success", message: "CareCat Loaded", data: careCat });
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
  // @route   /api/v1/main/careCat/getCareCat/getAll/
  // @desc    Get all careCats
  // @access  Public
  router.get(
    "/getAll",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
  
      try {
  
        const myData = await CareCat.find({  })
  
        const modifiedData = myData.map(careCat => ({
          ...careCat.toObject(),
      
        }));
  
        res
          .status(200)
          .json({ variant: "success", message: "CareCat Loaded", data: modifiedData.reverse() });
      } catch (error) {
        console.log(error)
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );
  
  
  
  
  // @type    GET
  // @route   /api/v1/careCat/getDataWithPage
  // @desc    Get careCats with pagination
  // @access  Public
  router.post(
    "/getDataWithPage/:PageNumber",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      try {
        const page = parseInt(req.params.PageNumber) || 1; // Get the page number from the route parameters (default to 1)
        const limit = 10; // Number of records to retrieve per page
  
        // Retrieve careCats with pagination
        CareCat.find()
          .skip((page - 1) * limit) // Skip the appropriate number of records based on the page number
          .limit(limit) // Limit the number of records to retrieve
          .then((careCats) => {
            // Calculate total count if it's the first page
            const totalCountPromise =
              page === 1 ? CareCat.countDocuments() : Promise.resolve(0);
  
            // Respond with careCats and total count
            Promise.all([totalCountPromise, careCats])
              .then(([totalCount, careCats]) => {
                const response = {
                  page,
                  totalCount: totalCount || careCats.length, // Use totalCount if available, otherwise use the length of careCats
                  careCats,
                };
                res.status(200).json({ variant: "success",message:"CareCat Loaded", data: response });
              })
              .catch((err) => {
                throw new Error("An error occurred while retrieving careCats.");
              });
          })
          .catch((err) => {
            throw new Error("An error occurred while retrieving careCats.");
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
//@route    /api/v1/main/careCat/getCareCat/getall/:searchCareCat
// @desc    route for searching of user from searchbox using any text
// @access  PRIVATE
router.get(
    "/getAll/:searchCareCat",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
          const search = req.params.searchCareCat; 
        
          try {
            const mydata = await CareCat.aggregate([
              {$match:{$or: [              
                { firstName: new RegExp(search, "i") },
                { lastName: new RegExp(search, "i") },
                { phone: new RegExp(search, "i") },     
              
            ]}},
          
            ]);
           
            res.status(200).json({ variant: "success",message:"CareCat Loaded", data:mydata });
          } catch (error) {
            console.log(error);
            res.status(500).json({
              variant: "error",
              message: "Internal server error" + error.message,
            });
          }
      
    }
  );

  module.exports = router;