import { Popconfirm } from "antd";
import { message  } from "antd";
import React, { useEffect, useState } from "react";
import {deleteAssignedInstructor, getAllAssignedTasks, getAllPendingAssignTasks, getAllCompletedAssignTasks} from "../../../apicalls/instructor";
import PageTitle from "../../../components/PageTitle";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { Tabs } from "antd";
function AllTasks() {
  const dispatch = useDispatch();
  const [assignedInstructors, setAssignedInstructors] = useState(null);
  const [allPendingAssignTasks, setAllPendingAssignTasks] = useState(null);
  const [allCompletedAssignTasks, setAllCompletedAssignTasks] = useState(null);

  // get all assigned instructor by course id
  const getAllAssignTasks = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllAssignedTasks();
      dispatch(HideLoading());
      if (response.success) {
        setAssignedInstructors((response.data).reverse());
      } 
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  // get all pending assigned tasks
  const getPendingAssignTasks = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllPendingAssignTasks();
      dispatch(HideLoading());
      if (response.success) {
        setAllPendingAssignTasks((response.data).reverse());
        console.log((response.data).reverse());
      } 
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  // get all completed assigned tasks
  const getCompletedAssignTasks = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllCompletedAssignTasks();
      dispatch(HideLoading());
      if (response.success) {
        setAllCompletedAssignTasks((response.data).reverse());
      } 
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  //delete assigned instructor by instructor id
  const deleteTask = async (id)=>{
    try{
      dispatch(ShowLoading());
      const response = await deleteAssignedInstructor({
        id: id,
      });
      dispatch(HideLoading());
      if (response.success) {
        getAllAssignTasks();
        getPendingAssignTasks()
        getCompletedAssignTasks()
        message.success(response.message);
      } 
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }

  useEffect(() => {
    getAllAssignTasks();
    getPendingAssignTasks()
    getCompletedAssignTasks()
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-vh-100">
      <PageTitle title="All Assigned Tasks" />
      <div className="divider"></div>
      <div className='text-end my-4 d-flex justify-content-between'>
        <h6 className='m-0 p-0'>Total Assign Tasks: <span className='m-0 p-0 bg-warning px-2 rounded-pill'>{assignedInstructors?.length}</span> </h6>
        <div className='d-flex align-items-center gap-2'>
            <h6 className='m-0 p-0'>Pen: <span className='m-0 p-0 bg-warning px-2 rounded-pill'>{allPendingAssignTasks?.length}</span> </h6>
            <h6 className='m-0 p-0'>Com: <span className='m-0 p-0 bg-warning px-2 rounded-pill'>{allCompletedAssignTasks?.length}</span> </h6>
        </div>
      </div>
      <div>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="All Assign Tasks" key="1">
            <div className="overflow">
                <table className='table table-light table-bordered w-100 m-0 mt-3'>
                    <thead className='p-2 py-3 table-secondary'>
                        <tr>
                            <th scope="col" className='py-2 ps-4'>#</th>
                            <th scope="col" className='py-2 ps-4'>Name</th>
                            <th scope="col" className='py-2 ps-4'>Level</th>
                            <th scope="col" className='py-2 ps-4'>User</th>
                            <th scope="col" className='py-2 ps-4'>Number</th>
                            <th scope="col" className='py-2 ps-4'>Date</th>
                            <th scope="col" className='py-2 ps-4'>Status</th>
                            <th scope="col" className='py-2 ps-4'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                            {assignedInstructors?.map((course, index) => {
                            return  <tr className='m-2' key={course?._id}>
                                        <td className='ps-4'>{index+1}</td>
                                        <td className='ps-4'>{course?.course?.name}</td>
                                        <td className='ps-4'>{course?.course?.level}</td>
                                        <td className='ps-4'>{course?.user?.name}</td>
                                        <td className='ps-4'>{course?.user?.number}</td>
                                        <td className='ps-4'>{course?.date}</td>
                                        <td className={`ps-4 ${course?.status === 'pending'? 'text-danger': 'text-success'}`}>{course?.status}</td>
                                        <td className='ps-4'>
                                        <div className="flex gap-2">
                                            <Popconfirm
                                            title="Confirm?"
                                            onConfirm={()=>{
                                                deleteTask(course?._id)
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
            </Tabs.TabPane>
            <Tabs.TabPane tab="Pending Tasks" key="2">
            <div className="overflow">
                <table className='table table-light table-bordered w-100 m-0 mt-3'>
                    <thead className='p-2 py-3 table-secondary'>
                        <tr>
                            <th scope="col" className='py-2 ps-4'>#</th>
                            <th scope="col" className='py-2 ps-4'>Task Name</th>
                            <th scope="col" className='py-2 ps-4'>Task Level</th>
                            <th scope="col" className='py-2 ps-4'>User Name</th>
                            <th scope="col" className='py-2 ps-4'>User Number</th>
                            <th scope="col" className='py-2 ps-4'>Assign Date</th>
                            <th scope="col" className='py-2 ps-4'>Status</th>
                            <th scope="col" className='py-2 ps-4'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                            {allPendingAssignTasks?.map((course, index) => {
                            return  <tr className='m-2' key={course?._id}>
                                        <td className='ps-4'>{index+1}</td>
                                        <td className='ps-4'>{course?.course?.name}</td>
                                        <td className='ps-4'>{course?.course?.level}</td>
                                        <td className='ps-4'>{course?.user?.name}</td>
                                        <td className='ps-4'>{course?.user?.number}</td>
                                        <td className='ps-4'>{course?.date}</td>
                                        <td className={`ps-4 text-danger`}>{course?.status}</td>
                                        <td className='ps-4'>
                                        <div className="flex gap-2">
                                            <Popconfirm
                                            title="Confirm?"
                                            onConfirm={()=>{
                                                deleteTask(course?._id)
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
            </Tabs.TabPane>
            <Tabs.TabPane tab="Completed Tasks" key="3">
            <div className="overflow">
                <table className='table table-light table-bordered w-100 m-0 mt-3'>
                    <thead className='p-2 py-3 table-secondary'>
                        <tr>
                            <th scope="col" className='py-2 ps-4'>#</th>
                            <th scope="col" className='py-2 ps-4'>Task Name</th>
                            <th scope="col" className='py-2 ps-4'>Task Level</th>
                            <th scope="col" className='py-2 ps-4'>User Name</th>
                            <th scope="col" className='py-2 ps-4'>User Number</th>
                            <th scope="col" className='py-2 ps-4'>Assign Date</th>
                            <th scope="col" className='py-2 ps-4'>Status</th>
                            <th scope="col" className='py-2 ps-4'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                            {allCompletedAssignTasks?.map((course, index) => {
                            return  <tr className='m-2' key={course?._id}>
                                        <td className='ps-4'>{index+1}</td>
                                        <td className='ps-4'>{course?.course?.name}</td>
                                        <td className='ps-4'>{course?.course?.level}</td>
                                        <td className='ps-4'>{course?.user?.name}</td>
                                        <td className='ps-4'>{course?.user?.number}</td>
                                        <td className='ps-4'>{course?.date}</td>
                                        <td className='ps-4 text-success'>{course?.status}</td>
                                        <td className='ps-4'>
                                        <div className="flex gap-2">
                                            <Popconfirm
                                            title="Confirm?"
                                            onConfirm={()=>{
                                                deleteTask(course?._id)
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
            </Tabs.TabPane>
          </Tabs>
      </div>
    </div>
  );
}

export default AllTasks;
