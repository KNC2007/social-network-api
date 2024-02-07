const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');
// const reactionRoutes = require('./reactionRoutes');

router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);
// router.use('/reaction', reactionRoutes);

module.exports = router;
