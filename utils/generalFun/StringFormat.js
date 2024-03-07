function labelToId(inputString) {
    // Convert to lowercase and remove extra spaces
    const formattedString = inputString.toLowerCase().replace(/\s+/g, ' ');
  
    return formattedString;
  }



  module.exports = {
    labelToId
};