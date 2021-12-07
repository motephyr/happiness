// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Group from 'App/Models/Group'
import Source from 'App/Models/Source'
import Older from 'App/Models/Older'
import helper from 'App/Helpers'
export default class IndicesController {
  public async index({ inertia }) {
    let datestring = helper.today(helper.addDays(new Date(), -7))

    let olders = await Older.query().preload('groups', (q) => {
      q.where('datestring', '>', datestring).orderBy('datestring')
    })
    let groups = olders.reduce((sum, x) => {
      return sum.concat(x.serialize().groups)
    }, [])
    let datestrings = groups.map((x) => {
      return x['datestring'] ?? ''
    }).filter(onlyUnique)

    const sumetimes = olders.map((x) => {
      let obj = x.serialize()
      obj.sumtime = datestrings.map((y) => {
        return x.groups
          .filter((z) => {
            return z.datestring === y
          })
          .reduce((sum, w) => sum + parseInt(w.duringtime), 0)
      })
      obj.todaytime = x.groups
        .filter((z) => {
          return z.datestring === helper.today()
        })
        .reduce((sum, w) => sum + parseInt(w.duringtime), 0)
      obj.todaynum = x.groups
        .filter((z) => {
          return z.datestring === helper.today()
        })
        .reduce((sum) => sum + 1, 0)
      return obj
    })

    let importantolders = sumetimes.sort((x, y) => y.todaytime - x.todaytime)[0]
    let important = {}
    if (importantolders.todaynum === 0) {
      important['name'] = '無'
      important['room'] = ''
      important['todaynum'] = NaN
      important['todaytime'] = NaN
      important['notice'] = '無'

    } else {
      important = importantolders
    }

    const rooms = olders.reduce((sum, x) => {
      let obj = {}
      obj[x.room] = sum[x.room] ? sum[x.room] + 1 : 1
      return { ...sum, ...obj }
    }, {})
    let result = { datestrings, sumetimes, rooms, important }

    return inertia.render('Index', result)
  }

  public async list({ view }) {
    let groupsquery = await Group.query().orderBy('datestring')
    let groups = groupsquery.map((group) => group.serialize())
    // usage example:
    let datestrings = groups.map((x) => x.datestring).filter(onlyUnique)
    let times = datestrings.map((x) => {
      return groups.filter((y) => {
        return x === y.datestring
      }).length
    })

    let longesttimes = datestrings.map((x) => {
      let duringtimes = groups
        .filter((y) => {
          return x === y.datestring
        })
        .map((z) => parseInt(z.duringtime))
      return Math.max(...duringtimes)
    })

    let result = { datestrings, times, longesttimes }

    return view.render('list', result)
  }
  public async nurse({ inertia }) {
    let groupsquery = await Group.query().orderBy('datestring')
    // let groups = groupsquery.map((group) => group.serialize())
    // usage example:
    // let datestrings = groups.map((x) => (x.datestring)).filter(onlyUnique);
    // let times = datestrings.map((x) => {
    //   return groups.filter((y) => {
    //     return x === y.datestring
    //   }).length
    // })

    // let longesttimes = datestrings.map((x) => {
    //   let duringtimes = groups
    //     .filter((y) => {
    //       return x === y.datestring
    //     }).map((z) => parseInt(z.duringtime))
    //   return Math.max(...duringtimes)
    // })

    let datestrings = groupsquery.reduce((sum, x) => {
      let obj = { [x.datestring]: { time: 0, longesttime: 0 } }
      obj[x.datestring]['time'] =
        sum[x.datestring] && sum[x.datestring]['time'] ? sum[x.datestring]['time'] + 1 : 1
      obj[x.datestring]['longesttime'] =
        sum[x.datestring] &&
          sum[x.datestring]['longesttime'] &&
          sum[x.datestring]['longesttime'] > parseInt(x.duringtime)
          ? sum[x.datestring]['longesttime']
          : parseInt(x.duringtime)

      return { ...sum, ...obj }
    }, {})

    let result = { datestrings }

    return inertia.render('Nurse', result)
  }

  public async manage({ view }) {
    let sourcesquery = await Source.query().orderBy('datestring')
    // let sources = sourcesquery.map((group) => group.serialize())
    // usage example:
    let datestrings = sourcesquery.reduce((sum, x) => {
      let obj = {}
      obj[x.datestring] = sum[x.datestring] ? sum[x.datestring] + 1 : 1
      return { ...sum, ...obj }
    }, {})

    let result = { datestrings }

    return view.render('manage', result)
  }
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index
}
