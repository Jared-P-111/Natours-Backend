const express = require('express'); //<- Import express
const tourController = require('./../controllers/tourController');
const router = express.Router(); //<-- create express router

//------------------------TOUR ROUTERS---------------------------------
//-- Mount the routers

//The param method allows us to use middleware specifically for certain url's
router.param('id', tourController.checkID);
router.param('body', tourController.checkBody);

router
	.route('/')
	.get(tourController.getAllTours)
	.post(tourController.checkBody, tourController.createTour);
router
	.route('/:id')
	.get(tourController.getTour)
	.patch(tourController.updateTour)
	.delete(tourController.deleteTour);

module.exports = router;
