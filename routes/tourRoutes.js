const express = require('express');
const tourController = require('../controllers/tourController');

const { getAllTours, createTour, getTour, updateTour, deleteTour, checkID } =
  tourController;
//Router
const router = express.Router();

router.param('id', checkID);

const checkBody = (req, res, next) => {
  console.log('req.body   == = = > ', req.body);
  const {name,price} = req.body;
  if(name && (!isNaN(price)){
    next();
  }else{
    return;
  }
};

//NOTE: only runs for /:id route
router.param('id', (req, res, next, val) => {
  console.log('see the id  => ', val);
  next();
});

router.route('/').get(getAllTours).post(checkBody, createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
