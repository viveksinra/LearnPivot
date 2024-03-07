const ProvideCare = require("../../../../../Models/Private/Residence/ProvideCare");

async function MedCount(req,res) {
 let {mySeries,myLabels} = await getCount(req,res)
let series = mySeries

  let options = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['26-Aug', '25-Aug', '24-Aug', '23-Aug', '22-Aug', '21-Aug', '20-Aug'],
    },
    yaxis: {
      title: {
        text: '$ (thousands)'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands"
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

    const mySeries = [{
      name: 'Care Given',
      data: []
    }, {
      name: 'PRN Care',
      data: []
    }, {
      name: 'Care Reject',
      data: []
    }]

    const myLabels = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const day = date.getDate();
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = monthNames[date.getMonth()];
      
      myLabels.push(`${day}-${month}`);

        const givenCount = await ProvideCare.countDocuments({
            isProvided: true,
            date: { $gte: new Date(date.setHours(0, 0, 0, 0)), $lte: new Date(date.setHours(23, 59, 59, 999)) }
        });

        const prnCount = await ProvideCare.countDocuments({
            prn: true,
            date: { $gte: new Date(date.setHours(0, 0, 0, 0)), $lte: new Date(date.setHours(23, 59, 59, 999)) }
        });

        const rejectedCount = await ProvideCare.countDocuments({
            isProvided: false,
            date: { $gte: new Date(date.setHours(0, 0, 0, 0)), $lte: new Date(date.setHours(23, 59, 59, 999)) }
        });

        mySeries[0].data.push(givenCount);
        mySeries[1].data.push(prnCount);
        mySeries[2].data.push(rejectedCount);
    }

    return { mySeries, myLabels };
};
  

  