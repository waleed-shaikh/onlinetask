import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCourseById, getAllCourse } from "../../../apicalls/course";
import PageTitle from "../../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import Pagination from "./Pagination";

function Course() {
  const navigate = useNavigate();
  const [course, setCourse] = React.useState([]);
  const dispatch = useDispatch();
  const [currentPage, setCurrntPage] = useState(1);
  const [coursePerPage, setCoursePerPage] = useState(5);

  //get current posts
  const indexOfLastCourse = currentPage * coursePerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursePerPage;
  const currentCourse = course.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalCourse = course?.length

  const getCourseData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllCourse();
      dispatch(HideLoading());
      if (response.success) {
        setCourse(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      dispatch(ShowLoading());
      const response = await deleteCourseById({
        courseId,
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getCourseData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  const columns = [
    {
      title: "Course Name",
      dataIndex: "name",
    },
    {
      title: "Cours Level",
      dataIndex: "level",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <i
            className="ri-pencil-line"
            onClick={() => navigate(`/admin/course/edit/${record._id}`)}
          ></i>
          <i
            className="ri-delete-bin-line"
            onClick={() => deleteCourse(record._id)}
          ></i>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getCourseData();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="flex justify-between mt-2 items-end">
        <PageTitle title="Course" />

        <button
          className="primary-outlined-btn flex items-center"
          onClick={() => navigate("/admin/course/add")}
        >
          <i className="ri-add-line"></i>
          Add Course
        </button>
      </div>
      <div className="divider"></div>
      <div className="overflow">
        <Table columns={columns} dataSource={currentCourse} />
      </div>
      <Pagination coursePerPage={coursePerPage} totalCourse={totalCourse} setCurrntPage={setCurrntPage} currentPage={
        currentPage
      }/>
    </div>
  );
}

export default Course;
