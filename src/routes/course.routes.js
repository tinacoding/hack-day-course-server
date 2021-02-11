/**
 * Course Routes
 * /api/courses: GET, POST, DELETE
 * /api/courses/:id: GET, PUT, DELETE
 * /api/courses/published: GET
 */

module.exports = app => {
  const courses = require('../controllers/course.controller');

  let router = require('express').Router();

  /**
   * /api/courses
   * 1. Get all courses
   * 2. Create a new course
   * 3. Bulk create courses
   * 4. Delete all courses
   */

  // 1. Get all courses
  router.get('/', courses.findAll);

  // 2. Create a new course
  router.post('/', courses.create);

  // 3. Bulk create courses
  router.post('/bulk', courses.bulkCreate);

  // 4. Delete all courses
  router.delete('/', courses.deleteAll);

  /**
   * /api/courses/:id
   * param: id
   * 1. Get course by id
   * 2. Update course by id
   * 3. Delete course by id
   */
  // 1. Get course by id
  router.get('/:id', courses.findOne);

  // 2. Update course by id
  router.put('/:id', courses.update);

  // 3. Delete course by id
  router.delete('/:id', courses.delete);

  app.use('/api/courses', router);
}