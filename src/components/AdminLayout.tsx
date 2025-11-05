import React from 'react'
import AdminSideBar from './AdminSideBar';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden w-full ">
      <AdminSideBar />
      <div className="flex-1   p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout