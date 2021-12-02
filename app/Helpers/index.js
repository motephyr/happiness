module.exports = {
  toHHMMSS: (duringtime) => {
    if (duringtime) {
      let secNum = parseInt(duringtime, 10) // don't forget the second param
      let hours = Math.floor(secNum / 3600)
      let minutes = Math.floor((secNum - hours * 3600) / 60)
      let seconds = secNum - hours * 3600 - minutes * 60

      if (hours < 10) {
        hours = '0' + hours
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      return hours + ':' + minutes + ':' + seconds
    } else {
      return '00:00:00'
    }
  },
  today: (today) => {
    today ??= new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    const yyyy = today.getFullYear()
    return `${yyyy}${mm}${dd}`
  },

  addDays: (date, days) => {
    let result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  },
}
