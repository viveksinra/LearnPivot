const natureOfGroupLabel = ["Assets","Expenses","Income","Liabilities"];
const natureOfGroupLink = ["assets","expenses","income","liabilities"]
const validLabelValues = ["Not Applicable", "Appropriate By Qty", "Appropriate By Value"];
const validIdValues = ["notApplicable", "appropriateByQty", "appropriateByValue"];

const validateOnCreate = async (req, res, next) => {

  const { natureOfGroup,label,under } = req.body;

  if (!natureOfGroup) {
    return res.json({
      message: "Nature of group is required.",
      variant: "error",
    });
  }

  if (!natureOfGroup.label) {
    return res.json({
      message: "Nature of group label is required.",
      variant: "error",
    });
  }

  if (!natureOfGroupLabel.includes(natureOfGroup.label)) {
    return res.json({
      message: "Invalid nature of group label.",
      variant: "error",
    });
  }

  if (!natureOfGroup.id) {
    return res.json({
      message: "Nature of group id is required.",
      variant: "error",
    });
  }

  if (!natureOfGroupLink.includes(natureOfGroup.id)) {
    return res.json({
      message: "Invalid nature of group id.",
      variant: "error",
    });
  }    
  const { forPurInvoice } = req.body;

  if (!forPurInvoice) {
    return res.json({
      message: "for Pur Invoice is required.",
      variant: "error",
    });
  }

  if (!forPurInvoice.label) {
    return res.json({
      message: "for Pur Invoice label is required.",
      variant: "error",
    });
  }

  if (!validLabelValues.includes(forPurInvoice.label)) {
    return res.json({
      message: "Invalid for Pur Invoice label.",
      variant: "error",
    });
  }

  if (!forPurInvoice.id) {
    return res.json({
      message: "for Pur Invoice id is required.",
      variant: "error",
    });
  }

  if (!validIdValues.includes(forPurInvoice.id)) {
    return res.json({
      message: "Invalid for Pur Invoice id.",
      variant: "error",
    });
  }
  if (!label) {
    return res.json({
      message: "label id is required.",
      variant: "error",
    });
  }
  if (!under) {
    return res.json({
      message: "under  is required.",
      variant: "error",
    });
  }
  if (!under.label) {
    return res.json({
      message: "under label is required.",
      variant: "error",
    });
  }
  if (!under._id) {
    return res.json({
      message: "under id is required.",
      variant: "error",
    });
  }
  if (!under.defaultGroup) {
    return res.json({
      message: "under default Group is required.",
      variant: "error",
    });
  }
next();
};
    
    const validateOnUpdate = async (req, res, next) => {
    
   
        
      next();
    };
    const validateOnDelete = async (req, res, next) => {
    
   let data1 = await Group.findOne({"under._id":req.params.id}).catch(Err => console.log(Err))
  
   if (data1) {
    return res.json({
      message: "This group is parent of Some Group: " + data1.label,
      variant: "error",
    });
  }
   let data2 = await Ledger.findOne({"group._id":req.params.id}).catch(Err => console.log(Err))
  
   if (data2) {
    return res.json({
      message: "This group is used in Ledger: " + data1.ledger,
      variant: "error",
    });
  }
      next();
    };
    
    module.exports = { validateOnCreate, validateOnUpdate,validateOnDelete };
    