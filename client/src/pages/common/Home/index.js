import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../../components/PageTitle";
import { Col, Row } from "antd";
import { message  } from "antd";
import { getAllCourse } from "../../../apicalls/course";
import { getAssignedCourses } from "../../../apicalls/instructor";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { useNavigate } from "react-router-dom";
import SearchLecture from "./SearchLecture";

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
        setCourses(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  // get all assigned course by user id // user home page
  const getAssignedCourse = async ()=>  {
    try {
      dispatch(ShowLoading());
      const response = await getAssignedCourses({
        userId: user?._id
      });
      dispatch(HideLoading());
      if (response.success) {
        setAssignedCourse(response.data);
      } else {
        message.error(response.message);
      }
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
              <h1 className="text-2xl py-3">All Lectures</h1>
          </div>
          <div className="home">
            <Row gutter={[16, 16]}>
              {assignedCourse?.map((course) => (
                <>
                {(!course.deleted) && <Col key={course?.courseName} span={span} className='d-flex p-2'>
                  <div className="card-lg flex flex-col gap-2 p-2">
                    <div className="d-flex justify-center align-items-center">
                      <img src={course?.course?.image} alt="loading" style={{width: '100%'}}/>
                    </div>
                    <h1 className="text-2xl">{course?.course.name}</h1>
                    <h1 className="text-md">Level : {course?.course.level}</h1>
                    <h1 className="text-md">Batch : {!course.batche? 'morning' : course?.batche}</h1>
                    <h1 className="text-md">Description : {course?.course.description}</h1>
                    <h1 className="text-md bg-secondary text-black px-2 py-3">Date : {course?.date}</h1>
                  </div>
                </Col>}
                </>
              ))}
            </Row>
          </div>
        </div> : <div>
        <div>
            <h1 className="text-2xl text-center py-3">All Courses</h1>
        </div>
        <div className="home">
          <Row gutter={[16, 16]}>
            {courses?.map((course) => (
              <>
              <Col key={course?._id} span={span} className='d-flex p-2'>
                <div className="card-lg flex flex-col gap-2 p-2">
                  <div className="d-flex justify-center align-items-center">
                    <img src={course?.image} alt="loading" style={{width: '100%'}}/>
                  </div>
                  <h1 className="text-2xl">{course?.name}</h1>
                  <h1 className="text-md">Level : {course?.level}</h1>
                  <h1 className="text-md">Description : {course?.description}</h1>
                  <button onClick={() => navigate(`/admin/course/edit/${course?._id}`)}>Assign Instructor</button>
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
