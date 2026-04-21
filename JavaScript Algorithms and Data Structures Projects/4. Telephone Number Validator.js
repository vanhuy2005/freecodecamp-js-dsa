/*
Telephone Number Validator
Return true if the passed string looks like a valid US phone number. Otherwise return false.

There are valid US phone numbers that can have formats like:
555-555-5555
(555)555-5555
(555) 555-5555
555 555 5555
5555555555
1 555 555 5555

For this challenge, we only accept US phone numbers. 
*/

function telephoneCheck(str) {
  // Regex to match valid US phone number formats
  // Breakdown:
  // ^                   - Start of the string
  // (1\s?)?            - Optional country code 1 with optional space
  // (\(\d{3}\)|\d{3}) - Area code: either in parentheses or just 3 digits
  // [\s\-]?            - Optional space or hyphen separator
  // \d{3}              - Next 3 digits
  // [\s\-]?            - Optional space or hyphen separator
  // \d{4}              - Last 4 digits
  // $                   - End of the string
  const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
  
  return phoneRegex.test(str);
}

telephoneCheck("555-555-5555");