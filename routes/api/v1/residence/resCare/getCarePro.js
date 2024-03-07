const ResCare = require("../../../../../Models/Private/Residence/ResCare");
const CareCat = require("../../../../../Models/Private/Main/CareCat");
const Prospect = require("../../../../../Models/Private/Enquiry/Prospect");
const {verifyMongoId} = require("./../../../../../validation/verifyId");
const ProvideCare = require("../../../../../Models/Private/Residence/ProvideCare");
const {
  formatDateToLong,formatDateToISO,convertTimeTo12HourFormat,convertTimeTo24HourFormat,formatTimeWithTimeZone
} = require("../../../../../utils/dateFormat");

async function careProData(bodyDate,prospectId,timeZone){
    
 // Parse the time zone offset
 const timeZoneOffset = parseFloat(timeZone);
 const timeZoneHours = Math.floor(timeZoneOffset);
 let decimalValue = timeZoneOffset % 1; // Get the decimal value
 let timeZoneMinutes = decimalValue.toFixed(2).split('.')[1]; // Extract the decimal places
 
 //getting the time
 let myDate = new Date();
      if(bodyDate){
        myDate = new Date(bodyDate);

      }else{

        myDate.setUTCHours(myDate.getUTCHours() + Math.abs(timeZoneHours));
        myDate.setUTCMinutes(myDate.getUTCMinutes() + Math.abs(timeZoneMinutes));
    
    }

           // Set the time to midnight in UTC
           myDate.setUTCHours(0, 0, 0, 0);
        
           // Convert the date to ISO format
         const fdate = myDate.toISOString();


    //  .........................................

      // Set the start date to midnight in UTC
      const sDate = new Date(fdate);
      sDate.setUTCHours(0, 0, 0, 0);
      sDate.setUTCHours(sDate.getUTCHours() - Math.abs(timeZoneHours));
      sDate.setUTCMinutes(sDate.getUTCMinutes() - Math.abs(timeZoneMinutes));

      // Set the end time to 11:59:59 PM in UTC
      const eDate = new Date(fdate);
      eDate.setUTCHours(23, 59, 59, 999);
      eDate.setUTCHours(eDate.getUTCHours() - Math.abs(timeZoneHours));
      eDate.setUTCMinutes(eDate.getUTCMinutes() - Math.abs(timeZoneMinutes));

      // Get the resCares based on the date range and prospectId
      const myData = await ResCare.find({
        prospectId: prospectId,
        discontinue: false,
        prn: false,
      })
        .populate("care", "label image")
        .exec();

      const modifiedData = myData.map((resCare) => {
        return {
          ...resCare.toObject(),
          imageUrl: resCare.care.image,
          careLabel: resCare.care.label,
          careType: resCare.fullCare ? "Full Care" : "Partial Care",
          frequency:
            resCare.frequency === "daily"
              ? "Daily"
              : `Every - ${resCare.days} Days`,
        };
      });

      const firstFilter = [];

      modifiedData.forEach((item) => {
        const timing = item.timing;
        timing.forEach((entry) => {
          const new_item = { ...item };
          new_item.time = entry.time;
          new_item.qty = entry.qty;
          delete new_item.timing;
          firstFilter.push(new_item);
        });
      });

      // Get the ProvideCare data based on the date range
      const pData = await ProvideCare.find({
        date: { $gte: sDate, $lte: eDate },
        isProvided: true,
      });

      // Update the ResCare data with the ProvideCare data
      let updatedSecondFilter = await upDateWithPdata(pData, firstFilter, fdate);

      let dataToSend = { variant: "success", message: "Data Loaded",data: updatedSecondFilter }
      return dataToSend
   
 
  }

  const upDateWithPdata = (pData, firstFilter, fDate) => {

    let updatedSecondFilter = [];
  
    // Loop through each object in pData
    for (let i = 0; i < pData.length; i++) {
      // Get the resCareId, time, and qty from the current object in pData
      const { resCareId, time, qty } = pData[i];
      
      // Find the matching object in firstFilter based on _id
  
      const filteredSecondFilter = firstFilter.filter(obj => {
        return obj._id.toString() === resCareId.toString();
      });
  
      if (filteredSecondFilter.length >= 1) {
        // If a matching object is found in firstFilter
        let ourFilter = filteredSecondFilter;
        if (filteredSecondFilter.length <= 0) {
          ourFilter = filteredSecondFilter;
        }
        const { isClicked, ...rest } = ourFilter[0];
        const datePassed = new Date(fDate) < new Date();
        
        // Update the matching object in firstFilter with the required fields
        const updatedObj = {
          ...rest,
          isClicked: true,
          isProvided: true,
          datePassed,
          pDate: formatDateToLong(pData[i].date) || "",
          pTime: formatTimeWithTimeZone(pData[i].date) || "",
          rejectionReason: pData[i].rejectionReason || ""
        };
        updatedSecondFilter.push(updatedObj);
      }
    }
  
    // Loop through each object in firstFilter
    for (let i = 0; i < firstFilter.length; i++) {
      const matchingObj = updatedSecondFilter.find(obj => obj._id === firstFilter[i]._id);
      
      if (!matchingObj) {
        // If no matching object is found in updatedSecondFilter based on _id
        const updatedObj = {
          ...firstFilter[i],
          isClicked: false,
          isProvided: false,
          datePassed: new Date(fDate) < new Date(),
          pDate: "",
          pTime: "",
          rejectionReason: ""
        };
        
        updatedSecondFilter.push(updatedObj);
      }
    }
  
    return updatedSecondFilter;
  };

  module.exports = {careProData}