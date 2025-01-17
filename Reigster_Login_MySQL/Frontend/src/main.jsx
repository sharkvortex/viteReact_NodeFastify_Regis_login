import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Bounce } from "react-toastify";

import "./index.css";
import "./output.css";

import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { ToastContainer } from "react-toastify";
// Addmin Page
import AdminPage from "./pages/admin/adminpage.jsx";

import {ProtectedRoute , AdminRoute} from "./middleware.js";
createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<ProtectedRoute> <Index /></ProtectedRoute>}/>

      <Route path="/login" element={<Login />}></Route>

      <Route path="/register" element={<Register />}></Route>

      {/* Admin Page */}
    <Route path="/admin" element={<AdminRoute><AdminPage/></AdminRoute>}/>
      {/* Admin Page End */}
    </Routes>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
  </Router>
);
