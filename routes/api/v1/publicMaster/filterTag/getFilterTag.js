const express = require("express");
const router = express.Router();
const passport = require("passport");
const Community = require("../../../../../Models/Private/PublicMaster/FilterTag");

// @type    GET
// @route   /api/v1/main/community/getCommunity/getAll/:id
// @desc    Get a community by ID
// @access  Public
router.get(
    "/getAll/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        const community = await Community.findById(req.params.id);
if (!community) {
  return res
    .status(404)
    .json({ 
      variant: "error", 
      message: "Community not found" });
}
res.status(200).json({ variant: "success", message: "Community Loaded", data: community });
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
  // @route   /api/v1/main/community/getCommunity/getAll
  // @desc    Get all communitys
  // @access  Public
  router.get(
    "/getAll",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
  
      try {
  
        const myData = await Community.find()   
  
        res
          .status(200)
          .json({ variant: "success", message: "Community Loaded", data: myData });
      } catch (error) {
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );
  
// @type    GET
// @route   /api/v1/main/community/getCommunity/dropDown
// @desc    Get all communities
// @access  Public

router.get("/dropDown", async (req, res) => {
  try {
    const communities = await Community.find();
    
    const dataToSend = communities.map(community => ({
      communityName: community.communityName,
      _id: community._id
    }));
    
    res.status(200).json({
      variant: "success",
      message: "Communities Loaded",
      data: dataToSend
    });
  } catch (error) {
    res.status(500).json({
      variant: "error",
      message: "Internal server error: " + error.message
    });
  }
});

  // @type    GET
  // @route   /api/v1/community/getDataWithPage
  // @desc    Get communitys with pagination
  // @access  Public
  router.post(
    "/getDataWithPage/:PageNumber",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      try {
        const page = parseInt(req.params.PageNumber) || 1; // Get the page number from the route parameters (default to 1)
        const limit = 10; // Number of records to retrieve per page
  
        // Retrieve communitys with pagination
        Community.find()
          .skip((page - 1) * limit) // Skip the appropriate number of records based on the page number
          .limit(limit) // Limit the number of records to retrieve
          .then((communitys) => {
            // Calculate total count if it's the first page
            const totalCountPromise =
              page === 1 ? Community.countDocuments() : Promise.resolve(0);
  
            // Respond with communitys and total count
            Promise.all([totalCountPromise, communitys])
              .then(([totalCount, communitys]) => {
                const response = {
                  page,
                  totalCount: totalCount || communitys.length, // Use totalCount if available, otherwise use the length of communitys
                  communitys,
                };
                res.status(200).json({ variant: "success",message:"Community Loaded", data: response });
              })
              .catch((err) => {
                throw new Error("An error occurred while retrieving communitys.");
              });
          })
          .catch((err) => {
            throw new Error("An error occurred while retrieving communitys.");
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
//@route    /api/v1/enquiry/community/getCommunity/getall/:searchCommunity
// @desc    route for searching of user from searchbox using any text
// @access  PRIVATE
router.get(
    "/getAll/:searchCommunity",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
          const search = req.params.searchCommunity; 
        
          try {
            const mydata = await Community.aggregate([
              {$match:{$or: [              
                { firstName: new RegExp(search, "i") },
                { lastName: new RegExp(search, "i") },
                { phone: new RegExp(search, "i") },     
              
            ]}},
          
            ]);
           
            res.status(200).json({ variant: "success",message:"Community Loaded", data:mydata });
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
  // @route   /api/v1/enquiry/community/getCommunity/dropDown/getAll/:prospectId
  // @desc    Get all communitys
  // @access  Public
  router.get(
    "/dropDown/getAll/:prospectId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
  
      try {
  
        const myData = await Community.find({ prospectId: req.params.prospectId })
  
        const modifiedData = myData.map(community => ({
          _id:community._id,
          label:community.firstName + " "+ community.lastName,
          mobile:community.mobile,
          email:community.emailAddress,
          billingAddress:community.unit,
          billingAddress:community.streetAddress,
          zipCode:community.zipCode,
          state:community.state.label,
          city:community.city,
          image:community.communityImage,
          relation:community.relation.label       
        }));
        let self = await Prospect.findById(req.params.prospectId)
        const selfData = {
          _id:self._id,
          label:"Self ("+ self.lastName+ " " + self.firstName+ ")",
          mobile:self.phone,
          email:self.email,
          billingAddress:self.unit,
          billingAddress:self.streetAddress,
          zipCode:self.zipCode,
          state:self.state?.label,
          city:self.city,
          image:self.userImage,
          relation:"Self" 
        }
        const dataOne = [selfData,...modifiedData];
        res
          .status(200)
          .json({ variant: "success", message: "Community Loaded", data: dataOne });
      } catch (error) {
        console.log(error),
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );

  module.exports = router;