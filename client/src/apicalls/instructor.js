const { default: axiosInstance } = require(".");

// add Course
export const addInstructor = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/user/add", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};


// get Instructor by id
export const getInstructorById = async () => {
  try {
    const response = await axiosInstance.post("/api/users/get-user-by-id");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get all Instructor
export const getAllInstructor = async () => {
  try {
    const response = await axiosInstance.post("/api/users/get-all-instrutors");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get all Instructors
export const getAllCourseInstructor = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/get-all-instrutors", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// edit Instructor by id

export const editInstructorById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/edit-users-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// delete Course by id
export const deleteInstructorById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/delete-user-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};


// save course to instructor
export const saveCourse = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/assignCourse/save-course", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get all Assign Instructors by course Id
export const getAllAssignInstructors = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/assignCourse/get-all-assign-instrutors", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get all Assign Tasks
export const getAllAssignedTasks = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/assignCourse/get-all-assign-tasks", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get all Pending Assign Tasks
export const getAllPendingAssignTasks = async (payload) => {
  try {
    const response = await axiosInstance.get("/api/assignCourse/get-all-pending-tasks", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get all Completed Assign Tasks
export const getAllCompletedAssignTasks = async (payload) => {
  try {
    const response = await axiosInstance.get("/api/assignCourse/get-all-completed-tasks", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// delete assigned instructors by assigned id
export const deleteAssignedInstructor = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/assignCourse/delete-assigned-instructor",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

//search Instructor Data by instructor name and course id
export const searchInstructorData = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/assignCourse/get-assign-instrctor", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get all assigned course by user id
export const getAssignedCourses = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/assignCourse/get-assigned-course", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// delete assign instructors by course id
export const editAssignedInstructors = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/assignCourse/edit-assigned-instructors", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// update task by id
export const updateTaskById = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/assignCourse/update-task", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};