const Prospect = require("../../../../../Models/Private/Enquiry/Prospect");

async function ProspectStage(req,res) {
 let {mySeries,myLabels} = await getType(req,res)

let myData = {
    series: mySeries,
    options: {
      chart: {
        type: 'polarArea',
      },
      labels: myLabels,
      stroke: {
        colors: ['#fff']
      },
      fill: {
        opacity: 0.8
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  
  
  }
    return myData
}
  
module.exports = ProspectStage

const getType = async (req, res) => {
    try {
      const prospectStages = await Prospect.aggregate([
        {
          $group: {
            _id: "$prospectStage.label",
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            label: "$_id",
            count: 1,
            _id: 0
          }
        }
      ]);
  
      const mySeries = prospectStages.map(stage => stage.count);
      const myLabels = prospectStages.map(stage => stage.label);
  
      return ({ mySeries, myLabels });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred while fetching data." });
    }
  };
  

  