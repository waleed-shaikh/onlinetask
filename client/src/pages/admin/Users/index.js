import { Popconfirm } from "antd";
import { message  } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUserById, getAllUsers } from "../../../apicalls/users";
import PageTitle from "../../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import Pagination from "./Pagination";
import SearchUsers from "./SearchUsers";


function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = React.useState(null);
  const [searchedUser, setSearchedUser] = useState(null);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage, setUserPerPage] = useState(10);

  const indexOfLastUser = currentPage * userPerPage ;
  const indexOfFirstUser = indexOfLastUser - userPerPage;

  const currentUser = users?.slice(indexOfFirstUser, indexOfLastUser);
  const totalUser = users?.length;

  const getUsersData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllUsers();
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

  const deleteUser = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await deleteUserById({
        id,
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getUsersData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
 
  useEffect(() => {
    getUsersData();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="min-vh-100">
      <div className="flex justify-between mt-2 items-end">
        <PageTitle title="Users" />
        <button
          className="primary-outlined-btn flex items-center"
          onClick={() => navigate("/admin/users/add")}
        >
          <i className="ri-add-line"></i>
          Add User
        </button>
      </div>
      <div className="divider"></div>
      <SearchUsers users={users} setSearchedUser={setSearchedUser} refreshData={getUsersData}/>
      <div className="divider"></div>
      <h1 className='text-xl pt-3'>All Users</h1>
      <div className="overflow">
        <table className='table table-light table-bordered w-100 m-0 mt-3'>
              <thead className='p-2 py-3 table-secondary'>
                  <tr>
                      <th scope="col" className='py-2 ps-4'>Name</th>
                      <th scope="col" className='py-2 ps-4'>Email Id</th>
                      <th scope="col" className='py-2 ps-4'>Mobile Number</th>
                      <th scope="col" className='py-2 ps-4'>Action</th>
                      <th scope="col" className='py-2 ps-4'>Role</th>
                  </tr>
              </thead>
              <tbody>
                    {searchedUser? searchedUser.map((user)=>{
                      return <tr className='m-2' key={user._id}>
                              <td className='ps-4'>{user.name}</td>
                              <td className='ps-4'>{user.email}</td>
                              <td className='ps-4'>{user.number}</td>
                              <td className='ps-4'>{user.isAdmin? "Admin" : "User"}</td>
                              <td className='ps-4'>
                                {!user.isAdmin && <div className="flex gap-2">
                                  <i
                                    className="ri-delete-bin-line"
                                    onClick={() => deleteUser(user._id)}
                                  ></i>
                                </div>}
                              </td>
                      </tr>
                    })
                      : 
                      currentUser?.map((user, index) => {
                        return  <tr className='m-2' key={user._id}>
                                  <td className='ps-4'>{user.name}</td>
                                  <td className='ps-4'>{user.email}</td>
                                  <td className='ps-4'>{user.number}</td>
                                  <td className='ps-4'>
                                    {!user.isAdmin && <div className="flex gap-2">
                                      <Popconfirm
                                        title="Confirm?"
                                        onConfirm={()=>{
                                          deleteUser(user._id)
                                        }}
                                        okText="Yes"
                                        cancelText="No"
                                      >
                                      <Link to="#">
                                        <i className="ri-delete-bin-line"></i></Link>
                                      </Popconfirm>
                                    </div>}
                                  </td>
                                  <td className='ps-4'>{user.isAdmin? "Admin" : "User"}</td>
                        </tr>
                        })
                    }
              </tbody>
          </table>
      </div>
      <Pagination totalUser={totalUser} setCurrentPage={setCurrentPage} userPerPage={userPerPage} currentPage={currentPage}/>
    </div>
  );
}

export default Users;
