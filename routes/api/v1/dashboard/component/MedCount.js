const ProvideMed = require("../../../../../Models/Private/Residence/ProvideMed");

async function MedCount(req,res) {
 let {mySeries,myLabels} = await getCount(req,res)
let series = mySeries

  let options = {
    chart: {
      height: 350,
      type: 'line',
      stacked: false,
    },
    stroke: {
      width: [0, 2, 5],
      curve: 'smooth'
    },
    plotOptions: {
      bar: {
        columnWidth: '50%'
      }
    },
    
    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100]
      }
    },
    labels: myLabels,
    markers: {
      size: 0
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      title: {
        text: 'Points',
      },
      min: 0
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " points";
          }
          return y;
    
        }
      }
    }
  }


    return ({series,options})
}
  
module.exports = MedCount

const getCount = async (req, res) => {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const mySeries = [
        {
            name: 'Med Given',
            type: 'column',
            data: []
        },
        {
            name: 'PRN Meds',
            type: 'area',
            data: []
        },
        {
            name: 'Med Rejected',
            type: 'line',
            data: []
        }
    ];

    const myLabels = [];

    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const day = date.getDate();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding leading zero if month < 10
        const year = date.getFullYear();
        
        myLabels.push(`${month}/${day}/${year}`);

        const givenCount = await ProvideMed.countDocuments({
            isProvided: true,
            date: { $gte: new Date(date.setHours(0, 0, 0, 0)), $lte: new Date(date.setHours(23, 59, 59, 999)) }
        });

        const prnCount = await ProvideMed.countDocuments({
            prn: true,
            date: { $gte: new Date(date.setHours(0, 0, 0, 0)), $lte: new Date(date.setHours(23, 59, 59, 999)) }
        });

        const rejectedCount = await ProvideMed.countDocuments({
            isProvided: false,
            date: { $gte: new Date(date.setHours(0, 0, 0, 0)), $lte: new Date(date.setHours(23, 59, 59, 999)) }
        });

        mySeries[0].data.push(givenCount);
        mySeries[1].data.push(prnCount);
        mySeries[2].data.push(rejectedCount);
    }

    return { mySeries, myLabels };
};
  

  