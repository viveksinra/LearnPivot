const express = require("express");
const router = express.Router();
const passport = require("passport");
const Task = require("../../../../../Models/Private/Enquiry/Task");
const { formatDateToShortMonth } = require("../../../../../utils/dateFormat");

// @type    GET
// @route   /api/v1/enquiry/task/getTask/getAll/:prospectId/:id
// @desc    Get a task by ID
// @access  Public
router.get(
  "/getAll/:prospectId/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    function convertDateFormat(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    }

    try {
      const task = await Task.findById(req.params.id).populate({
        path: "employee._id",
        select: "_id firstName lastName userImage",
      });
      
      if (!task) {
        return res.status(404).json({ 
          variant: "error", 
          message: "Task not found" 
        });
      }
      
      // Update task.taskDueDate to the new date format
     let taskDueDate = convertDateFormat(task.taskDueDate);

      // Save the updated task
      let modifiedData = {
        ...task.toObject(),
        taskDueDate:taskDueDate,
        employee: task.employee._id
      }

      res.status(200).json({ 
        variant: "success", 
        message: "Tasks Loaded", 
        data: modifiedData 
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ 
        variant: "error", 
        message: "Internal server error" 
      });
    }
  }
);


  
  // @type    GET
  // @route   /api/v1/enquiry/task/getTask/getAll/:prospectId
  // @desc    Get all tasks
  // @access  Public
  router.get(
    "/getAll/:prospectId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        let myMatch = {prospectId: req.params.prospectId}
        if(req.params.prospectId == "general"){
          myMatch = {type: "general"}
        }
        const myData = await Task.find(myMatch)
          .populate({
            path: "employee._id",
            select: "_id firstName lastName userImage",
          })
          .lean();
  
        function changeFormat(dateStr) {
          const date = new Date(dateStr);
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
  
          return formattedDate;
        }
        const modifiedData = myData.map((task) => {
          const formattedTaskDueDate = changeFormat(task.taskDueDate);
          const formattedTaskDate = changeFormat(task.date);
          return {
            ...task,
            employeeId: task.employee._id,
            employeeFirstName: task.employee.firstName,
            employeeLastName: task.employee.lastName,
            employeeFullName: task.employee.lastName + " " + task.employee.firstName,
            employeeUserImage: task.employee.userImage,
            taskType: task.taskType.label,
            taskStatus: task.taskStatus.label,
            taskDueDate: formattedTaskDueDate,
            date: formattedTaskDate,
          };
        });
  
        res.status(200).json({
          variant: "success",
          message: "Task Loaded",
          data: modifiedData,
        });
      } catch (error) {
        console.log(error)
        res.status(500).json({
          variant: "error",
          message: "Internal Server Error",
        });
      }
    }
  );
  
  
  // @type    GET
  // @route   /api/v1/enquiry/task/getTask/getDataWithPage/:prospectId/:limit/:PageNumber
  // @desc    Get tasks with pagination
  // @access  Public


  router.get(
    "/getDataWithPage/:prospectId/:limit/:PageNumber",
    passport.authenticate("jwt", { session: false }),
    async(req, res) => {
      try {
        // Calculate total count if it's the first page
      

        let data = await getSearchFun(req,res,"get")
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
  // @route   /api/v1/enquiry/task/getTask/getDataWithPage/:prospectId/:limit/:PageNumber/:searcch
  // @desc    Get tasks with pagination
  // @access  Public
  router.get(
    "/getDataWithPage/:prospectId/:limit/:PageNumber/:search",
    passport.authenticate("jwt", { session: false }),
    async(req, res) => {
      try {
    


       let data = await getSearchFun(req,res,"search")
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

  const getSearchFun = async (req, type) => {
    try {
      const page = parseInt(req.params.PageNumber) || 1; // Get the page number from the route parameters (default to 1)
      const limit = parseInt(req.params.limit) || 10; // Number of records to retrieve per page
      let myMatch = {
        
      }
     
      if(req.params.search){
    const searchQuery = req.params.search
    // Calculate total count if it's the first page
     myMatch = {
      $or: [
        { task: { $regex: new RegExp(searchQuery, "i") } },
        { "taskType.label": { $regex: new RegExp(searchQuery, "i") } },
        // Add more fields as needed for searching
      ],
    }
  }

  if(req.params.prospectId == "general"){
    myMatch.type =  "general"
  }else {
    myMatch.prospectId= req.params.prospectId 
  }
      const totalCount = await Task.countDocuments(myMatch);
  
      // Retrieve ledgers with pagination, populating the 'under' property
   
    
      const myData = await Task.find(myMatch)
      .skip((page - 1) * limit) // Calculate the correct skip value
      .limit(limit) // Limit the number of records to retrieve
      .sort({ date: -1 })
        .populate({
          path: "employee._id",
          select: "_id firstName lastName userImage",
        })
        .lean();

      function changeFormat(dateStr) {
        const date = new Date(dateStr);
        const formattedDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return formattedDate;
      }
      const modifiedData = myData.map((task) => {
        const formattedTaskDueDate = formatDateToShortMonth(task.taskDueDate);
        const formattedTaskDate = formatDateToShortMonth(task.date);
        return {
          ...task,
          employeeId: task.employee?._id?._id,
          employeeFirstName: task.employee?._id?.firstName,
          employeeLastName: task.employee?._id?.lastName,
          employeeFullName: task.employee?._id?.firstName + " " + task.employee?._id?.lastName,
          employeeUserImage: task.employee.userImage,
          taskType: task.taskType.label,
          taskStatus: task.taskStatus.label,
          taskDueDate: formattedTaskDueDate,
          date: formattedTaskDate,
        };
      });

  
      const dataToSend = {
        variant: "success",
        message: "Group Loaded",
        data: modifiedData,
        page: page,
        totalCount: totalCount,
      };
  
      return dataToSend;
    } catch (err) {
      console.error("An error occurred while retrieving ledgers:", err);
      throw err; // Re-throw the error so it can be caught in the route handler
    }
  };
  
// @type    GET
//@route    /api/v1/enquiry/task/getTask/getall/:searchTask
// @desc    route for searching of user from searchbox using any text
// @access  PRIVATE
router.get(
    "/getAll/:searchTask",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
          const search = req.params.searchTask; 
        
          try {
            const mydata = await Task.aggregate([
              {$match:{$or: [              
                { firstName: new RegExp(search, "i") },
                { lastName: new RegExp(search, "i") },
                { phone: new RegExp(search, "i") },     
              
            ]}},
          
            ]);
           
            res.status(200).json({ variant: "success",message:"Task Loaded", data:mydata });
          } catch (error) {
            console.log(error);
            res.status(500).json({
              variant: "error",
              message: "Internal server error" + error.message,
            });
          }
      
    }
  );

  module.exports = router;