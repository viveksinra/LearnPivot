function dobToAge(dob) {
    // Parse the date of birth
    const birthDate = new Date(dob);
    
    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in years
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Adjust age based on the month and day
    if (currentDate.getMonth() < birthDate.getMonth() || 
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }
 age = `${age}`
    return age;
}



  module.exports = {
    dobToAge
};