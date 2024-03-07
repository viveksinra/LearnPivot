
const jobRole = ["admin", "ceo", "buildingManager", "caregiver", "cook", "outdoorWorker", "indoorWorker", "doctor", "accountant", "housekeeper", "other" ]

const validateOnCreate = async (req, res, next) => {
  const jId = req.body.jobRole.id

    //   Check if the required fields are present
      if (!req.body.email &&  !req.body.mobile) {
        return res.status(406).json({
          message: "Either Email or mobile is required is required for Login",
          variant: "error",
        });  
      }

      if (!jId || !jobRole.includes(jId)) {
        return res.json({
          message: "Job role is required",
          variant: "error",
        });
      }
        //   Check if the required fields are present
      if (req.body.email) {
       let data = await User.findOne({email:req.body.email})
        .catch(err => {
          console.log(err)
        })
        if(data){
        return res.status(406).json({
          message: "Email already register",
          variant: "error",
        }); }
      }
        //   Check if the required fields are present
      if (req.body.mobile) {
       let data = await User.findOne({mobile:req.body.mobile})
        .catch(err => {
          console.log(err)
        })
        if(data){
        return res.status(406).json({
          message: "Mobile already register",
          variant: "error",
        }); }
      }
          

      next();
    };
    
    const validateOnUpdate = async (req, res, next) => {
    
      if(req.params.id && req.body.email){
       let data = await User.findOne({_id:req.params.id})
       if(data.email != req.body.email){
        return res.status(406).json({
          message: "Email already register",
          variant: "error",
        }); 
    }
      }
      if(req.params.id && req.body.mobile){
       let data = await User.findOne({_id:req.params.id})
       if(data.mobile != req.body.mobile){
        return res.status(406).json({
          message: "Mobile already register",
          variant: "error",
        }); 
    }
      }


      next();
    };
    
    module.exports = { validateOnCreate, validateOnUpdate };
    