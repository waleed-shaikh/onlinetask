import { Form, Input } from "antd";
import { message  } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { passwordReset } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { getUserInfo } from "../../../apicalls/users";

function PasswordReset() {
    const params = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);

    const getUserData = async () => {
      try {
        dispatch(ShowLoading());
        const response = await getUserInfo(params.id);
        dispatch(HideLoading());
        if (response.success) {
          setUserData(response.data);
        } else {
          message.error(response.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
      }
    };

    const onFinish = async (values) => {
        try {
        //check email exist or not
        dispatch(ShowLoading());
        const response = await passwordReset({
            password: values.password,
            id: params.id,
        });
        dispatch(HideLoading());
        if (response.success) {
            message.success(response.message);
            navigate(`/login`);
        } else {
            message.error(response.message);
        }
        } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
        }
    };
  useEffect(() => {
    if(params.id){
      getUserData();
    }
    // eslint-disable-next-line
  }, [])
  
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-primary p-2 ">
      <div className="card w-400 p-3 bg-white">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <h1 className="text-xl">Password Reset</h1>
          </div>
          {userData && <h1 className="text-sm mt-3">Hi {(userData.name).charAt(0).toUpperCase() + (userData.name).slice(1 )}</h1>}
          <div className="divider"></div>
          <Form layout="vertical" className="mt-2" onFinish={onFinish} >
            <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please add a password' },
            { min: 8, message: 'Password must have a minimum length of 8'}, { max: 20}]}>
              <Input type="password" placeholder="Enter your new password"/>
            </Form.Item>
            <Form.Item name="confirm" label="Confirm Password" dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input type="password" placeholder="Enter your confirm password"/>
            </Form.Item>
            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="primary-contained-btn mt-2 w-100"
              >
                Save Password
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
