const express = require('express'); //<- Import express
const router = express.Router(); //<-- create express router
const userController = require('./../controllers/userController');

//The router is a way for us to create routes that are segmented into sub apps. The old way was to provide individual routes.
//Below is the example of those routes on the app level.

/*
// -- Not using Router and specifiying each route. 
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
	.route('/api/v1/tours/:id')
	.get(getTour)
	.patch(updateTour)
	.delete(deleteTour);
app.route('/api/v1/users').get(getAllUsers).post(createUser);
app
	.route('/api/v1/users/:id')
	.get(getUser)
	.patch(updateUser)
	.delete(deleteUser);
*/

router
	.route('/')
	.get(userController.getAllUsers)
	.post(userController.createUser);
router
	.route('/:id')
	.get(userController.getUser)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

module.exports = router;
