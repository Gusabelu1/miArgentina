const {
  replaceSubStringAtPositionToUpCase,
  replaceSpecialCharsBySpaces,
  truncateString
} = require('../services/string')
const { checkDigitCalculation } = require('../services/check-digit')
const { stringDateToYYMMDD } = require('../services/date')
const passport = require('passport')

const generateDateWithCheckDigit = (line, stringDate, position) => {
  const formatYYMMDD = stringDateToYYMMDD(stringDate)
  line = replaceSubStringAtPositionToUpCase(line, formatYYMMDD, position)
  const digitCheck = checkDigitCalculation(formatYYMMDD)
  return replaceSubStringAtPositionToUpCase(line, digitCheck, position + 6)
}

const generatePassportNumber = (line, passport, position) => {
  line = replaceSubStringAtPositionToUpCase(line, passport.number, position)
  const digitCheck = checkDigitCalculation(passport.number.toUpperCase())
  return replaceSubStringAtPositionToUpCase(line, digitCheck, position + 9)
}

const generateGroupCheckDigit = (line, passport, user, position) => {
  const numberDigitCheck = checkDigitCalculation(passport.number.toUpperCase())
  
  const dobFormat = stringDateToYYMMDD(user.dateOfBirth)
  const dobDigitCheck = checkDigitCalculation(dobFormat)

  const exFormat = stringDateToYYMMDD(passport.expirationDate)
  const exDigitCheck = checkDigitCalculation(exFormat)

  const dataArray = passport.number + "<" + numberDigitCheck + "<<<<<<<<<<<<<<<" + dobFormat + dobDigitCheck + exFormat + exDigitCheck

  const digitCheck = checkDigitCalculation(dataArray.toUpperCase())
  return replaceSubStringAtPositionToUpCase(line, digitCheck, position)
}

const generatePassportType = (line, passport) => {
  line = replaceSubStringAtPositionToUpCase(line, passport.type, 0)
  if (passport.precisionType) {
    line = replaceSubStringAtPositionToUpCase(line, passport.precisionType, 1)
  }
  return line
}

const generateCountryCode = (line, code, position) =>
  replaceSubStringAtPositionToUpCase(line, code, position)

const generateSex = (line, user, position) =>
  replaceSubStringAtPositionToUpCase(line, user.sex[0].toUpperCase(), position)

const generateSurnameAndGivenNames = (line, user, position, lineLength) => {
  const surname = replaceSpecialCharsBySpaces(user.surname)
  line = replaceSubStringAtPositionToUpCase(line, surname, position)

  const givenNamesPosition = position + user.surname.length + 2
  const givenNamesMaxLength = lineLength - givenNamesPosition
  const givenNames = truncateString(
    replaceSpecialCharsBySpaces(user.givenNames),
    givenNamesMaxLength
  )
  return replaceSubStringAtPositionToUpCase(
    line,
    givenNames,
    givenNamesPosition
  )
}

module.exports = {
  generateDateWithCheckDigit,
  generatePassportNumber,
  generatePassportType,
  generateCountryCode,
  generateGroupCheckDigit,
  generateSex,
  generateSurnameAndGivenNames
}
