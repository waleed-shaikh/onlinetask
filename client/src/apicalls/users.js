const { default: axiosInstance } = require(".");

// add user 
export const registerUser = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/users/register', payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

// edit Course by id
export const editUserById = async (payload) => {
    try {
      const response = await axiosInstance.post(
        "/api/users/edit-user-by-id",
        payload
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };


export const loginUser = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/users/login', payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getUserInfo = async () => {
    try {
        const response = await axiosInstance.post('/api/users/get-user-info');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getUserById = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/users/get-user-by-id');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.post('/api/users/get-all-users');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const deleteUserById = async (payload) => {
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
