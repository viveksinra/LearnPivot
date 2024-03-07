const Task = require("../../../../../Models/Private/Enquiry/Task");
const { formatDateToShortMonth } = require("../../../../../utils/dateFormat");

async function PendingTask(req,res) {
 let myTask = await getLastFiveIncompleteTasks()

    return myTask
}
  
module.exports = PendingTask

async function getLastFiveIncompleteTasks() {
    try {
      const incompleteTasks = await Task.find({
        "taskStatus.id":"new"
      })
      .sort({ date: -1 }) // Sort by date in descending order
      .limit(5); // Limit the results to the last five tasks
  
      const formattedTasks = incompleteTasks.map(task => ({
        task: task.task.length > 40 ? `${task.task.slice(0, 40)}...` : task.task,
        fullTask:task.task,
        taskType: task.taskType.label,
        taskDueDate: formatDateToShortMonth(task.taskDueDate) // Format the due date as desired
      }));
  
      return formattedTasks;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  }
  

  