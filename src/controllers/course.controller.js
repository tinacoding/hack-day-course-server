const db = require("../models");
const Course = db.courses;
const Op = db.Sequelize.Op;

// Create a new course and save
exports.create = (req, res) => {
	// Validate request
	if (!req.body.title) {
		res.status(400).send({
			message: "title can't be blank!"
		});
		return;
	}

	// Create a course
	const course = {
		title: req.body.title,
		description: req.body.description,
		published: req.body.published ? req.body.published : false
	};

	// Save course in the db
	Course.create(course).then(data => {
		res.send(data);
	}).catch(error => {
		res.status(500).send({
			message: error.message || "Some error occured while creating the Course."
		});
	});
};

exports.bulkCreate = (req, res) => {
	const { courses } = req.body;
	// remove items that don't have titles
	// TODO: Add res msg if some items could not be added
	const validCourses = courses.filter(course => course.title && course.title !== "");

	const coursesData = validCourses.map(({ title, description, published }) => ({ title, description, published }));

	Course.bulkCreate(coursesData, { returning: true }).then(data => {
		res.send(data);
	}).catch(error => {
		res.status(500).send({
			message: error.message || "Failed to add courses. Please try again."
		});
	});
};

// Find all courses
// param: title - string, name of the course to find
exports.findAll = (req, res) => {
	const { title } = req.query;
	let condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

	Course.findAll({ where: condition }).then(data => {
		res.send(data);
	}).catch(error => {
		res.status(500).send({
			message: error.message || "Some error occured while finding all the courses."
		});
	});
 };

