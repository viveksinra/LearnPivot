const Receipt = require("../../../../../Models/Private/Account/Receipt");
const Payment = require("../../../../../Models/Private/Account/Payment");
const Prospect = require("../../../../../Models/Private/Enquiry/Prospect");
const User = require("../../../../../Models/User");
const Task = require("../../../../../Models/Private/Enquiry/Task");
const { setTimeToZero } = require("../../../../../utils/dateFormat");

let paymentIcon = "https://res.cloudinary.com/oasismanors/image/upload/v1693075190/paymentSVG_enp0ca.svg"
let receiptIcon = "https://res.cloudinary.com/oasismanors/image/upload/v1693075277/receiptSVG_wtg3b7.svg"
let prospectIcon = "https://res.cloudinary.com/oasismanors/image/upload/v1693075342/prospectSVG_u807w7.svg"
let residentIcon = "https://res.cloudinary.com/oasismanors/image/upload/v1693075437/ResidentSVG_zefqhd.svg"
let employeeIcon = "https://res.cloudinary.com/oasismanors/image/upload/v1693075501/EmpSVG_r8xfre.svg"
let taskIcon = "https://res.cloudinary.com/oasismanors/image/upload/v1693075578/TaskSVG_x8zgef.svg"
async function SummaryData(req,res) {
 let receipt = await getReceipt(req,res)
 let payment = await getPayment(req,res)
 let prospect = await getProspect(req,res)
 let resident = await getResident(req,res)
 let employee = await getEmployee(req,res)
 let task = await getTasks(req,res)

let myData = [{label:"Payment", number:payment, bgColor:"#f08ff7",link:"/dashboard/payment",icon:paymentIcon},
{label:"Receipt", number:receipt, bgColor:"#a9fcc0",link:"/dashboard/receipt",icon:receiptIcon},
{label:"Prospect", number:prospect, bgColor:"#9155FD",link:"/dashboard/prospect",icon:prospectIcon}, 
{label:"Residents", number:resident, bgColor:"#56CA00",link:"/dashboard/residents",icon:residentIcon},
{label:"Employee", number:employee, bgColor:"#b5eeff",link:"/dashboard/employee",icon:employeeIcon},
{label:"Tasks", number:task, bgColor:"#FFB400",link:"/dashboard/task",icon:taskIcon},
]
    return myData
}
  
module.exports = SummaryData

const getReceipt = async (req, res) => {
    let aggregationPipeline = await getAccountPipeLine(req, res)
  
      const result = await Receipt.aggregate(aggregationPipeline);
  
      const totalAmount = `$${result.length > 0 ? result[0].totalAmount : 0}`;
  
      return totalAmount;
  
  };

  const getPayment = async (req, res) => {
let aggregationPipeline = await getAccountPipeLine(req, res)
  
      const result = await Payment.aggregate(aggregationPipeline);
  
      const totalAmount = `$${result.length > 0 ? result[0].totalAmount : 0}`;
      return totalAmount;
   
  };


  const getAccountPipeLine = async (req, res) => {

    let myMatch = {};
  
    if (req.body.startDate && req.body.startDate !== "" && req.body.endDate && req.body.endDate !== "") {
      let startDate = setTimeToZero(req.body.startDate);
      let endDate = setTimeToZero(req.body.endDate);
  
      startDate.setMinutes(startDate.getMinutes() - startDate.getTimezoneOffset());
      endDate.setMinutes(endDate.getMinutes() - endDate.getTimezoneOffset());
  
      myMatch = {
        tranDate: {
          $gte: startDate,
          $lte: endDate,
        },
      };
    }
  
  
    const aggregationPipeline = [
        {
          $match: myMatch,
        },
        {
          $addFields: {
            amountNumeric: { $toDouble: "$amount" }, // Convert amount to a numeric value
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amountNumeric" }, // Sum the numeric amounts
          },
        },
      ];
      
  
    if (Object.keys(myMatch).length === 0) {
      aggregationPipeline.shift();
    }
  return aggregationPipeline
  };
  
  
  

const getProspect = async (req, res) => {
  try {
    const count = await Prospect.countDocuments({
      residenceStage: { $in: ['prospect', 'incoming'] }
    });

    return count ;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
const getResident = async (req, res) => {
  try {
    const count = await Prospect.countDocuments({
      residenceStage: "residence"
    });

    return count ;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
const getEmployee = async (req, res) => {
  try {
    const count = await User.countDocuments({
        designation: "employee"
    });

    return count ;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
const getTasks = async (req, res) => {
  try {
    const count = await Task.countDocuments({
        "taskStatus.id": "new"
    });
    return count ;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

  