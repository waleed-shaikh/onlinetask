import "./stylesheets/theme.css";
import "./stylesheets/alignments.css";
import "./stylesheets/textelements.css";
import "./stylesheets/custom-components.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/layout.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/common/Login";
import Register from "./pages/common/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/common/Home";
import Course from "./pages/admin/Course";
import Users from "./pages/admin/Users";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import Profile from "./pages/user/Profile/Profile";
import UserRegistration from "./pages/admin/Users/UserRegistration";
import AddEditCourse from "./pages/admin/Course/AddEditCourse";
import ForgotPassword from "./pages/common/Login/ForgotPassword";
import PasswordReset from "./pages/common/Login/PasswordReset";

function App() {
  const { loading } = useSelector((state) => state.loader);
  return (
    <>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          {/* Common Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgot-password/:id" element={<PasswordReset/>} />
          <Route path="/register" element={<Register />} />

          {/* User Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          {/* Admin Routes */}
          <Route
            path="/admin/course"
            element={
              <ProtectedRoute>
                <Course/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/course/add"
            element={
              <ProtectedRoute>
                <AddEditCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/course/edit/:id"
            element={
              <ProtectedRoute>
                <AddEditCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users/add"
            element={
              <ProtectedRoute>
                <UserRegistration/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
