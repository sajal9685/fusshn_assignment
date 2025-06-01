import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./adminLogin";
import RequireAdmin from "./requireAdmin";
import TabSwitch from "./tabSwitch";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route
        path=""
        element={
          <RequireAdmin>
            <TabSwitch />
          </RequireAdmin>
        }
      />
      <Route path="*" element={<Navigate to="/admin/login" />} />
    </Routes>
  );
}
