function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

function parse(str) {
  if (!str) return ''

  const date = new Date(str)
  if (!date instanceof Date || isNaN(date)) return ''

return (
    [
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
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

const DateUtil = { parse }

export default DateUtil