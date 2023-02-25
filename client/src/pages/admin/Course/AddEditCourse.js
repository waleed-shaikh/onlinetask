import { Col, Form, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import {
  addCourse,
  getCourseById,
  editCourseById,
} from "../../../apicalls/course";
// import {
//   getAllCourseInstructor
// } from "../../../apicalls/instructor";
import PageTitle from "../../../components/PageTitle";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { Tabs } from "antd";
import AddEditInstructorModal from "./AddEditInstructorModal";
// const { items } = Tabs;

function AddEditCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  // const [allInstructors, setAllInstructors] = useState(null);
  const [courseImage, setCourseImage] = useState(null);
  const [pic, setPic] = useState(null);
  const params = useParams();

  //image API: api.cloudinary.com
  const postDetails = (image) => {
    if (!image) {
        return message.error('Please Select an image');
    }
    if (image.type === 'image/jpeg' || image.type === 'image/png') {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'onlinelecture');
        data.append('cloud_name', 'Krantikaari');
        fetch('https://api.cloudinary.com/v1_1/dn5oapayl/image/upload/', {
            method: 'post',
            body: data,
        }).then((res) => res.json()).then((data) => {
            setPic(data.url);
        }).catch((err) => {
            message.error(err);
        })
    } else {
        return message.error('Please Select an image');
    }
  }

  const onFinish = async (values) => {
    values.image = pic;
    try {
      dispatch(ShowLoading());
      let response;
      if (params.id) {
        response = await editCourseById({
          ...values,
          courseId: params.id,
        });
      } else {
        response = await addCourse(values);
      }
      if (response.success) {
        message.success(response.message);
        navigate("/admin/course");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  
  const getCourseData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getCourseById({
        courseId: params.id,
      });
      dispatch(HideLoading());
      if (response.success) {
        setCourseData({
            name: response.data.name,
            level: response.data.level,
            description: response.data.description,
            _id: response.data._id,
        });
        setCourseImage(response.data.image);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  // const getAllInstructors = async () => {
  //   try {
  //     dispatch(ShowLoading());
  //     const response = await getAllCourseInstructor({
  //       courseId: params.id,
  //     });
  //     dispatch(HideLoading());
  //     if (response.success) {
  //       setAllInstructors(response.data.data);
  //       setCourseImage(response.data.image);
  //     } else {
  //       message.error(response.message);
  //     }
  //   } catch (error) {
  //     dispatch(HideLoading());
  //     message.error(error.message);
  //   }
  // };

  useEffect(() => {
    if (params.id) {
      getCourseData();
      // getAllInstructors();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <PageTitle title={params.id? "Edit Course" : "Add Course"} />
      <div className="divider"></div>

      {(courseData || !params.id) && (
        <Form layout="vertical" onFinish={onFinish} initialValues={courseData}>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Course Details" key="1">
              <Row gutter={[10, 10]}>
                <Col span={8}>
                  <Form.Item label="Course Name" name="name">
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Course Level" name="level">
                    <select name="" id="">
                      <option value="">Select Level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advance">Advance</option>
                    </select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Description" name="description">
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Upload Image" name="image">
                    <input value='' type="file" onChange={(e) => postDetails(e.target.files[0])}/>
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex justify-end gap-2">
                <button
                  className="primary-outlined-btn"
                  type="button"
                  onClick={() => navigate("/admin/course")}
                  >
                  Cancel
                </button>
                <button className="primary-contained-btn" type="submit">
                  Save
                </button>
              </div>
            </Tabs.TabPane>
            {params.id && (
              <Tabs.TabPane tab="Instructors" key="2">
                <div className="flex justify-center mt-5">
                  <button
                    className="primary-outlined-btn cursor-pointer"
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                    type="button">
                    Assign Instructor
                  </button>
                </div>
              </Tabs.TabPane>
          )}
          </Tabs>
        </Form>
      )}
      <AddEditInstructorModal courseId={params.id} courseImage={courseImage}/>
    </div>
  );
}

export default AddEditCourse;
