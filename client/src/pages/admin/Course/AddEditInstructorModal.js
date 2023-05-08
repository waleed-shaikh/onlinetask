import { Form , message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getAllInstructor,
    saveCourse,
  } from "../../../apicalls/instructor";
import {
  getCourseById,
  } from "../../../apicalls/course";
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';

const AddEditInstructorModal = ({getAssignedInstructors}) => {
    
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [users, setUsers] = useState(null);
    const [course, setCourse] = useState(null);
    const { user } = useSelector((state) => state.users);

    const newUsers = users && users.filter((element)=>{
        return element?._id !== user?._id
    })

    const onFinish = async (values)=>{
        try {
            dispatch(ShowLoading());
            const selectedUser = users && users.filter((user)=>{
              return user.name === values.name
            });
            let response;
            if (params.id) {
              response = await saveCourse({
                user: selectedUser[0]?._id,
                date: values.date,
                course: params.id,
              });
            }
            if (response.success) {
              message.success(response.message);
              getAssignedInstructors();
            } else {
              message.error(response.message);
            }
            dispatch(HideLoading());
          } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
          }
        };
    
    const getAllInstructors = async () => {
        try {
          dispatch(ShowLoading());
          const response = await getAllInstructor();
          dispatch(HideLoading());
          if (response.success) {
            setUsers(response.data);
          } else {
            message.error(response.message);
          }
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
          setCourse(response.data);
        } else {
          message.error(response.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
      }
    };
    
    useEffect(() => {
        if (params.id) {
            getAllInstructors();
            getCourseData();
        }
        // eslint-disable-next-line
    }, []);
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Assign Task</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <Form onFinish={onFinish} layout="vertical">
                <Form.Item name="name" label="Select User">
                    <select name="" id="" required>
                      <option value="">Select User</option>
                      {newUsers && newUsers.map((user)=>{
                        return <option key={user?._id} value={user.name}>{user.name}</option>
                      })}
                    </select>
                </Form.Item>
                <Form.Item name="date" label="Select Date">
                    <input type="date" required={true}/>
                </Form.Item>
                <div className="flex justify-end mt-2 gap-3">
                    <div className="modal-footer">
                        <button className="primary-outlined-btn cursor-pointer"  data-bs-dismiss="modal" type="button">
                            Close
                        </button>
                        <button className="primary-outlined-btn cursor-pointer"  data-bs-dismiss="modal" type="submit">
                            Save
                        </button>
                    </div>
                </div>
            </Form>
            </div>
            
          </div>
        </div>
      </div>
  )
}

export default AddEditInstructorModal
