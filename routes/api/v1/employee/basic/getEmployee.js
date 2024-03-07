const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../../../../Models/User");

// @type    GET
// @route   /api/v1/employee/basic/getEmployee/getAll/:id
// @desc    Get a user by ID
// @access  Public

router.get(
  "/getAll/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let myUser = await User.findById(req.params.id);
      if (!myUser) {
        return res.status(404).json({
          variant: "error",
          message: "User not found",
        });
      } else {
        let formattedObj = myUser.toObject();
        delete formattedObj.dob;
        res.status(200).json({
          variant: "success",
          message: "User Loaded",
          data: formattedObj,
        });
      }
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
  // @route   /api/v1/employee/basic/getEmployee/getAll
  // @desc    Get all users
  // @access  Public
  router.get(
    "/getAll",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
     
      try {
     let myUser = await User.find().catch(err => {console.log(err);});

        
        res
          .status(200)
          .json({ variant: "success", message: "User Loaded", data: myUser.reverse() });
      } catch (error) {
        console.log(error)
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );
  
  
  
  // @type    GET
  // @route   /api/v1/user/getDataWithPage
  // @desc    Get users with pagination
  // @access  Public
  router.post(
    "/getDataWithPage/:PageNumber",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      try {
        const page = parseInt(req.params.PageNumber) || 1; // Get the page number from the route parameters (default to 1)
        const limit = 10; // Number of records to retrieve per page
  
        // Retrieve users with pagination
        User.find()
          .skip((page - 1) * limit) // Skip the appropriate number of records based on the page number
          .limit(limit) // Limit the number of records to retrieve
          .then((users) => {
            // Calculate total count if it's the first page
            const totalCountPromise =
              page === 1 ? User.countDocuments() : Promise.resolve(0);
  
            // Respond with users and total count
            Promise.all([totalCountPromise, users])
              .then(([totalCount, users]) => {
                const response = {
                  page,
                  totalCount: totalCount || users.length, // Use totalCount if available, otherwise use the length of users
                  users,
                };
                res.status(200).json({ variant: "success",message:"User Loaded", data: response });
              })
              .catch((err) => {
                throw new Error("An error occurred while retrieving users.");
              });
          })
          .catch((err) => {
            throw new Error("An error occurred while retrieving users.");
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
//@route    /api/v1/employee/basic/getEmployee/getall/:searchUser
// @desc    route for searching of user from searchbox using any text
// @access  PRIVATE
router.get(
    "/getAll/:searchUser",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
          const search = req.params.searchUser; 
        
          try {
            const mydata = await User.aggregate([
              {$match:{$or: [              
                { firstName: new RegExp(search, "i") },
                { lastName: new RegExp(search, "i") },
                { phone: new RegExp(search, "i") },     
              
            ]}},
          
            ]);
           
            res.status(200).json({ variant: "success",message:"User Loaded", data:mydata });
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