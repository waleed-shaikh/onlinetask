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


// save course
export const saveCourse = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/save-course", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};