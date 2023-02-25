import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../../components/PageTitle";
import { Col, message, Row } from "antd";
import { getAllCourse } from "../../../apicalls/course";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { Navigate, useNavigate } from "react-router-dom";
import SearchLecture from "./SearchLecture";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const [width, setWidth] = useState(window.innerWidth);
  const [span, setSpan] = useState(8);
  const [courses, setCourses] = useState(null);
  
  var today = new Date();
  var date = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();
  const data = user && user.courses.find((course)=>{
    return course.date  === date
  });
  const getAllCourseData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllCourse();
      dispatch(HideLoading());
      if (response.success) {
        setCourses(response.data);
        console.log(response.data)
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
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
    <div className="">
      <div className="mt-3">
        <PageTitle title={`Hi ${(user?.name)?.charAt(0).toUpperCase() + (user?.name)?.slice(1)}`} />
        <div className="divider"></div>
        {user?.isAdmin !== true? <div>
          <SearchLecture user={user}/>
          <div className="mb-4 bg-secondary pb-4">
            {data && <p className="text-xl py-3 bg-title ps-4">Today's Lecture</p>}
            {data && <div className="">
                  <div className="d-flex justify-start flex-row">
                    <img className="ms-3 border rounded-2" src={data?.courseImage} alt="loading" style={{width: '25%'}}/>
                    <div className="d-flex flex-column justify-center ps-4">
                      <h2 className="">{data?.courseName}</h2>
                      <h1 className="text-md">Level : {data?.courseLevel}</h1>
                      <h1 className="text-md">Batch : {!data.batche? 'morning' : data?.batche}</h1>
                      <h1 className="text-md">Description : {data?.courseDesc}</h1>
                      <h1 className="text-md">Date : {data?.date}</h1>
                    </div>  
                  </div>
            </div>}
          </div>
        <div>
            <h1 className="text-2xl text-center py-3">All Lectures</h1>
        </div>
        <div className="home">
        <Row gutter={[16, 16]}>
          {user?.courses.map((course) => (
            <>
            <Col span={span} className='d-flex p-2 '>
              <div className="card-lg flex flex-col gap-2 p-2">
                <div className="d-flex justify-center align-items-center">
                  <img src={course?.courseImage} alt="loading" style={{width: '100%'}}/>
                </div>
                <h1 className="text-2xl">{course?.courseName}</h1>
                <h1 className="text-md">Level : {course?.courseLevel}</h1>
                <h1 className="text-md">Batch : {!course.batche? 'morning' : course?.batche}</h1>
                <h1 className="text-md">Description : {course?.courseDesc}</h1>
                <h1 className="text-md bg-secondary text-black px-2 py-3">Date : {course?.date}</h1>
              </div>
            </Col>
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
            <Col span={span} className='d-flex p-2 '>
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
