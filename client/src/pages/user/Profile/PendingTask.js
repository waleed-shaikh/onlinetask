import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../../components/PageTitle";
import { Col, Popconfirm, Row } from "antd";
import { message  } from "antd";
import { getAllCourse } from "../../../apicalls/course";
import { getAssignedCourses } from "../../../apicalls/instructor";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { Link, useNavigate } from "react-router-dom";
import {updateTaskById} from "../../../apicalls/instructor";

function PendingTask() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const [width, setWidth] = useState(window.innerWidth);
  const [span, setSpan] = useState(8);
  const [courses, setCourses] = useState(null);  //admin part
  const [assignedCourse, setAssignedCourse] = useState(null); // user part

  // get all course // admin home page
  const getAllCourseData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllCourse();
      dispatch(HideLoading());
      if (response.success) {
        setCourses(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // get all assigned course by user id // user home page
  const getAssignedCourse = async ()=>  {
    try {
      dispatch(ShowLoading());
      const response = await getAssignedCourses({
        userId: user?._id
      });
      dispatch(HideLoading());
      if (response.success) {
        setAssignedCourse((response.data).reverse());
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }
  
  //update tast to completed
  const updateTask = async(id)=>{
    try {
      dispatch(ShowLoading());
      let response;
      if (id) {
        response = await updateTaskById({
          status: 'completed',
          id: id,
        });
      } 
      if (response.success) {
        message.success(response.message);
        getAssignedCourse()
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }

  useEffect(() => {
    const handleResize = () => {
        setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    getAllCourseData();
    getAssignedCourse();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
      if (width < 600) {
          setSpan(24);
      } else {
          setSpan(8);
      }
  }, [width]);
  return ( 
    <div className='mt-3 h-screen'>
        <PageTitle title="Pending Tasks"/>
        <div className="divider"></div>
        <div className='d-flex justify-content-end align-items-center'>
            <h5 className="text-xl text-center py-1 p-2 rounded">Total Tasks: <span className='m-0 p-0 bg-warning px-2 rounded-pill py-1'>{assignedCourse?.length}</span></h5>
        </div>
        <div className="home">
            <Row gutter={[16, 16]}>
              {assignedCourse?.map((course) => (
                <>
                {(!course?.deleted && course?.status === 'pending') && <Col key={course?.courseName} span={span} className='d-flex p-2'>
                  <div className="card-lg flex flex-col gap-2 p-2 w-100 border border-1 rounded " style={{backgroundColor: '#f9f9f9'}}>
                    <div className='d-flex justify-content-between align-items-center bg-dark px-2 py-1 rounded'>
                      <h1 className="text-2xl text-white">{capitalizeFirstLetter(course?.course.name)}</h1>
                      <Popconfirm
                        title="Have you completed the task"
                        onConfirm={()=>{
                          updateTask(course?._id)
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Link to="#">
                          <i className="ri-edit-box-line text-2xl text-white"></i>
                        </Link>
                      </Popconfirm>
                    </div>
                    <h1 className="text-md">Level : {course?.course.level}</h1>
                    <h1 className="text-md">Description : {course?.course.description}</h1>
                    <h1 className={`text-md text-${course?.status === 'pending'? 'danger' : 'success'}`}> <span className='text-dark text-md'>Status: </span> {course?.status}</h1>
                    <hr className='p-0 m-0 mt-3' />
                    <h1 className="text-md text-black px-2 py-2 m-0 rounded">Date : {course?.date}</h1>
                  </div>
                </Col>}
                </>
              ))}
            </Row>
          </div>
    </div>
  )
}

export default PendingTask
