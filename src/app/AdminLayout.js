"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LayersIcon from '@mui/icons-material/Layers';
import GarageIcon from '@mui/icons-material/Garage';

export const metadata = {
    title: "Admin Dashboard | XRide",
    description: "Manage all admin tasks with ease.",
    keyword: "admin dashboard, admin panel, admin tools, manage vehicle types, manage orders",
  };
  
  export default function AdminLayout({ children }) {
    
    const router = useRouter();

    useEffect(() => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      if (!isAuthenticated) {
        router.push("/");
      }
    }, [router]);
  
    const handleLogout = () => {
      localStorage.removeItem("isAuthenticated");
      router.push("/");
    };

    return (
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-gray-900 text-white p-4 flex justify-between items-center fixed top-0 left-0 w-full z-10">
          <h1 className="text-xl font-bold text-red-500">Welcome Admin 🧐</h1>
          <button onClick={handleLogout} className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600">
          <ExitToAppIcon/> Log Out
          </button>
        </header>
  
        {/* Layout Body */}
        <div className="flex flex-1 pt-16">
          {/* Sidebar */}
          <aside className="hidden md:block bg-gray-900 text-gray-300 w-64 fixed top-16 left-0 h-[calc(100%-4rem)]">
            <ul className="h-full overflow-y-auto">
              <li className="py-2 pt-4 px-4 hover:bg-gray-700">
                <a href="/admin/dashboard" className="block text-white">
                <DashboardIcon/> Dashboard
                </a>
              </li>
              <li className="py-2 px-4 hover:bg-gray-700">
                <a href="/admin/user" className="block text-white">
                <PeopleAltIcon/> Users
                </a>
              </li>
              <li className="py-2 px-4 hover:bg-gray-700">
                <a href="/admin/managebookings" className="block text-white">
                <LayersIcon/> Bookings
                </a>
              </li>
              <li className="py-2 px-4 hover:bg-gray-700">
                <a href="/admin/vehicletype" className="block text-white">
                <GarageIcon/> Vehicle Type
                </a>
              </li>
              <li className="py-2 px-4 hover:bg-gray-700">
                <a href="/admin/captain" className="block text-white">
                <PeopleAltIcon/> Captains
                </a>
              </li>
              
              <li className="py-2 px-4 hover:bg-gray-700 fixed bottom-5">
                <a href="" onClick={handleLogout} className="block text-white">
                <ExitToAppIcon/> Logout
                </a>
              </li>
             
            </ul>
          </aside>
  
          {/* Main Content */}
          <main className="flex-1 bg-gray-100 p-4 ml-0 md:ml-64 h-[calc(100vh-4rem)] overflow-y-auto">
            {children}
          </main>
        </div>
  
        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 p-4 text-center">
          Admin Footer © 2024
        </footer>
      </div>
    );
  }
  