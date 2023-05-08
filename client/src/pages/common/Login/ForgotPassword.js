import { Form, Input } from "antd";
import { message  } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkEmailId, sendResetPasswordLink } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function ForgotPassword() {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        try {
            //check email exist or not
            dispatch(ShowLoading());
            const response = await checkEmailId(values);
            let sentResponse;
            dispatch(HideLoading());
            if (response.success) {
                message.success(response.message);
                // send reset password link
                try {
                    sentResponse = sendResetPasswordLink({
                        email: response.data.email,
                        url: `http://localhost:3000/forgot-password/${response.data._id}`,
                    });
                    if(response.success){
                        // message.success(sentResponse.message);
                    } else {
                        message.error(sentResponse.message);
                    }
                } catch (error) {
                    message.error(error.message);
                }
                navigate('/login');
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
        }
    };
    
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-primary p-2 ">
      <div className="card w-400 p-3 bg-white">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <h1 className="text-xl">Forgot Password</h1>
          </div>
          <div className="divider"></div>
          <Form layout="vertical" className="mt-2" onFinish={onFinish}>
            <Form.Item name="email">
              <Input type="email" placeholder="Enter your email id" required={true}/>
            </Form.Item>
            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="primary-contained-btn mt-2 w-100"
              >
                Send Link
              </button>
              <Link to="/login" className="text-center">Already a member? Login</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
