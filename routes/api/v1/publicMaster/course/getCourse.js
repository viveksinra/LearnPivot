const express = require("express");
const router = express.Router();
const passport = require("passport");
const { formatDateToShortMonth, formatDateToMmDdYyyy, formatDateToISO } = require("../../../../../utils/dateFormat");




  // @type    GET
  // @route   /api/v1/publicMaster/course/getCourse/forPublicPage
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
  // @route   /api/v1/publicMaster/course/getCourse/forPublicPage/:id
  // @desc    Get ledgers with pagination
  // @access  Public
  router.get(
    "/forPublicPage/:id",
    async(req, res) => {
      try {
 const oneCourse = await Course.findOne({_id:req.params.id}).catch(err => console.log(err))

res.status(200).json({
  data:oneCourse,
  message:"One Course Data got loaded",
  variant:"success"
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
  // @route   /api/v1/publicMaster/course/getCourse/getDataWithPage/:type/:limit/:PageNumber
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
  // @route   /api/v1/publicMaster/publicMaster/course/getCourse/getDataWithPage/:type/:limit/:PageNumber/:search
  // @desc    Get ledgers with pagination
  // @access  Public
  router.get(
    "/getDataWithPage/:sort/:limit/:pageNumber/:search",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        const { sort, limit, pageNumber, search } = req.params;
  
        let myMatch = {
          courseTitle: { $regex: new RegExp(search, "i") },
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

    const totalCount = await Course.countDocuments(myMatch);

    const allCourse = await Course.find(myMatch)
        .skip(page * limit)
        .limit(parseInt(limit) || 10)
        .sort(sortBy);

    const modifiedDataPromises = allCourse.map(async (courseData) => {
        const firstDate = await GetStartDate(courseData.dates);
        const formattedDate = formatDateToShortMonth(courseData.date);
        return {
            ...courseData.toObject(),
            firstDate,
            date: formattedDate,
        };
    });

    const modifiedData = await Promise.all(modifiedDataPromises);

    return {
        variant: "success",
        message: "Course Loaded",
        data: modifiedData,
        page,
        totalCount,
    };
};
const GetStartDate = (dates) => {
  if (dates && dates.length > 0 && dates[0].length > 0) {
      return dates[0][0];
  }
  return null; // or any default value you prefer if dates array is empty or malformed
};

  
  // @type    GET
// @route   /api/v1/publicMaster/course/getCourse/getOne/:id
// @desc    Get a course by ID
// @access  Public

router.get(
    "/getOne/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        let myCourse = await Course.findById(req.params.id);
        myCourse.startData = formatDateToISO(myCourse.startData)
      let data =  { ...myCourse.toObject(),
             }
        res.status(200).json({
          variant: "success",
          message: "Course Loaded",
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
  // @route   /api/v1/publicMaster/course/getCourse/getAll
  // @desc    Get all courses
  // @access  Public
  router.get(
    "/getAll",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
     
      try {

        const myData = await Course.find({})
   
        res
          .status(200)
          .json({ variant: "success", message: "Course Loaded", data: myData.reverse() });
      } catch (error) {
        console.log(error)
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );
   // @type    GET
  // @route   /api/v1/publicMaster/course/getCourse/getAll
  // @desc    Get all courses
  // @access  Public
  router.get(
    "/getAll/:search",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
          const search = req.params.search; 
        
          try {
            const mydata = await Course.aggregate([
              {$match:{$or: [              
                { courseTitle: new RegExp(search, "i") },              
              
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
  // @route   /api/v1/publicMaster/publicMaster/course/getCourse/dropdown/getLedger
  // @desc    Get all courses
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
          .json({ variant: "success", message: "Course Loaded", data: dataToSend });
      } catch (error) {
        console.log(error)
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );
  

  module.exports = router;