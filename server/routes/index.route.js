const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const collectorRoutes = require('./collector.route');
const clientRoutes = require('./client.route');
const companyRoutes = require('./company.route');
const employeeRoutes = require('./employee.route');
const addressRoutes = require('./address.route');
const dashboardRoutes = require('./dashboard.route');
const inventaryRoutes = require('./inventary.route');
const masterEmployeeRoutes = require('./masteremployee.route');

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
router.use('/employee', employeeRoutes);
router.use('/address', addressRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/inventary', inventaryRoutes);
router.use('/masteremployee', masterEmployeeRoutes);


module.exports = router;
