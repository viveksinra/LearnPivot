const express = require("express");
const router = express.Router();
const passport = require("passport");
const RecPayment = require("../../../../../Models/Private/Residence/RecPayment");
const { formatDateToLong, formatDateToISO } = require("../../../../../utils/dateFormat");
const Prospect = require("../../../../../Models/Private/Enquiry/Prospect");

// @type    GET
// @route   /api/v1/residence/recPayment/getRecPayment/getAll/:prospectId/:id
// @desc    Get a recPayment by ID
// @access  Public
router.get(
    "/getAll/:prospectId/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {

   try{
        const recPayment = await RecPayment.findById(req.params.id);
if (!recPayment) {
  return res
    .status(404)
    .json({ 
      variant: "error", 
      message: "Charges not found" });
}
const formattedRecPaymentStartDate = formatDateToISO(recPayment.startDate);
const formattedRecPaymentEndDate = formatDateToISO(recPayment.endDate);
const formattedRecPaymentDate = formatDateToISO(recPayment.date);
const formatedLastModified = formatDateToISO(recPayment.lastModified);
const status = recPayment.discontinue? "Active":"Inactive"
const modifiedData = {
  ...recPayment.toObject(),   
  status:status,
  itemLabel:recPayment.item.label,
  payerTypeLabel:recPayment.payerType.label,
  payerLabel:recPayment.payer.label,
  startDate:formattedRecPaymentStartDate,
  endDate:formattedRecPaymentEndDate,
  date:formattedRecPaymentDate,
  lastModified:formatedLastModified

}

res
.status(200)
.json({ variant: "success", message: "Charges Loaded", data: modifiedData });
}catch (error) {
    console.log(error)
    res
      .json({ 
        variant: "error", 
        message: "Internal server error" + error.message});
  }
    }
  );

  function compareDateToCurrent(inputDate) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison
  
    inputDate.setHours(0, 0, 0, 0);
  
    if (inputDate > currentDate) {
      return true;
    } else if (inputDate <= currentDate) {
      return false;
    }
  }
  function getNextMonthFirstDate() {
    const currentDate = new Date();
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    
    const year = nextMonthDate.getFullYear().toString(); // Get the last two digits of the year
    const month = (nextMonthDate.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
    const day = '01'; // The day is always 01 for the first day of the month
    
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  // @type    GET
  // @route   /api/v1/residence/recPayment/getRecPayment/getAll/:prospectId
  // @desc    Get all recPayments
  // @access  Public
  router.get(
    "/getAll/:prospectId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
     
      try {

        let myMatch = {prospectId: req.params.prospectId}
        
      
        const myData = await RecPayment.find(myMatch)
        const modifiedData = myData.map((recPayment) => {
          const isUpcoming = compareDateToCurrent(recPayment.startDate)
          const formattedRecPaymentStartDate = formatDateToISO(recPayment.startDate);
          const formattedRecPaymentEndDate = formatDateToISO(recPayment.endDate);
          const formattedRecPaymentStartDateT = formatDateToLong(recPayment.startDate);
          const formattedRecPaymentEndDateT = formatDateToLong(recPayment.endDate);
          const formattedRecPaymentDate = formatDateToLong(recPayment.date);
          const formatedLastModified = formatDateToLong(recPayment.lastModified);
          const formatedCountedTill = formatDateToLong(recPayment.countedTill);
           let discontinue = false
          if(recPayment.endDate){
            discontinue = compareDateToCurrent(recPayment.endDate)? false:true
        }
          return {
            ...recPayment.toObject(),   
            isUpcoming:isUpcoming,
            discontinue:discontinue,
            itemLabel:recPayment.item.label,
            payerTypeLabel:recPayment.payerType.label,
            payerLabel:recPayment.payer.label,
            countedTill:formatedCountedTill,
            startDate:formattedRecPaymentStartDate,
            endDate:formattedRecPaymentEndDate,
            startDateT:formattedRecPaymentStartDateT,
            endDateT:formattedRecPaymentEndDateT,
            date:formattedRecPaymentDate,
            lastModified:formatedLastModified
          };
        });
        let totalNexPay = 0;
        let x = 0;
        while(x<modifiedData.length){
          let myd = modifiedData[x]

          if(!myd.isUpcoming && !myd.discontinue){
            totalNexPay = totalNexPay + +myd.price
          }

          x++
        }
        
        let recInfo = {
          totalNexPay,
          recStatus:true,
          nextRecDate:getNextMonthFirstDate(),
          careLevel:1,
          carePrice:500,
        }
        let myUser = await Prospect.findById(req.params.prospectId)
        let ourUser = {firstName:myUser.firstName, lastName:myUser.lastName, room:myUser.room.label, seat:myUser.seat.label,important: myUser.important,userImage:myUser.userImage}
     
        res
          .status(200)
          .json({ variant: "success", message: "Charges Loaded",recInfo,user:ourUser, data: modifiedData });
      } catch (error) {
        console.log(error),
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );
  
  
  
  // @type    GET
  // @route   /api/v1/recPayment/getDataWithPage
  // @desc    Get recPayments with pagination
  // @access  Public
  router.post(
    "/getDataWithPage/:PageNumber",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      try {
        const page = parseInt(req.params.PageNumber) || 1; // Get the page number from the route parameters (default to 1)
        const limit = 10; // Number of records to retrieve per page
  
        // Retrieve recPayments with pagination
        RecPayment.find()
          .skip((page - 1) * limit) // Skip the appropriate number of records based on the page number
          .limit(limit) // Limit the number of records to retrieve
          .then((recPayments) => {
            // Calculate total count if it's the first page
            const totalCountPromise =
              page === 1 ? RecPayment.countDocuments() : Promise.resolve(0);
  
            // Respond with recPayments and total count
            Promise.all([totalCountPromise, recPayments])
              .then(([totalCount, recPayments]) => {
                const response = {
                  page,
                  totalCount: totalCount || recPayments.length, // Use totalCount if available, otherwise use the length of recPayments
                  recPayments,
                };
                res.status(200).json({ variant: "success",message:"Charges Loaded", data: response });
              })
              .catch((err) => {
                throw new Error("An error occurred while retrieving recPayments.");
              });
          })
          .catch((err) => {
            throw new Error("An error occurred while retrieving recPayments.");
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
//@route    /api/v1/residence/recPayment/getRecPayment/getall/:searchRecPayment
// @desc    route for searching of user from searchbox using any text
// @access  PRIVATE
router.get(
    "/getAll/:searchRecPayment",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
          const search = req.params.searchRecPayment; 
        
          try {
            const mydata = await RecPayment.aggregate([
              {$match:{$or: [              
                { firstName: new RegExp(search, "i") },
                { lastName: new RegExp(search, "i") },
                { phone: new RegExp(search, "i") },     
              
            ]}},
          
            ]);
           
            res.status(200).json({ variant: "success",message:"Charges Loaded", data:mydata });
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
  // @route   /api/v1/residence/recPayment/getRecPayment/dropDown/getAll/:prospectId
  // @desc    Get all contacts
  // @access  Public
  router.get(
    "/dropDown/getAll/:prospectId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        const myMatch = {
          prospectId: req.params.prospectId,
          discontinue: false,
          isDone: false
        };
  
        const myData = await RecPayment.find(myMatch);
        const modifiedData = myData.map((recPayment) => {
          const isUpcoming = compareDateToCurrent(recPayment.startDate);
          let discontinue = false;
  
          if (recPayment.endDate) {
            discontinue = compareDateToCurrent(recPayment.endDate) ? false : true;
          }
  
          // Check for both isUpcoming and discontinue conditions before returning
          if (!isUpcoming && !discontinue) {
            return {
              ...recPayment.toObject(),
              isUpcoming: isUpcoming,
              discontinue: discontinue,
              itemLabel: recPayment.item.label
            };
          }  
          return null; // Return null for other cases
        });
  
        // Filter out null values from modifiedData
        const filteredData = modifiedData.filter((item) => item !== null);
        const recCharge = filteredData.filter((item) => item.recurring == true);
        const oneTime = filteredData.filter((item) => item.recurring == false);
        let modOneTime = oneTime.map((one) => {
          let taxValue = ((+one.price * +one.taxPercent)/100)


          return{
            _id:one._id,
            label:one.item.label,
            category:"One Time",
            issuedOn:one.startDate,
            price:one.price ,
            qty:"1",
            amount:one.price,
            taxPercent:one.taxPercent,
            taxValue:taxValue.toFixed(2)
          }
        })
        let recUpdated = []
        let x = 0
        while(x<recCharge.length){
          let myData = recCharge[x]
           let dInfo = await calculateDateInfo(myData.startDate,myData.countedDays)
           console.log(dInfo)
         let myAmount = +(+(+(myData.price)/dInfo.totalDayInMonth)*dInfo.countDay)
         let taxValue = ((+myAmount * +myData.taxPercent)/100)
         let totalAmount = +myAmount + +taxValue
         let data = {
          _id:myData._id,
          label:myData.item.label,
          category:"Recurring",
          issuedOn:formatDateToLong(dInfo.nextStartDay),
          price:myData.price + "/Mon",
          qty:dInfo.countDay + " Days",
          withOutTaxamount:myAmount.toFixed(2),
          amount:totalAmount.toFixed(2),
          taxPercent:myData.taxPercent,
          taxValue:taxValue.toFixed(2),
          period:dInfo.period
         }
           recUpdated.push(data)
           x++
        }
        const charges = recUpdated.concat(modOneTime);
        res.status(200).json({
          variant: "success",
          message: "Charges Loaded",
          data: charges
        });
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({
          variant: "error",
          message: "Internal Server Error"
        });
      }
    }
  );

  function calculateDateInfo(inputDate,countedDays) {
    const date = new Date(inputDate);
    date.setDate(date.getDate() + +countedDays);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  
    const countDay = lastDayOfMonth - day + 1;
    const nextMonthStartDate = new Date(year, month + 1, 1);
    const currentMonthStartDate = new Date(year, month, 1);
    const period = `${currentMonthStartDate.getDate()}-${month + 1}-${year} to ${lastDayOfMonth}-${month + 1}-${year}`;
  
    return {
      countDay: countDay,
      nextStartDay: nextMonthStartDate.toISOString(),
      period: period,
      totalDayInMonth: lastDayOfMonth
    };
  }
  


  module.exports = router;