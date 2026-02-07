import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Navbar from "./components/Navbar";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLogin from "./pages/auth/AdminLogin";

import UserDashboard from "./pages/user/UserDashboard";
import SearchBus from "./pages/user/SearchBus";
import SelectSeat from "./pages/user/SelectSeat";
import Payment from "./pages/user/Payment";
import MyBookings from "./pages/user/MyBookings";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AddBus from "./pages/admin/AddBus";
import ViewBuses from "./pages/admin/ViewBuses";
import ViewBookings from "./pages/admin/ViewBookings";
import ViewRevenue from "./pages/admin/ViewRevenue";
import Ticket from "./pages/user/Ticket";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/dashboard"
          element={<ProtectedRoute><UserDashboard /></ProtectedRoute>}
        />

        <Route
          path="/search"
          element={<ProtectedRoute><SearchBus /></ProtectedRoute>}
        />

        <Route
          path="/select-seat"
          element={<ProtectedRoute><SelectSeat /></ProtectedRoute>}
        />

        <Route
          path="/payment"
          element={<ProtectedRoute><Payment /></ProtectedRoute>}
        />

        <Route
          path="/my-bookings"
          element={<ProtectedRoute><MyBookings /></ProtectedRoute>}
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={<AdminRoute><AdminDashboard /></AdminRoute>}
        />

        <Route
          path="/admin/add-bus"
          element={<AdminRoute><AddBus /></AdminRoute>}
        />

        <Route
          path="/admin/buses"
          element={<AdminRoute><ViewBuses /></AdminRoute>}
        />

        <Route path="/admin/bookings" element={<AdminRoute><ViewBookings /></AdminRoute>}/>
        <Route path="/admin/revenue" element={<AdminRoute><ViewRevenue /></AdminRoute>} />

        <Route
          path="/ticket/:id"
          element={<ProtectedRoute><Ticket /></ProtectedRoute>}
        />

        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
