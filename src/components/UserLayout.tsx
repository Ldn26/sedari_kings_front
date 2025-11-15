import React from "react";
import AdminSideBar from "./AdminSideBar";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import UserSideBar from "./UserSideBar";

function UserLayout() {
  return (
    <div className="min-h-screen bg-background flex   overflow-hidden w-full ">
      {/* <Navbar /> */}
      <UserSideBar />
      <div className="flex-1  border   ">
        <Outlet />
      </div>
    </div>
  );
}


export default UserLayout;

// import React from "react";
// import AdminSideBar from "./AdminSideBar";
// import { Outlet } from "react-router-dom";

// function AdminLayout() {
//   return (
//     <div className="flex h-screen bg-[#f7f3ef]  overflow-hidden w-full ">
//       <AdminSideBar />
//       <div className="flex-1   p-6">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default AdminLayout;