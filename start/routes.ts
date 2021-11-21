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
Route.get('/list', 'IndicesController.list')
Route.get('/nurse', 'IndicesController.nurse')
Route.get('/manage', 'IndicesController.manage')

Route.get('/nurse/:datestring', 'NursesController.nurse')
Route.post('/nurse/:datestring/groups/:group_id', 'NursesController.setOlderId')

Route.get('/manage/:datestring', 'ManagesController.manage')
Route.post('/manage/:datestring/createGroup', 'ManagesController.createGroup')
Route.post('/manage/:datestring/resetData', 'ManagesController.resetData')

Route.group(() => {
  Route.get('/new', 'OldersController.create')
  Route.get('/:id/edit', 'OldersController.edit')
  Route.patch('/:id', 'OldersController.update')
  Route.post('/', 'OldersController.store')
  Route.get('/:id', 'OldersController.show')
  Route.get('/', 'OldersController.index')
}).prefix('olders')


Route.resource('groups', 'GroupsController').apiOnly()
Route.resource('sources', 'SourcesController').apiOnly()
Route.post('/sources/upload', 'SourcesController.upload')
