// defaultGroup.js

const defaultGroup = [
// *under Primary Groups ////////////////////////////////////////
    // @Current Assets currentAssets
   {
    _id:"64764c71c3790924fc500701",
    label:"Current Assets",
    defaultGroup:true,
    link:"currentAssets",
    alias:"",
    under:{
        label:"Primary",
    defaultGroup:true,
    link:"primary",
        _id:"64764c71c3790924fc500761",
        defaultGroup:true
    },
    // enum:["Assets","Expenses","Income","Liabilities"]
    natureOfGroup:"Assets",
    isSubLedger:false,
    // Net Debit Credit balance for reporting
    netBalance:false,
    forCalculation:false,
    // enum:["Not-Applicable","Appropriate by Qty","Appropriate by Value"]
    forPurInvoice:"Not-Applicable",
    canDelete:false,
    showBanking:true,
    showAddress:true,
   },
    // @Current Liabilities
   {
    _id:"64764c71c3790924fc500702",
    label:"Current Liabilities",
    defaultGroup:true,
    link:"currentLiabilities",
    alias:"",
    under:{
        label:"Primary",
    defaultGroup:true,
    link:"primary",
        _id:"64764c71c3790924fc500761",
    },
    // enum:["Assets","Expenses","Income","Liabilities"]
    natureOfGroup:"Liabilities",
    isSubLedger:false,
    // Net Debit Credit balance for reporting
    netBalance:false,
    forCalculation:false,
    // enum:["Not-Applicable","Appropriate by Qty","Appropriate by Value"]
    forPurInvoice:"Not-Applicable",
    canDelete:false,
    showBanking:true,
    showAddress:true,
   },
   // @Loans (Liability) loansLiability
   {
    _id:"64764c71c3790924fc500703",
    label:"Loans (Liability)",
    defaultGroup:true,
    link:"loansLiability",
    alias:"",
    under:{
        label:"Primary",
    defaultGroup:true,
    link:"primary",
        _id:"64764c71c3790924fc500761",
    },
    // enum:["Assets","Expenses","Income","Liabilities"]
    natureOfGroup:"Liabilities",
    isSubLedger:false,
    // Net Debit Credit balance for reporting
    netBalance:false,
    forCalculation:false,
    // enum:["Not-Applicable","Appropriate by Qty","Appropriate by Value"]
    forPurInvoice:"Not-Applicable",
    canDelete:false,
    showBanking:true,
    showAddress:true,
   },
   // @Branch / Division branchDivisions
   {
    _id:"64764c71c3790924fc500704",
    label:"Branch / Division",
    defaultGroup:true,
    link:"branchDivisions",
    alias:"",
    under:{
        label:"Primary",
    defaultGroup:true,
    link:"primary",
        _id:"64764c71c3790924fc500761",
    },
    // enum:["Assets","Expenses","Income","Liabilities"]
    natureOfGroup:"Liabilities",
    isSubLedger:false,
    // Net Debit Credit balance for reporting
    netBalance:false,
    forCalculation:false,
    // enum:["Not-Applicable","Appropriate by Qty","Appropriate by Value"]
    forPurInvoice:"Not-Applicable",
    canDelete:false,
    showBanking:true,
    showAddress:true,
   },
   // @Capital Account capitalAccount
   {
    _id:"64764c71c3790924fc500705",
    label:"Capital Account",
    defaultGroup:true,
    link:"capitalAccount",
    alias:"",
    under:{
        label:"Primary",
    defaultGroup:true,
    link:"primary",
        _id:"64764c71c3790924fc500761",
    },
    // enum:["Assets","Expenses","Income","Liabilities"]
    natureOfGroup:"Liabilities",
    isSubLedger:false,
    // Net Debit Credit balance for reporting
    netBalance:false,
    forCalculation:false,
    // enum:["Not-Applicable","Appropriate by Qty","Appropriate by Value"]
    forPurInvoice:"Not-Applicable",
    canDelete:false,
    showBanking:true,
    showAddress:true,
   },

// *under Current Assets /////////////////////////////////////////
   // @Bank Accounts  bankAccounts
   {
    _id:"64764c71c3790924fc500706",
    label:"Bank Accounts",
    defaultGroup:true,
    link:"bankAccounts",
    alias:"",
    under:{
        label:"Current Assets",
    defaultGroup:true,
    link:"currentAssets",
        _id:"64764c71c3790924fc500761",
    },
    // enum:["Assets","Expenses","Income","Liabilities"]
    natureOfGroup:"Assets",
    isSubLedger:false,
    // Net Debit Credit balance for reporting
    netBalance:false,
    forCalculation:false,
    // enum:["Not-Applicable","Appropriate by Qty","Appropriate by Value"]
    forPurInvoice:"Not-Applicable",
    canDelete:false,
    showBanking:true,
    showAddress:true,
   },
   // @Cash in Hand  cashInHand
   {
    _id:"64764c71c3790924fc500707",
    label:"Cash in Hand",
    defaultGroup:true,
    link:"cashInHand",
    alias:"",
    under:{
        label:"Current Assets",
    defaultGroup:true,
    link:"currentAssets",
        _id:"64764c71c3790924fc500761",
    },
    // enum:["Assets","Expenses","Income","Liabilities"]
    natureOfGroup:"Assets",
    isSubLedger:false,
    // Net Debit Credit balance for reporting
    netBalance:false,
    forCalculation:false,
    // enum:["Not-Applicable","Appropriate by Qty","Appropriate by Value"]
    forPurInvoice:"Not-Applicable",
    canDelete:false,
    showBanking:true,
    showAddress:true,
   },
   // @Deposits (Asset)  depositsAsset
   {
    _id:"64764c71c3790924fc500708",
    label:"Deposits (Asset)",
    defaultGroup:true,
    link:"depositsAsset",
    alias:"",
    under:{
        label:"Current Assets",
    defaultGroup:true,
    link:"currentAssets",
        _id:"64764c71c3790924fc500761",
    },
    // enum:["Assets","Expenses","Income","Liabilities"]
    natureOfGroup:"Assets",
    isSubLedger:false,
    // Net Debit Credit balance for reporting
    netBalance:false,
    forCalculation:false,
    // enum:["Not-Applicable","Appropriate by Qty","Appropriate by Value"]
    forPurInvoice:"Not-Applicable",
    canDelete:false,
    showBanking:true,
    showAddress:true,
   },

// *Under Loans (Liability) ///////////////////////////////////////////////
   // Bank OD A/c bankOdAc
{
    
    _id:"64764c71c3790924fc500709",
    label:"Bank OD A/c",
    defaultGroup:true,
    link:"bankOdAc",
    alias:"Bank OCC A/c",
    under:{
        label:"Loans (Liability)",
    defaultGroup:true,
    link:"loansLiability",
        _id:"64764c71c3790924fc500761",
    },
    // enum:["Assets","Expenses","Income","Liabilities"]
    natureOfGroup:"Liabilities",
    isSubLedger:false,
    // Net Debit Credit balance for reporting
    netBalance:false,
    forCalculation:false,
    // enum:["Not-Applicable","Appropriate by Qty","Appropriate by Value"]
    forPurInvoice:"Not-Applicable",
    canDelete:false,
    showBanking:true,
    showAddress:true,
   },
  ];
  
  module.exports = defaultGroup;
  