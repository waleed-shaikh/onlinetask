const router = require("express").Router();
const Course = require("../models/courseModal");
const authMiddleware = require("../middlewares/authMiddleware");

// add course
router.post("/add", authMiddleware, async (req, res) => {
  try {
    // check if cours already exists
    const courseExist = await Course.findOne({
      name: req.body.name,
      level: req.body.level,
    });
    if (courseExist) {
      return res.status(200).send({
        message: "Course already exists",
        success: false,
      });
    }
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.send({
      message: "Course added successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// get all course
router.post("/get-all-courses", authMiddleware, async (req, res) => {
  try {
    const courses = await Course.find();
    res.send({
      message: "Course fetched successfully",
      data: courses,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// get course by id
router.post("/get-course-by-id", authMiddleware, async (req, res) => {
  try {
    const course = await Course.findById(req.body.courseId);
    res.send({
      message: "Course fetched successfully",
      data: course,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

//get course by name
router.post("/search-course", authMiddleware, async (req, res) => {
  try {
    // check already exists or not
    // const {name} = req.body.name;
    // let query = {};
    // if(name) {
    //   query.name = name;
    // }

    const existCourse = await Course.find({name: req.body.name});
    // return console.log(existCourse)
    if(existCourse.length === 0) {
      return res.send({
        message: "Course not found",
        success: false,
      });
    } 
    return res.status(200).send({
      message: "Course fetched successfully",
      success: true,
      data: existCourse,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// edit course by id
router.post("/edit-course-by-id", authMiddleware, async (req, res) => {
  try {
    await Course.findByIdAndUpdate(req.body.courseId, req.body);
    res.send({
      message: "Course edited successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// delete course by id
router.post("/delete-course-by-id", authMiddleware, async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.body.courseId);
    res.send({
      message: "Course deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});


module.exports = router;
