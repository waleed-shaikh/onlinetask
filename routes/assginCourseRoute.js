const router = require("express").Router();
const AssignCourse = require("../models/assignCourseModal");
const authMiddleware = require("../middlewares/authMiddleware");

// assign course to user 
router.post('/save-course', authMiddleware, async(req, res)=>{
  try {
    const course = await AssignCourse.findOne({
      user: req.body.user,
      date: req.body.date,
      deleted: false
    }).populate({path: 'course'});
    if(course){
      return res.send({
        message: `Already Assign ${course.course.name} Course on ${req.body.date}`,
        success: false
      });
    }
    const newAssignCourse = new AssignCourse(req.body);
    await newAssignCourse.save();
    res.status(200).send({
      message: "Assigned successfully",
      success: true,
    });

  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false
    });
  }
});

// get all assign instructors by course id
router.post('/get-all-assign-instrutors', authMiddleware, async(req, res)=>{
  try {
    const course = await AssignCourse.find({course: req.body.course}).populate({ path: 'user' })
    if(!course){
      return res.send({
        message: `Course not found`,
        success: false
      });
    }
    res.status(200).send({
      message: "Assigned users fetched successfully",
      data: course,
      success: true,
    });

  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false
    });
  }
});

// delete assigned instrctor by assigned id
router.post('/delete-assigned-instructor', authMiddleware, async(req, res)=>{
  try {
    await AssignCourse.findByIdAndDelete(req.body.id);
    return res.status(200).send({
      message: "Deleted successfully",
      success: true,
    });

  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false
    });
  }
});

//get assign instructor by name and course id
router.post('/get-assign-instrctor', authMiddleware, async(req, res)=>{
  try {
    const course = await AssignCourse.find({
      course: req.body.courseId,
    }).populate({ path: 'user' })
    // return console.log(course);
    if(!course){
      return res.send({
        message: `Course not found`,
        success: false
      });
    }
    res.status(200).send({
      message: "Assigned users fetched successfully",
      data: course,
      success: true,
    });

  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false
    });
  }
});

//get assigned courses by user id
router.post('/get-assigned-course', authMiddleware, async(req, res)=>{
  try {
    const course = await AssignCourse.find({
      user: req.body.userId,
    }).populate({path: 'course'});
    if(!course){
      return res.send({
        message: `Course not found`,
        success: false
      });
    }
    res.status(200).send({
      message: "Assigned users fetched successfully",
      data: course,
      success: true,
    });

  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false
    });
  }
});

//edit assigned instructors by course id
router.post('/edit-assigned-instructors', authMiddleware, async(req, res)=>{
  try {
    await AssignCourse.updateMany({
      course: req.body.courseId
    }, {
      $set: {
        deleted: true
      }
    }
    );
    return res.status(200).send({
      message: "All Assigned Instructors are deleted",
      success: true,
    });

  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false
    });
  }
});

module.exports = router;
