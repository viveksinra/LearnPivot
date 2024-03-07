const express = require("express");
const router = express.Router();
const passport = require("passport");
const Seat = require("../../../../../Models/Private/Main/Seat");
var mongoose = require('mongoose');
  
// @type    GET
//@route    /api/v1/main/seat/getSeat/get/:changeType
// @desc    route for searching of user from searchbox using any text
// @access  PRIVATE
router.post(
    "/get/:changeType",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
          const changeType = req.params.changeType; 
          let myMatch = {}
          myMatch.changeType = changeType
          if(changeType == "floor"){
            if(req.body.communityId){
           
              myMatch["communityId"] = mongoose.Types.ObjectId(req.body.communityId)
            }else{
             return res         
              .json({ variant: "error",message:"Community Required", data:[] });
            }
          }
          if(changeType == "room" ){
            if(req.body.floor?._id){
              myMatch["floor._id"] = mongoose.Types.ObjectId(req.body.floor._id)

            }else{
            return  res.json({ variant: "error",message:"floor Required", data:[] });
            }
          }
          if(changeType == "seat"){
            if(req.body.room?._id){
              myMatch["room._id"] = mongoose.Types.ObjectId(req.body.room._id)
            }else{
             return res.json({ variant: "error",message:"room Required", data:[] });
            }
          }
          try {
            const mydata = await Seat.aggregate([
              { $match: myMatch },
              {
                $project: {
                  changeType: 1,
                  data: {
                    $switch: {
                      branches: [
                        { case: { $eq: ["$changeType", "floor"] }, then: "$floor" },
                        { case: { $eq: ["$changeType", "room"] }, then: "$room" },
                        { case: { $eq: ["$changeType", "seat"] }, then: "$seat" }
                      ],
                      default: null
                    }
                  }
                }
              }
            ]);
            const transformedData = mydata.map(item => ({
              label: item.data.label,
              buildingNumber:item.data.buildingNumber,
              _id: item._id
            }));
            
           
            res.status(200).json({ variant: "success",message:"Data Loaded", data:transformedData });
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