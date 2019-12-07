const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const collectorRoutes = require('./collector.route');
const clientRoutes = require('./client.route');


const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/collector', collectorRoutes);
router.use('/client', clientRoutes);


module.exports = router;
