import { message, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUserById, getAllUsers } from "../../../apicalls/users";
import PageTitle from "../../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function Users() {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const [users, setUsers] = React.useState(null);
  const dispatch = useDispatch();

  let newUsers = users?.filter((element)=>{
    return element?._id !== user._id
  })

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
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email Id",
      dataIndex: "email",
    },
    {
      title: "Mobile Number",
      dataIndex: "number",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <i
            className="ri-delete-bin-line"
            onClick={() => deleteUser(record._id)}
          ></i>
        </div>
      ),
    },

  ];
  useEffect(() => {
    getUsersData();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
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
      <div className="overflow">
        <Table columns={columns} dataSource={newUsers} />
      </div>
    </div>
  );
}

export default Users;
