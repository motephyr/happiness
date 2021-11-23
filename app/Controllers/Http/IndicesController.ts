// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Group from 'App/Models/Group'
import Source from 'App/Models/Source'

export default class IndicesController {
  public async index({ view }) {

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

