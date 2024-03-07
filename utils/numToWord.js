 
  function numberToWords(number) {
    if (number < 0 || number > 999999.99) {
        return "Number out of range";
    }

    const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const teens = ["", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    const thousands = ["", "thousand", "million"];

    function convertGroup(number) {
        const hundreds = Math.floor(number / 100);
        const tensAndOnes = number % 100;

        let result = "";

        if (hundreds > 0) {
            result += ones[hundreds] + " hundred";
            if (tensAndOnes > 0) {
                result += " and ";
            }
        }

        if (tensAndOnes > 0 && tensAndOnes < 10) {
            result += ones[tensAndOnes];
        } else if (tensAndOnes >= 11 && tensAndOnes < 20) {
            result += teens[tensAndOnes - 10];
        } else if (tensAndOnes >= 20) {
            result += tens[Math.floor(tensAndOnes / 10)];
            if (tensAndOnes % 10 > 0) {
                result += "-" + ones[tensAndOnes % 10];
            }
        }

        return result;
    }

    const numArr = number.toString().split(".");
    const dollarPart = parseInt(numArr[0]);

    if (dollarPart === 0) {
        return "zero";
    }

    let words = "";
    let integerPart = dollarPart;
    let groupCount = 0;

    do {
        const group = integerPart % 1000;
        if (group > 0) {
            words = convertGroup(group) + " " + thousands[groupCount] + " " + words;
        }
        integerPart = Math.floor(integerPart / 1000);
        groupCount++;
    } while (integerPart > 0);

    return capitalizeFirstLetter(words.trim());
  }
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

  module.exports = numberToWords