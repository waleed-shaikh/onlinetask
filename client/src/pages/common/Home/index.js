import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../../components/PageTitle";
import { Col, Popconfirm, Row } from "antd";
import { message  } from "antd";
import { getAllCourse } from "../../../apicalls/course";
import { getAssignedCourses } from "../../../apicalls/instructor";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { Link, useNavigate } from "react-router-dom";
import SearchLecture from "./SearchLecture";
import {updateTaskById} from "../../../apicalls/instructor";

function Home() {
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
        setCourses((response.data).reverse());
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
    <>
    <div className="min-vh-100">
      <div className="mt-3">
        <PageTitle title={`Hi ${(user?.name)?.charAt(0).toUpperCase() + (user?.name)?.slice(1)}`} />
        <div className="divider"></div>
        {user?.isAdmin !== true? <div>
          <SearchLecture assignedCourse={assignedCourse}/>
          <div className="divider"></div>
          <div>
              <h1 className="text-2xl py-3">All Assign Tasks</h1>
          </div>
          <div className="home">
            <Row gutter={[16, 16]}>
              {assignedCourse?.map((course) => (
                <>
                {(!course.deleted) && <Col key={course?.courseName} span={span} className='d-flex p-2'>
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
        </div> : <div>
        <div>
            <h1 className="text-2xl text-center py-3">All Tasks</h1>
        </div>
        <div className="home">
          <Row gutter={[16, 16]}>
            {courses?.map((course) => (
              <>
              <Col key={course?._id} span={span} className='d-flex p-2'>
                <div className="card-lg flex flex-col gap-2 border border-secondary rounded p-3 w-100" style={{backgroundColor: 'lightgray'}}>
                  <h1 className="text-2xl bg-dark text-white px-2 py-1 rounded" style={{backgroundColor: '#333333'}}>{capitalizeFirstLetter(course?.name)}</h1>
                  <h1 className="text-md">Level : {course?.level}</h1>
                  <h1 className="text-md">Description : {course?.description}</h1>
                  <button className='rounded border-0 py-1' onClick={() => navigate(`/admin/course/edit/${course?._id}`)}>Assign Instructor</button>
                </div>
              </Col>
              </>
            ))}
          </Row>
        </div>
        </div>}
      </div>
    </div>
    </>
  );
}

export default Home;
