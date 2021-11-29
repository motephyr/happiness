// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Group from 'App/Models/Group'
import Source from 'App/Models/Source'
import Older from 'App/Models/Older'
export default class IndicesController {
  public async index({ view }) {

    let groupsquery = await Group.query().orderBy('datestring')
    let groups = groupsquery.map((group) => group.serialize())
    // usage example:
    let datestrings = groups.map((x) => (x.datestring)).filter(onlyUnique);

    let olders = await Older.query().preload('groups')
    const sumetimes = olders.map((x) => {
      x.sumtime = datestrings.map((y) => {
        return x.groups.filter((z) => {
          return z.datestring === y
        }).reduce((sum, w) => (sum + parseInt(w.duringtime)), 0)
      })

      x.todaytime = x.groups.filter((z) => {
        return z.datestring === view.globals.today()
      }).reduce((sum, w) => (sum + parseInt(w.duringtime)), 0)
      x.todaynum = x.groups.filter((z) => {
        return z.datestring === view.globals.today()
      }).reduce((sum) => (sum + 1), 0)
      return x
    })

    let important = sumetimes.sort((x, y) => (y.todaytime - x.todaytime))[0]
    if (important.todaynum === 0) {
      important.name = '無'
      important.room = ''
      important.todaynum = NaN
      important.todaytime = NaN
    }


    const rooms = olders.reduce((sum, x) => {
      let obj = {}
      obj[x.room] = obj[x.room] ? obj[x.room] + 1 : 1
      return { ...sum, ...obj }
    }, {})


    let result = { datestrings, sumetimes, rooms, important }

    return view.render('index', result)
  }

  public async list({ view }) {

    let groupsquery = await Group.query().orderBy('datestring')
    let groups = groupsquery.map((group) => group.serialize())
    // usage example:
    let datestrings = groups.map((x) => (x.datestring)).filter(onlyUnique);
    let times = datestrings.map((x) => {
      return groups.filter((y) => {
        return x === y.datestring
      }).length
    })

    let longesttimes = datestrings.map((x) => {
      let duringtimes = groups
        .filter((y) => {
          return x === y.datestring
        }).map((z) => parseInt(z.duringtime))
      return Math.max(...duringtimes)
    })

    let result = { datestrings, times, longesttimes }

    return view.render('list', result)
  }
  public async nurse({ view }) {

    let groupsquery = await Group.query().orderBy('datestring')
    let groups = groupsquery.map((group) => group.serialize())
    // usage example:
    let datestrings = groups.map((x) => (x.datestring)).filter(onlyUnique);
    let times = datestrings.map((x) => {
      return groups.filter((y) => {
        return x === y.datestring
      }).length
    })

    let longesttimes = datestrings.map((x) => {
      let duringtimes = groups
        .filter((y) => {
          return x === y.datestring
        }).map((z) => parseInt(z.duringtime))
      return Math.max(...duringtimes)
    })

    let result = { datestrings, times, longesttimes }

    return view.render('nurse', result)
  }

  public async manage({ view }) {

    let sourcesquery = await Source.query().orderBy('datestring')
    let sources = sourcesquery.map((group) => group.serialize())
    // usage example:
    let datestrings = sources.map((x) => (x.datestring)).filter(onlyUnique);
    let times = datestrings.map((x) => {
      return sources.filter((y) => {
        return x === y.datestring
      }).length
    })



    let result = { datestrings, times }

    return view.render('manage', result)
  }



}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

