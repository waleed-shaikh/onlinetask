import { Col, Form, Input, Row } from 'antd';
import { message  } from "antd";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {searchCourseData} from "../../../apicalls/course";
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';

const SearchCourse = ({setCourse, refreshData}) => {
    const dispatch = useDispatch();
    const [searchCourse, setSearchCourse] = useState(null)
    const navigate = useNavigate();
    const onFinish = async (values) => {
      try {
        dispatch(ShowLoading());
        let response = await searchCourseData({
            name: values.name,
          });
        if (response.success) {
          setCourse(response.data);
          setSearchCourse(response.data)
          message.success(response.message);
          navigate("/admin/course");
        } else {
          setCourse(null);
          message.error(response.message);
        }
        dispatch(HideLoading());
      } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
      }
    }

    const getAllCourse = ()=>{
      refreshData();
      setSearchCourse(null);
    }
  return (
    <>
    <div className='d-flex justify-between align-items-center'>
      <div className='pb-3 py-2 w-75'>
          <h1 className='text-xl py-2'>Search Task</h1>
          <Form layout="horizontal" onFinish={onFinish}>
                <Row className='d-flex' gutter={[10, 10]}>
                  <Col span={8}>
                    <Form.Item name="name" rules={[
                      {
                        required: true,
                        message: 'Please input course name!',
                      },
                    ]}>
                      <Input type="text" placeholder='course name' maxLength={50}/>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                      <button className="primary-contained-btn" type="submit">
                          Search
                      </button>
                  </Col>
                </Row>
          </Form>
      </div>
      {(searchCourse || !searchCourse) &&
      <div>
          <button className="primary-contained-btn" onClick={getAllCourse}>
                Get All Task
          </button>             
      </div>
      }
    </div>
    </>
  )
}

export default SearchCourse
