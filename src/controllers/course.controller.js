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

