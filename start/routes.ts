/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

// Route.get('/', async ({ view }) => {
//   return view.render('welcome')
// })

Route.get('/', 'IndicesController.index')

Route.get('/manage/:datestring', 'ManagesController.manage')
Route.post('/manage/:datestring/createGroup', 'ManagesController.createGroup')
Route.post('/manage/:datestring/resetData', 'ManagesController.resetData')

Route.get('/nurse/:datestring', 'NursesController.nurse')
Route.post('/nurse/:datestring/groups/:group_id', 'NursesController.changeName')

Route.resource('sources', 'SourcesController').apiOnly()

Route.post('/sources/upload', 'SourcesController.upload')

Route.resource('groups', 'GroupsController').apiOnly()

