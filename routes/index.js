// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const index_controller = require('../controllers/indexController');
const register_controller = require('../controllers/registerController');

// Homepage
router.get('/', index_controller.main);

router.get('/topics', index_controller.topic_list_get);

router.get('/topics/:id', index_controller.topic_detail_get);

router.get('/register', register_controller.register_get);

router.post('/register', register_controller.register_post);


module.exports = router
