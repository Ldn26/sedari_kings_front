import React from 'react'
import AdminSideBar from './AdminSideBar';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="flex h-screen bg-[#f7f3ef]  overflow-hidden w-full ">
      <AdminSideBar />
      <div className="flex-1  mt-8   p-2">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout