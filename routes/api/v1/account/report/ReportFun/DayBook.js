const Receipt = require("./../../../../../../Models/Private/Account/Receipt");
const Payment = require("./../../../../../../Models/Private/Account/Payment");
const { formatDateToShortMonth } = require("../../../../../../utils/dateFormat");

const DayBook = async (req, res) => {
    let timeZone = "UTC+5:30";
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;

    let rData = await Receipt.find({
        tranDate: {
            $gte: startDate,
            $lte: endDate
        }
    });

    let pData = await Payment.find({
        tranDate: {
            $gte: startDate,
            $lte: endDate
        }
    });

    let mrData = rData.map((data) => {
        let myDate = formatDateToShortMonth(data.tranDate);
        return {
            date: myDate || "",
            particulars: data?.ledger?.label || "",
            type: "Receipt" || "",
            voucherNo: data.voucher || "",
            mode: data.mode.label || "",
            dr: "",
            cr: data.amount || ""
        };
    });

    let mpData = pData.map((data) => {
        let myDate = formatDateToShortMonth(data.tranDate);
        return {
            date: myDate || "",
            particulars: data?.ledger?.label || "",
            type: "Payment" || "",
            voucherNo: data.voucher || "",
            mode: data.mode.label || "",
            dr: data.amount || "",
            cr: ""
        };
    });

    let finalData = [...mrData, ...mpData];

    finalData.sort((a, b) => {
        return a.date.localeCompare(b.date);
    });

    return finalData;
};

module.exports = DayBook;
