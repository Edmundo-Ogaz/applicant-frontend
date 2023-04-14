function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

function parse(str) {
  if (!str) return ''

  const date = new Date(str)
  if (!date instanceof Date || isNaN(date)) return ''

return (
    [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

function format(param) {
  if (!param) return ''

  let date = param
  if (typeof date === 'string') {
    date = new Date(param)
  }

  if (!date instanceof Date || isNaN(date)) return ''

return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-')
  );
}

function birthdayToEge(str) {
  console.log(str)
  if (!str) return ''

  const birthdayDate = new Date(str)
  if (!birthdayDate instanceof Date || isNaN(birthdayDate)) return ''

  const currentDate = new Date()
  const different = currentDate - birthdayDate
  return Math.floor(different / 31557600000)
}

function getMonth() {
  let month = new Date().getMonth() + 1
  if (month < 10)
    month = `0${month}`
  return month
}

function getYear() {
  return new Date().getFullYear()
}

const DateUtil = { getYear, getMonth, parse, format, birthdayToEge }

export default DateUtil