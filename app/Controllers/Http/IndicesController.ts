// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Group from 'App/Models/Group'

export default class IndicesController {
  public async index({ view }) {

    let groupsquery = await Group.query()
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
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

