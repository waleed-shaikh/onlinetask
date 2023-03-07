import { Col, Form, message, Row } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {searchInstructorData} from "../../../apicalls/instructor";
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';

const SearchInstructor = ({setAssignedInstructors,courseData, refreshData}) => {
    const dispatch = useDispatch();
    const [searchInstructor, setSearchInstructor] = useState(null)
    
    const onFinish = async (values) => {
      try {
        dispatch(ShowLoading());
        let response = await searchInstructorData({
            userName: values.name,
            courseId:  courseData._id
          });
        if (response.success) {
            setAssignedInstructors(response.data);
            setSearchInstructor(response.data)
            message.success(response.message);
        } else {
          message.error(response.message);
        }
        dispatch(HideLoading());
      } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
      }
    }

    const getAllInstructors = ()=>{
      refreshData();
      setSearchInstructor(null);
    }
  return (
    <>
    <div className='d-flex justify-between align-items-center mt-3'>
      <div className='pb-3 py-2 w-100'>
          <Form layout="horizontal" onFinish={onFinish}>
                <Row className='d-flex' gutter={[10, 10]}>
                  <Col span={8}>
                    <Form.Item name="name" rules={[
                      {
                        required: true,
                        message: 'Please input instructor name!',
                      },
                    ]}>
                      <input type="text" placeholder='instructor name' maxLength={15}/>
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
      {searchInstructor &&
      <div>
          <button className="primary-contained-btn" onClick={getAllInstructors}>
                Get All Instructor
          </button>             
      </div>
      }
    </div>
    </>
  )
}

export default SearchInstructor
