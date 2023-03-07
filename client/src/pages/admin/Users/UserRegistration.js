import { Col, Form, Row } from "antd";
import React, { useEffect } from "react";
import { message  } from "antd";

import {
  registerUser,
  editUserById,
  getUserById,
} from "../../../apicalls/users";
import PageTitle from "../../../components/PageTitle";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { Tabs } from "antd";
const { items } = Tabs;

function UserRegistration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState(null);
  const params = useParams();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;

      if (params.id) {
        response = await editUserById({
          ...values,
          courseId: params.id,
        });
      } else {
        response = await registerUser(values);
      }
      if (response.success) {
        message.success(response.message);
        navigate("/admin/users");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getUser = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getUserById({
        courseId: params.id,
      });
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

  useEffect(() => {
    if (params.id) {
      getUser();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-vh-100">
      <PageTitle title={params.id? "Edit User" : "Add User"} />
      <div className="divider"></div>

      {(userData || !params.id) && (
        <Form layout="vertical" onFinish={onFinish} initialValues={userData}>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Add User" key="1">
              <Row gutter={[10, 10]}>
                <Col span={8}>
                  <Form.Item label="Name" name="name">
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Email id" name="email">
                    <input type="email" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Mobile number" name="number">
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="password" name="password">
                    <input type="password" />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex justify-end gap-2">
                <button
                  className="primary-outlined-btn"
                  type="button"
                  onClick={() => navigate("/admin/users")}
                  >
                  Cancel
                </button>
                <button className="primary-contained-btn" type="submit">
                  Save
                </button>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </Form>
      
      )}
    </div>
  );
}

export default UserRegistration;
