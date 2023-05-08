import { message  } from "antd";
import React, { useEffect, useState } from "react";
import { getUserInfo } from "../apicalls/users";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice.js";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  const [menu, setMenu] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userMenu = [
    {
      title: "Home",
      paths: ["/"],
      icon: <i className="ri-home-line"></i>,
      onClick: () => navigate("/"),
    },
    {
      title: "Complete",
      paths: ["/complete-task"],
      icon: <i className="ri-task-fill"></i>,
      onClick: () => navigate("/complete-task"),
    },
    {
      title: "Pending",
      paths: ["/pending-task"],
      icon: <i className="ri-arrow-right-up-line"></i>,
      onClick: () => navigate("/pending-task"),
    },
    {
      title: "Profile",
      paths: ["/profile"],
      icon: <i className="ri-profile-fill"></i>,
      onClick: () => navigate("/profile"),
    },
    {
      title: "Logout",
      paths: ["/logout"],
      icon: <i className="ri-logout-box-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        message.success('logout successfull');
        navigate("/login");
      },
    },
  ];

  const adminMenu = [
    {
      title: "Home",
      paths: ["/"],
      icon: <i className="ri-home-line"></i>,
      onClick: () => navigate("/"),
    },
    {
      title: "Course",
      paths: ["/admin/course", "/admin/course/add"],
      icon: <i className="ri-file-list-line"></i>,
      onClick: () => navigate("/admin/course"),
    },
    {
      title: "Users",
      paths: ["/admin/users"],
      icon: <i className="ri-user-line"></i>,
      onClick: () => navigate("/admin/users"),
    },
    {
      title: "All Tasks",
      paths: ["/all-task"],
      icon: <i className="ri-arrow-right-up-line"></i>,
      onClick: () => navigate("/all-task"),
    },
    {
      title: "Logout",
      paths: ["/logout"],
      icon: <i className="ri-logout-box-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        message.success('logout successfull');
        navigate("/login");
      },
    },
  ];

  const getUserData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getUserInfo();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
        if (response.data.isAdmin) {
          setMenu(adminMenu);
        } else {
          setMenu(userMenu);
        }
      } else {
        message.error(response.message);
      }
    } catch (error) {
      navigate("/login");
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const activeRoute = window.location.pathname;

  const getIsActiveOrNot = (paths) => {
    if (paths.includes(activeRoute)) {
      return true;
    } else {
      if (
        activeRoute.includes("/admin/course/add") &&
        paths.includes("/admin/course")
      ) {
        return true;
      }
      if (
        activeRoute.includes("/admin/users/add") &&
        paths.includes("/admin/users")
      ) {
        return true;
      }

    }
    return false;
  };
  const [width, setWidth] = useState(window.innerWidth);
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
    if (width < 600) {
        document.getElementById('navbar').style.display = 'block'
        document.getElementById('sidebar').style.display = 'none'
    } else {
        document.getElementById('sidebar').style.display = 'block'
        document.getElementById('navbar').style.display = 'none'
      }
}, [width]);
  return (
    <>
    <div className="layout">
      <div className="flex w-full h-full h-100">
          <div className="body">
            <div className="header flex justify-between">
              {!collapsed && (
                <i
                  className="ri-close-line"
                  onClick={() => setCollapsed(true)}
                ></i>
              )}
              {collapsed && (
                <i
                  className="ri-menu-line"
                  onClick={() => setCollapsed(false)}
                ></i>
              )}
              <h1 className="text-2xl text-white ps-3 ">Project Management</h1>
              <div className="pe-3">
                <div className="flex gap-1 items-center">
                  <h1 className="text-md text-white">{(user?.name)?.charAt(0).toUpperCase() + (user?.name)?.slice(1)}</h1>
                </div>
                <span>Role : {user?.isAdmin ? "Admin" : "User"}</span>
              </div>
              <div id="sidebar">
                <div className="menu d-flex flex-row">
                  {menu.map((item, index) => {
                    return (
                      <div
                        className={`menu-item ${
                          getIsActiveOrNot(item.paths) && "active-menu-item"
                        }`}
                        key={index}
                        onClick={item.onClick}
                      >
                        {item.icon}
                        {!collapsed && <span>{item.title}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="navbar" id="navbar">
            <div className="menu">
              {menu.map((item, index) => {
                return (
                  <div
                    className={`menu-item ${
                      getIsActiveOrNot(item.paths) && "active-menu-item"
                    }`}
                    key={index}
                    onClick={item.onClick}
                  >
                    {item.icon}
                    {!collapsed && <span>{item.title}</span>}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="content h-auto">
              {children}
          </div>
          <div className="text-center mt-3 card rounded bg-primary">
            <h1 className="text-sm p-3 text-white">&#169; Maheta Mihir</h1>
          </div>
        </div>
      </div>
    </div>  
    </>
  );
}

export default ProtectedRoute;
