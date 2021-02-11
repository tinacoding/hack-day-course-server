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
   */

  // 1. Get all courses
  router.get('/', courses.findAll);

  // 2. Create a new course
  router.post('/', courses.create);

  // 3. Bulk create courses
  router.post('/bulk', courses.bulkCreate);

  app.use('/api/courses', router);
}