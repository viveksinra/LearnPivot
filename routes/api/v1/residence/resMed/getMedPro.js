const ProvideMed = require("../../../../../Models/Private/Residence/ProvideMed");
const {
  formatDateToLong,convertTimeTo12HourFormat,convertTimeTo24HourFormat,formatTimeWithTimeZone
} = require("../../../../../utils/dateFormat");
const ResMed = require("../../../../../Models/Private/Residence/ResMed");

async function medProData(bodyDate,prospectId,timeZone){
    {     
      let fdate = new Date();
  
      if(bodyDate){
        const date = new Date(bodyDate);

        // Set the time to midnight in UTC
        date.setUTCHours(0, 0, 0, 0);
        
        // Convert the date to ISO format
        fdate = date.toISOString();
      }
    //  .........................................
 // Parse the time zone offset
const timeZoneOffset = parseFloat(timeZone);
const timeZoneHours = Math.floor(timeZoneOffset);
let decimalValue = timeZoneOffset % 1; // Get the decimal value
let timeZoneMinutes = decimalValue.toFixed(2).split('.')[1]; // Extract the decimal places
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

    //  .........................................

      try {
        const pData = await ProvideMed.find({
          date: { $gte: sDate, $lte: eDate },
          isProvided: true
        });

        const myData = await ResMed.find({prospectId: prospectId,prn:false,discontinue:false})
        const myData2 = await ResMed.find({prospectId: prospectId,prn:true,discontinue:false}).lean();
        const firstFilter = myData.filter(obj => {
          const startDate = new Date(obj.startDate).setHours(0, 0, 0, 0);
          const endDate = obj.endDate ? new Date(obj.endDate).setHours(0, 0, 0, 0) : null;
          const targetDate = new Date(fdate).setHours(0, 0, 0, 0);
      // console.log({startDate,endDate,ourEnd:obj.endDate,targetDate,type:obj.type})
          return (startDate <= targetDate && (endDate === null || endDate >= targetDate));
        });

        const secondFilter = [];

firstFilter.forEach((item) => {
  const timing = item.timing;
  
  timing.forEach((entry) => {
    const new_item = { ...item.toObject() };
    new_item.time = entry.time;
    new_item.qty = entry.qty;
    delete new_item.timing;
    secondFilter.push(new_item);
  });
});
// start here
let updatedSecondFilter = await upDateWithPdata(pData,secondFilter,fdate)

        const thirdFilter = updatedSecondFilter.map((resMed) => {
          const formattedTime = convertTimeTo12HourFormat(resMed.time);
          const formatedStartDate = resMed.startDate?formatDateToLong(resMed.startDate): "Not Given";
          const formatedEndDate = resMed.endDate?formatDateToLong(resMed.endDate):"Not Given";
          return {
            ...resMed,    
            startDate:formatedStartDate,
            endDate:formatedEndDate,
            time:formattedTime
          };
        });
const mergedArray = [...thirdFilter, ...myData2];
        const modifiedData = mergedArray.map((resMed) => {
          const formattedResMedDate = formatDateToLong(resMed.date);
          const formatedLastModified = formatDateToLong(resMed.lastModified);
          const formatedImage = resMed.image || "https://onemg.gumlet.io/l_watermark_346,w_240,h_240/a_ignore,w_240,h_240,c_fit,q_auto,f_auto/hx2gxivwmeoxxxsc1hix.png";
          return {
            ...resMed,            
            qty:resMed.qty || "As Needed",
            date:formattedResMedDate,
            lastModified:formatedLastModified,
            image:formatedImage,
          };
        });
let dataToSend = { variant: "success", message: "Data Loaded",data: mergedArray }
      return dataToSend
      } catch (error) {
        console.log(error)
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  }
// function to update with filter 
const upDateWithPdata = (pData, secondFilter, fDate) => {
  let updatedSecondFilter = [];

  // Loop through each object in pData
  for (let i = 0; i < pData.length; i++) {
    // Get the resMedId, time, and qty from the current object in pData
    const { resMedId, time, qty } = pData[i];
    const newTime = convertTimeTo24HourFormat(time);
    
    // Find the matching object in secondFilter based on _id
    const filteredSecondFilter = secondFilter.filter(obj => {
      return obj._id.toString() === resMedId.toString() && obj.time === newTime;
    });
    const filteredSecondFilter2 = secondFilter.filter(obj => {
      return obj._id.toString() === resMedId.toString();
    });

    if (filteredSecondFilter2.length >= 1) {
      // If a matching object is found in secondFilter
      let ourFilter = filteredSecondFilter;
      if (filteredSecondFilter.length <= 0) {
        ourFilter = filteredSecondFilter;
      }
      const { isClicked, ...rest } = ourFilter[0];
      const datePassed = new Date(fDate) < new Date();
      
      // Update the matching object in secondFilter with the required fields
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

  // Loop through each object in secondFilter
  for (let i = 0; i < secondFilter.length; i++) {
    const matchingObj = updatedSecondFilter.find(obj => obj._id === secondFilter[i]._id);
    
    if (!matchingObj) {
      // If no matching object is found in updatedSecondFilter based on _id
      const updatedObj = {
        ...secondFilter[i],
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

module.exports = {medProData}