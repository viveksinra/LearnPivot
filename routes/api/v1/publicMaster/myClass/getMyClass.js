const express = require("express");
const router = express.Router();
const passport = require("passport");
const { formatDateToShortMonth, formatDateToMmDdYyyy, formatDateToISO } = require("../../../../../utils/dateFormat");




  // @type    GET
  // @route   /api/v1/publicMaster/myClass/getMyClass/forPublicPage
  // @desc    Get ledgers with pagination
  // @access  Public
  router.post(
    "/forPublicPage",
    async(req, res) => {
      try {
let myMatch = {isPublished:true }
const sort = "D";
const limit = 100;
const pageNumber = 0;
  const resp = await comGetAllAndSearch( myMatch, sort, limit, pageNumber);
res.status(200).json(resp);

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
  // @route   /api/v1/publicMaster/myClass/getMyClass/getDataWithPage/:type/:limit/:PageNumber
  // @desc    Get ledgers with pagination
  // @access  Public
  router.get(
    "/getDataWithPage/:sort/:limit/:PageNumber",
    passport.authenticate("jwt", { session: false }),
    async(req, res) => {
      try {
let myMatch = { }
  const { sort, limit, pageNumber, search } = req.params;
  const resp = await comGetAllAndSearch( myMatch, sort, limit, pageNumber);
res.status(200).json(resp);

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
  // @route   /api/v1/publicMaster/publicMaster/myClass/getMyClass/getDataWithPage/:type/:limit/:PageNumber/:search
  // @desc    Get ledgers with pagination
  // @access  Public
  router.get(
    "/getDataWithPage/:sort/:limit/:pageNumber/:search",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        const { sort, limit, pageNumber, search } = req.params;
  
        let myMatch = {
          classTitle: { $regex: new RegExp(search, "i") },
          // Add more fields as needed for searching
        };
  
        const resp = await comGetAllAndSearch( myMatch, sort, limit, pageNumber);
        
        res.status(200).json(resp);
      } catch (error) {
        console.error(error);
        res.status(500).json({
          variant: "error",
          message: "Internal server error: " + error.message,
        });
      }
    }
  );
  
  
  const comGetAllAndSearch = async (myMatch, sort, limit, pageNumber) => {
    const page = parseInt(pageNumber) || 0;
    let sortBy = { date: -1 };
  
    if (sort === "oldToNew") {
      sortBy = { date: 1 };
    } else if (sort === "isPublished") {
      sortBy = { isPublished: -1 };
    }
  
    const totalCount = await MyClass.countDocuments(myMatch);
  
    const allMyClass = await MyClass.find(myMatch)
      .skip(page * limit)
      .limit(parseInt(limit) || 10)
      .sort(sortBy);
  
    const modifiedDataPromises = allMyClass.map((classData) => ({
      ...classData.toObject(),
      startDate: formatDateToShortMonth(classData.startDate),
      date: formatDateToShortMonth(classData.date),
    }));
  
    const modifiedData = await Promise.all(modifiedDataPromises);
  
    return {
      variant: "success",
      message: "MyClass Loaded",
      data: modifiedData,
      page,
      totalCount,
    };
  };
  
  // @type    GET
// @route   /api/v1/publicMaster/myClass/getMyClass/getOne/:id
// @desc    Get a myClass by ID
// @access  Public

router.get(
    "/getOne/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        let myMyClass = await MyClass.findById(req.params.id);
        myMyClass.startData = formatDateToISO(myMyClass.startData)
      let data =  { ...myMyClass.toObject(),
              startDate : formatDateToISO(myMyClass.startDate),          
             }
        res.status(200).json({
          variant: "success",
          message: "MyClass Loaded",
          data: data,
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
  // @route   /api/v1/publicMaster/myClass/getMyClass/getAll
  // @desc    Get all myClasss
  // @access  Public
  router.get(
    "/getAll",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
     
      try {

        const myData = await MyClass.find({})
   
        res
          .status(200)
          .json({ variant: "success", message: "MyClass Loaded", data: myData.reverse() });
      } catch (error) {
        console.log(error)
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );
   // @type    GET
  // @route   /api/v1/publicMaster/myClass/getMyClass/getAll
  // @desc    Get all myClasss
  // @access  Public
  router.get(
    "/getAll/:search",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
          const search = req.params.search; 
        
          try {
            const mydata = await MyClass.aggregate([
              {$match:{$or: [              
                { classTitle: new RegExp(search, "i") },              
              
            ]}},
          
            ]);
           
            res.status(200).json({ variant: "success",message:"Leave Loaded", data:mydata });
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
  // @route   /api/v1/publicMaster/publicMaster/myClass/getMyClass/dropdown/getLedger
  // @desc    Get all myClasss
  // @access  Public
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
          .json({ variant: "success", message: "MyClass Loaded", data: dataToSend });
      } catch (error) {
        console.log(error)
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );
  

  module.exports = router;