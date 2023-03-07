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

// edit User by id
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

//login user
export const loginUser = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/users/login', payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getUserInfo = async (payload) => {
    try {
        const response = await axiosInstance.get('/api/users/get-user-info', payload);
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

//check email is exist or not
export const checkEmailId = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/users/check-email', payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

//send reset password link to user email id
export const sendResetPasswordLink = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/users/send-reset-password-link', payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

//update user passwords
export const passwordReset = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/users/password-reset', payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

//get user by name
export const searchUserData = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/users/get-user', payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}