const express = require("express");
const router = express.Router();
const passport = require("passport");
const Prospect = require("../../../../../Models/Private/Enquiry/Prospect");
const Contact = require("../../../../../Models/Private/Enquiry/Contact");
const Task = require("../../../../../Models/Private/Enquiry/Task");
const Note = require("../../../../../Models/Private/Enquiry/Note");

// @type    GET
// @route   /api/v1/enquiry/prospect/getProspect/getOne/:id
// @desc    Get a prospect by ID
// @access  Public
router.get(
    "/getOne/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        const prospect = await Prospect.findById(req.params.id);
if (!prospect) {
  return res
    .status(404)
    .json({ 
      variant: "error", 
      message: "Prospect not found" });
}
const totalCount = await totalCountCTN(req.params.id)
const formatDate = (date) => {
  if(date)
 { 
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${year}-${month}-${day}`;

}else {
  return ""
}
};

const formattedProspect = {
  variant: 'success',
  message: 'Prospect Loaded',
  data: {
    totalCount:totalCount,
    salesAgent: prospect.salesAgent._id ? prospect.salesAgent : null, 
    prospectStage: prospect.prospectStage.id ? prospect.prospectStage : null, // Check if _id exists
    prospectSource: prospect.prospectSource._id ? prospect.prospectSource : null, // Check if _id exists
    gender: prospect.gender,
    state: prospect.state,
    inquiryDate: formatDate(prospect.inquiryDate),
    prospectScore: prospect.prospectScore,
    marketingStatus: prospect.marketingStatus,
    important: prospect.important,
    communityId: prospect.community,
    company: prospect.company,
    _id: prospect._id,
    user: prospect.user,
    ssNumber:prospect.ssNumber,
    financialMoveInDate: formatDate(prospect.financialMoveInDate),
    physicalMoveInDate: formatDate(prospect.physicalMoveInDate),
    userImage: prospect.userImage || "https://res.cloudinary.com/oasismanors/image/upload/v1687519053/user_myqgmv.png",
    firstName: prospect.firstName,
    lastName: prospect.lastName,
    dateOfBirth: formatDate(prospect.dateOfBirth),
    phone: prospect.phone,
    email: prospect.email,
    streetAddress: prospect.streetAddress,
    home: prospect.home,
    office: prospect.office,
    message: prospect.message,
    unit: prospect.unit,
    city: prospect.city,
    zipCode: prospect.zipCode,
    date: formatDate(prospect.date),
    __v: prospect.__v
  }
};
   
        res.status(200).json(formattedProspect);
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

  const totalCountCTN = async(pId) => {

    let totalContact = await Contact.find({prospectId:pId}).countDocuments()
    let totalPendingTask = await Task.find({prospectId:pId}).countDocuments()
    let totalNotes = await Note.find({prospectId:pId}).countDocuments();

      let totalCount = {
        totalContact: totalContact,
        totalPendingTask: totalPendingTask,
        totalNotes:totalNotes
      }
    return totalCount
  }
  
  // @type    GET
  // @route   /api/v1/enquiry/prospect/getProspect/getAll
  // @desc    Get all prospects
  // @access  Public
  router.get(
    "/getAll",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {

      try {
        const mydata = await Prospect.aggregate([
        {$match:{isResidence:false}},
          {
            $project: {
              _id: 1,
              firstName: 1,
              lastName: 1,
              prospectScore:1,
              phone: 1,
              city: 1,
              userImage:1,
              inquiryDate: {
                $concat: [
                  { $substr: [{ $month: "$inquiryDate" }, 0, -1] },
                  "-",
                  { $substr: [{ $dayOfMonth: "$inquiryDate" }, 0, -1] },
                  "-",
                  { $substr: [{ $year: "$inquiryDate" }, 0, -1] }
                ]
              },
              important: 1,
              email:1,
              streetAddress:1,
              unit:1,
              prospectStage: "$prospectStage.label",
              state: "$state.label"
            }
          }
        ]);
      
        const monthNames = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        
        mydata.forEach((item) => {
            item.firstName = item.firstName || ""
            item.lastName = item.lastName || "";
            item.phone = item.phone || "";
            item.prospectScore = +item.prospectScore || 0;
            item.city = item.city || "";
            item.inquiryDate = item.inquiryDate || "";
            item.important = item.important || "";
            item.prospectStage = item.prospectStage || "";
            item.state = item.state || "";   
            item.userImage = item.userImage || "";   
            item.email = item.email || "";   
            item.streetAddress = item.streetAddress || "";   
            item.unit = item.unit || "";   

          if (item.inquiryDate) {
            const [month, day, year] = item.inquiryDate.split('-');
            const formattedDate = `${monthNames[parseInt(month) - 1]}-${day}-${year}`;
            item.inquiryDate = formattedDate;
          }
          
        });


        res.status(200).json({ variant: "success",message:"Prospect Loaded", data:mydata.reverse() });
      
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
  // @route   /api/v1/prospect/getDataWithPage
  // @desc    Get prospects with pagination
  // @access  Public


  router.get(
    "/getDataWithPage/:sort/:limit/:PageNumber",
    passport.authenticate("jwt", { session: false }),
    async(req, res) => {
      try {
        // Calculate total count if it's the first page
      

        let data = await getSearchFun(req)
        res.status(200).json(data);


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
//@route    /api/v1/enquiry/prospect/getProspect/getDataWithPage/:sort/:limit/:PageNumber/:search
// @desc    route for searching of user from searchbox using any text
// @access  PRIVATE
router.get(
  "/getDataWithPage/:sort/:limit/:PageNumber/:search",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {
    try {
  


     let data = await getSearchFun(req)
      res.status(200).json(data);

    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

const getSearchFun = async (req) => {
  try {
    const page = parseInt(req.params.PageNumber) || 1; // Get the page number from the route parameters (default to 1)
    const limit = parseInt(req.params.limit) || 10; // Number of records to retrieve per page
    let myMatch = {
      isResidence:false
     }
    if(req.params.search){
  const searchQuery = req.params.search
  // Calculate total count if it's the first page
   myMatch = {
    isResidence:false,
    $or: [
      { firstName: { $regex: new RegExp(searchQuery, "i") } },
      { lastName: { $regex: new RegExp(searchQuery, "i") } },
      { phone: { $regex: new RegExp(searchQuery, "i") } },
      { email: { $regex: new RegExp(searchQuery, "i") } },
      { "prospectStage.label": { $regex: new RegExp(searchQuery, "i") } },
      // Add more fields as needed for searching
    ],
  }
}
let sort = req.params.sort
let sortBy = { date: -1 }

if(sort == "oldToNew"){
  sortBy = { date: +1 }
}else if(sort == "rating"){
  sortBy = { prospectScore: -1 }
}else if(sort == "important"){
  sortBy = { important: -1 }
}

    const totalCount = await Prospect.countDocuments(myMatch);

    // Retrieve ledgers with pagination, populating the 'under' property
    const mydata = await Prospect.aggregate([
      { $match: myMatch },
      { $sort: sortBy }, // Sort by date in descending order
      { $skip: (page - 1) * limit }, // Skip the appropriate number of records based on the page number
      { $limit: limit }, // Limit the number of records to retrieve
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            prospectScore:1,
            phone: 1,
            city: 1,
            userImage:1,
            inquiryDate: {
              $concat: [
                { $substr: [{ $month: "$inquiryDate" }, 0, -1] },
                "-",
                { $substr: [{ $dayOfMonth: "$inquiryDate" }, 0, -1] },
                "-",
                { $substr: [{ $year: "$inquiryDate" }, 0, -1] }
              ]
            },
            important: 1,
            email:1,
            streetAddress:1,
            unit:1,
            prospectStage: "$prospectStage.label",
            state: "$state.label"
          }
        }
      ]);
    
      const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
      
      mydata.forEach((item) => {
          item.firstName = item.firstName || ""
          item.lastName = item.lastName || "";
          item.phone = item.phone || "";
          item.prospectScore = +item.prospectScore || 0;
          item.city = item.city || "";
          item.inquiryDate = item.inquiryDate || "";
          item.important = item.important || "";
          item.prospectStage = item.prospectStage || "";
          item.state = item.state || "";   
          item.userImage = item.userImage || "";   
          item.email = item.email || "";   
          item.streetAddress = item.streetAddress || "";   
          item.unit = item.unit || "";   

        if (item.inquiryDate) {
          const [month, day, year] = item.inquiryDate.split('-');
          const formattedDate = `${monthNames[parseInt(month) - 1]}-${day}-${year}`;
          item.inquiryDate = formattedDate;
        }
        
      });


      const dataToSend = {
        variant: "success",
        message: "Prospect Loaded",
        data: mydata,
        page: page,
        totalCount: totalCount,
      };
  
      return dataToSend;
  } catch (err) {
    console.error("An error occurred while retrieving ledgers:", err);
    throw err; // Re-throw the error so it can be caught in the route handler
  }
};

  module.exports = router;