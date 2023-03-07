const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const nodemailer = require('nodemailer');

// user registration (no login required)
router.post("/register", async (req, res) => {
  try {
    // check if user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // create new user
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      message: "User created successfully",
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

// user login (no login required)
router.post("/login", async (req, res) => {
  try {
    // check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }

    // check password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res
        .status(200)
        .send({ message: "Invalid password", success: false });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.send({
      message: "User logged in successfully",
      success: true,
      data: token,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// get user info (login required)
router.post("/get-user-info", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      message: "User info fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// get all users (login required)
router.post("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// get all instrutors by course id (login required)
 router.post("/get-all-instrutors", authMiddleware, async (req, res) => {
   try {
     const users = await User.find();
     res.send({
       message: "Users fetched successfully",
       success: true,
       data: users,
     });
  } catch (error) {
     res.status(500).send({
       message: error.message,
       data: error,
       success: false,
     });
   }
 });

// delete user by id (login required)
router.post("/delete-user-by-id", authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.id);
    res.send({
      message: "User deleted successfully",
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

// Save course details by user Id (login required)

// router.post('/save-course', authMiddleware, async(req, res)=>{
//   try {
//     const user = await User.findById(req.body.instructorId);
//     if(!user){
//       return res.send({
//         message: 'User not found',
//         success: false
//     });
//     }
    
//     let newCourses = user.courses;
//     const existingCourses = user.courses;
//     // const courseExist = existingCourses.find(
//     //   (course)=> course.courseId === req.body.courseId
//     // );
//     const dateExist = existingCourses.find(
//       (course)=> course.date === req.body.date
//     );
//     if(dateExist){
//       return res.status(400).send({
//         message: `Already assign on this date to ${req.body.name}`,
//         success: false
//       })
//     } else {

//       // if(courseExist){
//       //   newCourses = existingCourses.map((course)=>{
//       //     if(course.courseId === req.body.courseId){
//       //       return {
//       //         ...course,
//       //         date: req.body.date,
//       //         batche: req.body.batche,
//       //         courseId: req.body.courseId,
//       //         courseName: req.body.courseName,
//       //         courseLevel: req.body.courseLevel,
//       //         courseDesc: req.body.courseDesc,
//       //         courseImage: req.body.courseImage,
//       //       } 
//       //     } else {
//       //       return {
//       //         ...course
//       //       } 
//       //     }
//       //   })
//       // }
//       // else{
//         newCourses = [
//           ...existingCourses,
//           {
//             date: req.body.date,
//             batche: req.body.batche,
//             courseId: req.body.courseId,
//             courseName: req.body.courseName,
//             courseLevel: req.body.courseLevel,
//             courseDesc: req.body.courseDesc,
//             courseImage: req.body.courseImage,
//           }
//         ];
//       // }
//     }

//     const updateUser = await User.findByIdAndUpdate(req.body.instructorId,
//       {
//         courses: newCourses
//       },
//       { new: true }
//     );
//     res.status(200).send({
//       message: 'Course saved successfully',
//       success: true,
//       data: updateUser
//     })
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//       success: false
//     });
//   }
// });


// check email is exist or not (no login required)
router.post("/check-email", async (req, res) => {
  try {
    const emailExist = await User.findOne({email: req.body.email});
    if(!emailExist){
      return res.status(400).send({
        message: 'Please input your registered email id',
        success: false,
      });
    }
    return res.send({
      message: "Password reset link sent to your email id",
      data: emailExist,
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

// send reset password link to user email (no login required)
router.post("/send-reset-password-link", async (req, res) => {
    try{
        let transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: '04c0b31e41cf61', 
            pass: 'f4d9e6e6d79fc5', 
          },
        });
        await transporter.sendMail({
          from: '"Fred Foo 👻" <waleedsdev@gmail.com>',
          to: req.body.email, 
          subject: "Password Reset", 
          text: req.body.url, 
          html: `<a href=${req.body.url}>Reset Password Link</a>`
          // html: `<button>${req.body.url}</button>`, 
        });
        return res.status(200).send({
          message: 'email sent successfully',
          success: true,
        })
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// password reset using user id (no login required)
router.post("/password-reset", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const user = await User.findByIdAndUpdate(req.body.id, req.body);
    return res.send({
      message: "Password updated successfully",
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

// get user by name
router.post("/get-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({name: req.body.name});
    if(!user){
      return res.status(400).send({
      message: "User not found",
      success: false,
      data: user,
    });
  }
  return res.status(200).send({
    message: "User fetched successfully",
    success: true,
    data: user,
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
