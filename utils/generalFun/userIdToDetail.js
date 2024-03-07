const Prospect = require("../../Models/Private/Enquiry/Prospect");
const User = require("../../Models/User");

async function findUserOrProspect(id) {
    let data = await findProspect(id);
    if (!data) {
        data = await findUser(id);
    }
    return data ? data.toObject() : data;
}

async function findProspect(id) {
    return await Prospect.findById(id);
}

async function findUser(id) {
    return await User.findById(id);
}

module.exports = {
    findUserOrProspect
};
