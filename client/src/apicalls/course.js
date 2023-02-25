const { default: axiosInstance } = require(".");

// add Course

export const addCourse = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/courses/add", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get all Course
export const getAllCourse = async () => {
  try {
    const response = await axiosInstance.post("/api/courses/get-all-courses");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get Course by id

export const getCourseById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/courses/get-course-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// edit Course by id

export const editCourseById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/courses/edit-course-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// delete Course by id

export const deleteCourseById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/courses/delete-course-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
