import { Checkbox, Form, Input } from "antd";
import React from "react";
import { message  } from "antd";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await registerUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-primary p-2">
      <div className="card w-400 p-3 bg-white"> 
        <div className="flex flex-col">
          <h1 className="text-xl text-center">
            USER- REGISTER<i className="ri-user-add-line"></i>
          </h1>
          <div className="divider"></div>
          <Form layout="vertical" className="mt-2" onFinish={onFinish}>
            <Form.Item name="name" label="Name"  rules={[{ required: true, message: 'Please add a name' },{ min: 3}]}>
              <Input type="text"/>
            </Form.Item>
            <Form.Item name="email" label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
            ]}>
              <Input/>
            </Form.Item>
            <Form.Item name="number" label="Mobile Number" rules={[{ required: true, message: 'Please add a number' },{ min: 10}, { max: 10}]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please add a password' },
            { min: 8, message: 'Password must have a minimum length of 8'}, { max: 20}]}>
              <Input type="password" />
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
              <Input type="password"/>
            </Form.Item>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                },
              ]}
            >
            <Checkbox>
              I have read the <Link to="" className="text-primary">agreement</Link>
            </Checkbox>
            
            </Form.Item>
            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="primary-contained-btn mt-2 w-100"
              >
                Register
              </button>
              <Link to="/login" className="text-center">Already a member? Login</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
