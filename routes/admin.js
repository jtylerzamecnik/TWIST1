// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const admin_controller = require('../controllers/adminController');
const admin_controller2 = require('../controllers/adminController_2');
// Routes for admin functions

router.get('/', admin_controller.main);

//STUDENTS

router.get('/students', admin_controller.students_list_get);

router.get('/students/create', admin_controller.students_create_get);

router.post('/students/create', admin_controller.students_create_post);

router.get('/students/:id/update', admin_controller.students_update_get);

router.post('/students/:id/update', admin_controller.students_update_post);

router.get('/students/:id/delete', admin_controller.students_delete_get);

router.post('/students/:id/delete', admin_controller.students_delete_post);

router.get('/students/:id', admin_controller.students_detail_get);

//SCHOOLS

router.get('/schools', admin_controller.schools_list_get);

router.get('/schools/create', admin_controller.schools_create_get);

router.post('/schools/create', admin_controller.schools_create_post);

router.get('/schools/:id/update', admin_controller.schools_update_get);

router.post('/schools/:id/update', admin_controller.schools_update_post);

router.get('/schools/:id/delete', admin_controller.schools_delete_get);

router.post('/schools/:id/delete', admin_controller.schools_delete_post);

router.get('/schools/:id', admin_controller.schools_detail_get);

//TOPICS

router.get('/topics', admin_controller.topics_list_get);

router.get('/topics/create', admin_controller.topics_create_get);

router.post('/topics/create', admin_controller.topics_create_post);

router.get('/topics/:id/update', admin_controller.topics_update_get);

router.post('/topics/:id/update', admin_controller.topics_update_post);

router.get('/topics/:id/delete', admin_controller.topics_delete_get);

router.post('/topics/:id/delete', admin_controller.topics_delete_post);

router.get('/topics/:id', admin_controller.topics_detail_get);

//PRESENTERS

router.get('/presenters', admin_controller.presenters_list_get);

router.get('/presenters/create', admin_controller.presenters_create_get);

router.post('/presenters/create', admin_controller.presenters_create_post);

router.get('/presenters/:id/update', admin_controller.presenters_update_get);

router.post('/presenters/:id/update', admin_controller.presenters_update_post);

router.get('/presenters/:id/delete', admin_controller.presenters_delete_get);

router.post('/presenters/:id/delete', admin_controller.presenters_delete_post);

router.get('/presenters/:id', admin_controller.presenters_detail_get);

//ROOMS

router.get('/rooms', admin_controller.rooms_list_get);

router.get('/rooms/create', admin_controller.rooms_create_get);

router.post('/rooms/create', admin_controller.rooms_create_post);

router.get('/rooms/:id/update', admin_controller.rooms_update_get);

router.post('/rooms/:id/update', admin_controller.rooms_update_post);

router.get('/rooms/:id/delete', admin_controller.rooms_delete_get);

router.post('/rooms/:id/delete', admin_controller.rooms_delete_post);

router.get('/rooms/:id', admin_controller.rooms_detail_get);

//         SESSIONS            //

router.get('/sessions', admin_controller2.sessions_list_get);

router.get('/sessions/create', admin_controller2.sessions_create_get);

router.post('/sessions/create', admin_controller2.sessions_create_post);

router.get('/sessions/:id/update', admin_controller2.sessions_update_get);

router.post('/sessions/:id/update', admin_controller2.sessions_update_post);

router.get('/sessions/:id/delete', admin_controller2.sessions_delete_get);

router.post('/sessions/:id/delete', admin_controller2.sessions_delete_post);

router.get('/sessions/:id', admin_controller2.sessions_detail_get); 

// SCHEDULE //

router.get('/schedules', admin_controller2.schedules_list_get);

router.get('/schedules/create', admin_controller2.schedules_create_get);

router.post('/schedules/create', admin_controller2.schedules_create_post);

router.get('/schedules/:id/update', admin_controller2.schedules_update_get);

router.post('/schedules/:id/update', admin_controller2.schedules_update_post);

router.get('/schedules/:id/delete', admin_controller2.schedules_delete_get);

router.post('/schedules/:id/delete', admin_controller2.schedules_delete_post);

router.get('/schedules/:id', admin_controller2.schedules_detail_get);

module.exports = router
