var mongoose = require('mongoose');
const Seat = require("../../Models/Private/Main/Seat");

const validateOnCreate = async (req, res, next) => {
    //   Check if the required fields are present
    if((!mongoose.Types.ObjectId.isValid(req.body.communityId)) 
    ){
      return res.json({
        message:"Invalid community id",
        variant: "error",
      });
    }
      // Check for duplicate
      const seatObj = await getCreateSeatObj(req,"create");
    let mySeat = await Seat.findOne(seatObj)
    if(mySeat){
      console.log(" seat - duplicate")
      return res.json({
        message: "Duplicate data",
        variant: "error",
      });  
    }
    next();

    };


const validateOnUpdate = async (req, res, next) => {
  if((!mongoose.Types.ObjectId.isValid(req.params.id)) 
  ){
    return res.status(400).json({
      message:"Invalid id",
      variant: "error",
    });
  }
      // Check for duplicate
      const seatObj = await getSeatObj(req,"update");
      console.log(seatObj)
    let theSeat = await Seat.findOne(seatObj)

        if(theSeat && theSeat._id !== req.params.id){
      return res.json({
        message: "Duplicate data 1",
        variant: "error",
      });  
    }
    let mySeat = await Seat.findById(req.params.id)

    if(!mySeat){
      return res.json({
        message: "Data not Found",
        variant: "error",
      });  
    }

    if(req.body.changeType && (req.body.changeType !== mySeat.changeType)){
      return res.json({
        message: "Change type issue",
        variant: "error",
      });  
    }
    if(req.params.changeType !== mySeat.changeType){
      return res.json({
        message: "can't update change type",
        variant: "error",
      });  
    }



      next();
  
    };

  

    
    const validateOnDelete = async (req, res, next) => {
      try {
        const data = await Seat.findById(req.params.id);
    
        if (!data) {
          return res.json({
            message: "Invalid Id or Already Deleted",
            variant: "error",
          });
        }
    
        const changeType = data.changeType;
        const query = { [`${changeType}._id`]: req.params.id };
        const newD = await Seat.findOne(query);
        if (newD) {
          return res.json({
            message: `Please Delete the dependent ${changeType === "building" ? "Floor" : changeType === "floor" ? "Room" : "Seat"} first`,
            variant: "error",
          });
        }
    
        next();
      } catch (err) {
        console.error(err);
        return res.status(500).json({
          message: "Internal Server Error",
          variant: "error",
        });
      }
    };
    
    

const generalValidation = async (req, res, next) => {
    //   Check if the required fields are present
      if (!req.params.changeType ) {
        return res.json({
          message: "changeType is required fields.",
          variant: "error",
        });  
      }else if (req.params.changeType != "building" &&
      req.params.changeType != "floor" && 
      req.params.changeType != "room" &&
      req.params.changeType != "seat" ){
        return res.json({
            message: "Change Type is incorrect.",
            variant: "error",
          });  
      }
    //   Check if the required fields are present
      if ((req.params.changeType == "building" || 
      req.params.changeType == "floor" || 
      req.params.changeType == "room" ||
      req.params.changeType == "seat"      
      ) && (!req.body.communityId) ) {
        return res.json({
          message: "communityId is required fields.",
          variant: "error",
        });  
      }
      if ((
      req.params.changeType == "floor" || 
      req.params.changeType == "room" ||
      req.params.changeType == "seat"      
      ) && (!req.body.floor || !req.body.floor.label || !req.body.communityId) ) {
        return res.json({
          message: "Floor and Building is required fields.",
          variant: "error",
        });  
      }
      console.log(req.body)
      if ((
      req.params.changeType == "room" ||
      req.params.changeType == "seat"      
      ) && (!req.body.room || !req.body.room.label || !req.body.floor._id) ) {
        return res.json({
          message: "Room and Floor is required fields.",
          variant: "error",
        });  
      }
      if ((
      req.params.changeType == "seat"      
      ) && (!req.body.seat || !req.body.seat.label || !req.body.room._id) ) {
        return res.json({
          message: "Seat and Room is required fields.",
          variant: "error",
        });  
      }
     
    next();

    };


    


    
    module.exports = { validateOnCreate,generalValidation, validateOnUpdate, validateOnDelete };

async function getCreateSeatObj(req) {
      let changeType = req.params.changeType
      let newSeat = {}
    newSeat.changeType = req.params.changeType  
    // Check and assign values for each parameter based on their type
    if(changeType == "building" && req.body.building){
        if (req.body.building.label) {
          newSeat["building.label"] = req.body.building.label;  
      }
    }
    if(changeType == "floor")
{        
        if (req.body.communityId) {
          newSeat["communityId"] = mongoose.Types.ObjectId(req.body.communityId);  
      }
      if (req.body.floor?.label) {
        newSeat["floor.label"] = req.body.floor.label;  
    }
 }
    if(changeType == "room")
{        
        if (req.body.communityId) {
          newSeat["communityId"] = mongoose.Types.ObjectId(req.body.communityId);  
      }
      if (req.body.floor?._id) {
        newSeat["floor._id"] = req.body.floor._id;  
    }
      if (req.body.room?.label) {
        newSeat["room.label"] = req.body.room.label;  
    }
 }
    if(changeType == "seat")
{        
        if (req.body.communityId) {
          newSeat["communityId"] = mongoose.Types.ObjectId(req.body.communityId);  
      }
      if (req.body.floor?._id) {
        newSeat["floor._id"] = req.body.floor._id;  
    }
      if (req.body.room?._id) {
        newSeat["room._id"] = req.body.room._id;  
    }
      if (req.body.seat?.label) {
        newSeat["seat.label"] = req.body.seat.label;  
    }
 }

 
      return newSeat;
    }
async function getSeatObj(req,type) {
      let changeType = req.params.changeType
  let newSeat = {  
  };
      if(type == "create"){
    newSeat.changeType = req.params.changeType  
    }
    // Check and assign values for each parameter based on their type
    
        if (req.body.building) {
        newSeat.building = {}
        if (req.body.building.label) {
          newSeat.building.label = req.body.building.label;  
        } 
      }
      if(changeType == "floor" || changeType == "room" || changeType == "seat")
      {
        if (req.body.building) {
       
           if (req.body.communityId && (type == "update" || req.body.changeType !== "building")) {
            newSeat.communityId = mongoose.Types.ObjectId(req.body.communityId);
       
          }
        }
        if (req.body.floor && (type == "update" || req.body.changeType !== "floor")) {
        newSeat.floor = {}
        if (req.body.floor.label) {
          newSeat.floor.label = req.body.floor.label;
        }
       
      }
    }
      if( changeType == "room" || changeType == "seat")
      {
        if (req.body.floor) {
       
          if (req.body.floor._id) {
            newSeat.floor._id = mongoose.Types.ObjectId(req.body.floor._id);     
          }
        }
        if (req.body.room ) {
        newSeat.room = {}
        if (req.body.room.label) {
          newSeat.room.label = req.body.room.label;
        }
      
      }
    }
      if( changeType == "seat")
      {
        if (req.body.room) {
       
          if (req.body.room._id) {
            newSeat.room._id = mongoose.Types.ObjectId(req.body.room._id);     
          }
        }
        if (req.body.seat ) {
        newSeat.seat = {}
        if (req.body.seat.label) {
          newSeat.seat.label = req.body.seat.label;
        }
      
      }
      if(type == "update"){
        newSeat.seat._id = mongoose.Types.ObjectId(req.body.seat._id);
      }
    }
 
      return newSeat;
    }