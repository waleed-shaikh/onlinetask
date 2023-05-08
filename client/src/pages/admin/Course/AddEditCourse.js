import { Col, Form, Popconfirm, Row } from "antd";
import { message  } from "antd";
import React, { useEffect, useState } from "react";
import {addCourse,getCourseById, editCourseById,} from "../../../apicalls/course";
import {deleteAssignedInstructor, getAllAssignInstructors} from "../../../apicalls/instructor";
import PageTitle from "../../../components/PageTitle";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { Tabs } from "antd";
import AddEditInstructorModal from "./AddEditInstructorModal";

function AddEditCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [assignedInstructors, setAssignedInstructors] = useState(null);
  const params = useParams();

  const onFinish = async (values) => {
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
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  // get all assigned instructor by course id
  const getAssignedInstructors = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllAssignInstructors({
        course: params.id,
      });
      dispatch(HideLoading());
      if (response.success) {
        setAssignedInstructors(response.data);
      } 
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  //delete assigned instructor by instructor id
  const deleteInstructor = async (element)=>{
    try{
      dispatch(ShowLoading());
      const response = await deleteAssignedInstructor({
        id: element,
      });
      dispatch(HideLoading());
      if (response.success) {
        getAssignedInstructors();
        message.success(response.message);
      } 
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }

  const getUpperCase = (element)=>{
    let upperCase = element.charAt(0).toUpperCase() + element.slice(1);
    return upperCase
  }
  useEffect(() => {
    if (params.id) {
      getCourseData();
      getAssignedInstructors();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-vh-100">
      <PageTitle title={params.id? "Edit Task" : "Add Task"} />
      <div className="divider"></div>
      <div>
      {(courseData || !params.id)  && (
        <Form layout="ho" onFinish={onFinish} initialValues={courseData}>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Task Details" key="1">
              <Row gutter={[10, 10]} className='d-flex flex-column'>
                <Col span={8}>
                  <Form.Item label="Task Name" name="name" rules={[
                    {
                      required: true,
                      message: 'Please input task details!',
                    },
                  ]}>
                    <input type="text" maxLength={20} minLength={3}/>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Task Level" name="level" rules={[
                    {
                      required: true,
                      message: 'Please select task level!',
                    },
                  ]}>
                    <select name="" id="" >
                      <option value="">Select Level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advance">Advance</option>
                    </select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Description" name="description"  rules={[
                    {
                      required: true,
                      message: 'Please input task description!',
                    },
                  ]}>
                    <input type="text" maxLength={100} minLength={10}/>
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex justify-start gap-2 mt-4">
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
              <div className="divider"></div>
            </Tabs.TabPane>
            {params.id && (
              <Tabs.TabPane tab="Users" key="2">
                <div className="flex justify-between align-items-center mt-3">
                  <h1 className="text-xl">{getUpperCase(courseData.name)  + ' ' + getUpperCase(courseData.level)}</h1>
                  <div className="flex justify-between ">
                    <button
                      className="primary-outlined-btn cursor-pointer"
                      data-bs-toggle="modal" data-bs-target="#exampleModal"
                      type="button">
                      Assign Tasks
                    </button>
                    </div>
                </div>
                <div className="divider"></div>
                {assignedInstructors && 
                <>
                <h1 className="text-xl mt-3">Assigned Users</h1>
                <div>
                  <div className="overflow">
                      <table className='table table-light table-bordered w-100 m-0 mt-3'>
                          <thead className='p-2 py-3 table-secondary'>
                              <tr>
                                  <th scope="col" className='py-2 ps-4'>Name</th>
                                  <th scope="col" className='py-2 ps-4'>Date</th>
                                  <th scope="col" className='py-2 ps-4'>Mobile Number</th>
                                  <th scope="col" className='py-2 ps-4'>Email Id</th>
                                  <th scope="col" className='py-2 ps-4'>Status</th>
                                  <th scope="col" className='py-2 ps-4'>Actions</th>
                              </tr>
                          </thead>
                          <tbody>
                                {assignedInstructors?.map((instructor, index) => {
                                return  <tr className='m-2' key={instructor?._id}>
                                          <td className='ps-4'>{(instructor?.user.name).charAt(0).toUpperCase() + (instructor?.user.name).slice(1)}</td>
                                          <td className='ps-4'>{instructor?.date}</td>
                                          <td className='ps-4'>{instructor?.user.number}</td>
                                          <td className='ps-4'>{instructor?.user.email}</td>
                                          <td className={`ps-4 text-${instructor?.status === 'pending'? 'danger' : 'success'}`}>{instructor?.status}</td>
                                          <td className='ps-4'>
                                            <div className="flex gap-2">
                                              <Popconfirm
                                                title="Confirm?"
                                                onConfirm={()=>{
                                                  deleteInstructor(instructor._id)
                                                }}
                                                okText="Yes"
                                                cancelText="No"
                                              >
                                              <Link to="#">
                                                <i className="ri-delete-bin-line"></i></Link>
                                              </Popconfirm>
                                            </div>
                                          </td>
                                </tr>
                                })}
                        </tbody>
                    </table>
                  </div>
                </div>
                </>
                }
              </Tabs.TabPane>
          )}
          </Tabs>
        </Form>
      )}
      </div>
      <AddEditInstructorModal getAssignedInstructors={getAssignedInstructors}/>
    </div>
  );
}

export default AddEditCourse;
