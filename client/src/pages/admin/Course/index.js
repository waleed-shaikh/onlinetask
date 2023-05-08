import { message, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteCourseById, getAllCourse } from "../../../apicalls/course";
import { editAssignedInstructors } from "../../../apicalls/instructor";
import PageTitle from "../../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import Pagination from "./Pagination";
import SearchCourse from "./SearchCourse";
import toast, { Toaster } from "react-hot-toast";

function Course() {
  const navigate = useNavigate();
  const [course, setCourse] = React.useState(null);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [coursePerPage, setCoursePerPage] = useState(10);

  const indexOfLastCourse = currentPage * coursePerPage ;
  const indexOfFirstCourse = indexOfLastCourse - coursePerPage;

  const currentCourse = course?.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalCourse = course?.length;

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
    // let result = confirm("Want to delete?");
      try {
        dispatch(ShowLoading());  
        const response = await deleteCourseById({
          courseId,
        });
        dispatch(HideLoading());
        if (response.success) {
          message.success(response.message)
          getCourseData();
        } else {
          message.error(response.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
      }

      try {
        dispatch(ShowLoading());
        const response = await editAssignedInstructors({
          courseId,
        })
        dispatch(HideLoading());
        if (response.success) {
          getCourseData();
        } else {
          message.error(response.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
      }
  };

  useEffect(() => {
    getCourseData();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="min-vh-100">
      <div className="flex justify-between mt-2 items-end">
        <PageTitle title="Task" />
        <button
          className="primary-outlined-btn flex items-center"
          onClick={() => navigate("/admin/course/add")}
        >
          <i className="ri-add-line"></i>
          Add Task
        </button>
      </div>
      <div className="divider"></div>
      <SearchCourse setCourse={setCourse} refreshData={getCourseData}/>
      <div className="divider"></div>
      <h1 className='text-xl pt-3'>All Task</h1>
      <div className="overflow">
          <table className='table table-light table-bordered w-100 m-0 mt-3'>
              <thead className='p-2 py-3 table-secondary'>
                  <tr>
                      <th scope="col" className='py-2 ps-4'>Task Name</th>
                      <th scope="col" className='py-2 ps-4'>Task Level</th>
                      <th scope="col" className='py-2 ps-4'>Task Description</th>
                      <th scope="col" className='py-2 ps-4'>Action</th>
                  </tr>
              </thead>
              <tbody>
                      {currentCourse?.map((course, index) => {
                      return  <tr className='m-2' key={course._id}>
                                <td className='ps-4'>{course.name}</td>
                                <td className='ps-4'>{course.level}</td>
                                <td className='ps-4'>{course.description}</td>
                                <td className='ps-4'>
                                  <div className="flex gap-2">
                                    <i
                                      className="ri-pencil-line"
                                      onClick={() => navigate(`/admin/course/edit/${course._id}`)}
                                    ></i>
                                    <Popconfirm
                                      title="Confirm?"
                                      onConfirm={()=>{
                                        deleteCourse(course._id)
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
      <Pagination totalCourse={totalCourse} setCurrentPage={setCurrentPage} coursePerPage={coursePerPage} currentPage={currentPage}/>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default Course;
