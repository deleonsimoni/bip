const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const collectorRoutes = require('./collector.route');
const clientRoutes = require('./client.route');
const companyRoutes = require('./company.route');
const employeeRoutes = require('./employee.route');


const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/company', companyRoutes);
router.use('/collector', collectorRoutes);
router.use('/client', clientRoutes);
router.use('/employee',employeeRoutes)

 
module.exports = router;
