import View from '@ioc:Adonis/Core/View'

View.global('toHHMMSS', function (duringtime) {
  if (duringtime) {
    let sec_num = parseInt(duringtime, 10); // don't forget the second param
    let hours: number | string = Math.floor(sec_num / 3600);
    let minutes: number | string = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds: number | string = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds;

  } else {
    return "00:00:00"
  }
})

View.global('today', () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  return `${yyyy}${mm}${dd}`

})