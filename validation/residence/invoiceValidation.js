var mongoose = require('mongoose');
const Invoice = require('../../Models/Private/Residence/Invoice');

const validateOnCreate = async (req, res, next) => {

    //   Check if the required fields are present
      if (!req.body.tranDate ) {
        return res.json({
          message: "Invoice Date is required fields.",
          variant: "error",
        });  
      }
      if (!req.body.ledger || !req.body.ledger.label || !req.body.ledger._id) {
        return res.json({
          message: "Ledger is required fields.",
          variant: "error",
        });  
      }
      if (!req.body.payer || !req.body.payer.label ||
        !req.body.payer._id || !req.body.payer.relation ) {
        return res.json({
          message: "Payer is required fields.",
          variant: "error",
        });  
      }
   let myRow = req.body.rows || []
    if(myRow?.length > 0){

        for(let x=0;x<myRow.length;x++){
            let myItem = myRow[x]
            let item = myItem.item;
            if (!item || !item.label ||
                !item._id || !item.issuedOn ) {
                return res.json({
                  message: "Item label ID required at position - " + (x+1) ,
                  variant: "error",
                });  
              };
            if (!item || !item.price ||
                !item.qty || !item.amount ) {
                return res.json({
                  message: "Item Price amount required  at position - " + (x+1) ,
                  variant: "error",
                });  
              };
              // ,
              // check for duplicate
            let data = await Invoice
            .findOne({
                "ledger._id":req.body.ledger._id,
              "rows.item._id":myItem.item._id,
              "rows.item.issuedOn":myItem.item.issuedOn
            })
            if (data) {
              return res.json({
                message: "Duplicate Item " + myItem.item.label + " at position: " + (x+1) ,
                variant: "error",
              });  
            };
        
        }

    } else {
        return res.json({
            message: "Atlesat one Item is required",
            variant: "error",
          });  
    }

if(req.body.payment?.length > 0){    
    for (let i = 0; i < req.body.payment?.length; i++) {
        let myPayment = req.body.payment[i]
        if (myPayment.mode) {
            if (!myPayment.mode._id ) {
                return res.json({
                  message: "Mode id is required fields.",
                  variant: "error",
                });  
              }
            if (!myPayment.mode.label ) {
                return res.json({
                  message: "Mode label is required fields.",
                  variant: "error",
                });  
              }
            if (!myPayment.mode.group ) {
                return res.json({
                  message: "Mode group is required fields.",
                  variant: "error",
                });  
              }
          
        }
    }}
// Check for Duplicate


      next();
    };
    
    const validateOnUpdate = async (req, res, next) => {
    
      // Check if the required fields are present
      // if (!req.body.salesAgent || !req.body.salesAgent.label || !req.body.salesAgent._id) {
      //   return res.status(406).json({
      //     message: "Sales Agent are required fields.",
      //     variant: "error",
      //   });
      // }
        
      next();
    };
    
    module.exports = { validateOnCreate, validateOnUpdate };
    