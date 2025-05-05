import React, { useState } from "react";
import {
  FaBars,
  FaCarRear,
  FaChevronDown,
  FaChevronUp,
  FaBriefcase,
  FaUser,
  FaTruck,
  FaNewspaper,
} from "react-icons/fa6";
import { FaUsersCog } from "react-icons/fa";
import { MdShop } from "react-icons/md";
import logo from "../assets/logo.png";
import avatar from "../assets/avatar.png";
import { Link, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { FaUsers } from "react-icons/fa";
import { PiUsersFour } from "react-icons/pi";
import { RiLuggageCartLine } from "react-icons/ri";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState({
    fleet: false,
    business: false,
    user: false,
  });

  const location = useLocation();

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const isActive = (path) => location.pathname === path;
  const isAdmin = useAdmin();

  return (
    <div className="overflow-y-scroll hide-scrollbar">
      <main>
        {/* Logo */}
        <div className="flex justify-center border-b border-gray-300">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-28" />
          </Link>
        </div>

        {/* Admin Info */}
        <div className="p-3 border-b border-gray-300">
          <div className="bg-white p-2 rounded-md flex gap-2 items-center">
            <img
              src={avatar}
              alt="Admin Avatar"
              className="w-8 rounded-2xl drop-shadow"
            />
            <h3 className="text-primary font-semibold">Admin</h3>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-3 px-2">
          <ul className="space-y-3">
            {/* Dashboard */}
            <li
              className={`py-3 px-2 rounded-sm cursor-pointer ${
                isActive("/")
                  ? "bg-primary text-white"
                  : "text-white bg-primary"
              }`}
            >
              <Link to="/" className="flex items-center gap-2 font-semibold">
                <FaBars />
                <span className="ps-2">Dashboard</span>
              </Link>
            </li>

            {isAdmin ? (
              <>
                {/* Fleet Management */}
                <li className="text-primary font-medium rounded-sm">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => toggleMenu("fleet")}
                    className="flex justify-between items-center py-3 px-2 cursor-pointer hover:bg-primary hover:text-white hover:rounded-sm duration-300"
                  >
                    <span className="flex items-center gap-2">
                      <FaCarRear />
                      <span>Fleet Management</span>
                    </span>
                    <span
                      className={`transform transition-transform duration-900 ${
                        openMenu.fleet ? "rotate-180" : ""
                      }`}
                    >
                      <FaChevronDown />
                    </span>
                  </div>

                  <div
                    className={`transition-all duration-900 ease-in-out overflow-hidden ${
                      openMenu.fleet ? "max-h-[200px]" : "max-h-0"
                    }`}
                  >
                    <ul className="px-2 text-sm mt-2">
                      <li>
                        <Link
                          to="/CarList"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/CarList")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/CarList") ? "bg-white" : "bg-primary"
                            }`}
                          ></div>
                          <span>Vehicle List</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/DriverList"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/DriverList")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/DriverList")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Driver List</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/TripList"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/TripList")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/TripList") ? "bg-white" : "bg-primary"
                            }`}
                          ></div>
                          <span>Trip List</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/Fuel"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Fuel")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/Fuel") ? "bg-white" : "bg-primary"
                            }`}
                          ></div>
                          <span>Fuel</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/Parts"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Parts")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/Parts") ? "bg-white" : "bg-primary"
                            }`}
                          ></div>
                          <span>Spare & Parts List</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/Maintenance"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Maintenance")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/Maintenance")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Maintenance</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                {/* Vendor management */}
                <li className="text-primary font-medium rounded-sm">
                  <div
                    onClick={() => toggleMenu("vendor")}
                    className="flex justify-between items-center py-3 px-2 cursor-pointer hover:bg-primary hover:text-white hover:rounded-sm duration-300"
                  >
                    <span className="flex items-center gap-2">
                      <FaUsers />
                      <span>Vendor Management</span>
                    </span>
                    <span
                      className={`transform transition-transform duration-900 ${
                        openMenu.vendor ? "rotate-180" : ""
                      }`}
                    >
                      <FaChevronDown />
                    </span>
                  </div>

                  <div
                    className={`transition-all duration-900 ease-in-out overflow-hidden ${
                      openMenu.vendor ? "max-h-[100px]" : "max-h-0"
                    }`}
                  >
                    <ul className="space-y-3 px-2 text-sm mt-2">
                      <li>
                        <Link
                          to="/VendorList"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/VendorList")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/VendorList")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>All Vendor List</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                {/* Rent management */}
                <li className="text-primary font-medium rounded-sm">
                  <div
                    onClick={() => toggleMenu("rentVehicle")}
                    className="flex justify-between items-center py-3 px-2 cursor-pointer hover:bg-primary hover:text-white hover:rounded-sm duration-300"
                  >
                    <span className="flex items-center gap-2">
                      <FaTruck />
                      <span>Rent Vehicle</span>
                    </span>
                    <span
                      className={`transform transition-transform duration-900 ${
                        openMenu.rentVehicle ? "rotate-180" : ""
                      }`}
                    >
                      <FaChevronDown />
                    </span>
                  </div>

                  <div
                    className={`transition-all duration-900 ease-in-out overflow-hidden ${
                      openMenu.rentVehicle ? "max-h-[100px]" : "max-h-0"
                    }`}
                  >
                    <ul className="space-y-3 px-2 text-sm mt-2">
                      <li>
                        <Link
                          to="/RentList"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/RentList")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/RentList") ? "bg-white" : "bg-primary"
                            }`}
                          ></div>
                          <span>Rent Vehicle List</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                {/* HR management */}
                <li className="text-primary font-medium rounded-sm">
                  {/* HR main toggle */}
                  <div
                    onClick={() => toggleMenu("hrManagement")}
                    className="flex justify-between items-center py-3 px-2 cursor-pointer hover:bg-primary hover:text-white hover:rounded-sm duration-900"
                  >
                    <span className="flex items-center gap-2">
                      <FaUsersCog />
                      <span>HR</span>
                    </span>
                    <span
                      className={`transform transition-transform duration-900 ${
                        openMenu.hrManagement ? "rotate-180" : ""
                      }`}
                    >
                      <FaChevronDown />
                    </span>
                  </div>

                  {/* Animate HR submenu */}
                  <div
                    className={`transition-all duration-900 overflow-hidden px-1 ${
                      openMenu.hrManagement ? "max-h-[700px]" : "max-h-0"
                    }`}
                  >
                    <ul className="space-y-2 px-2 text-sm mt-2">
                      <li>
                        {/* HRM toggle inside HR */}
                        <div
                          onClick={() => toggleMenu("hrm")}
                          className="flex justify-between items-center p-2 cursor-pointer hover:text-primary rounded-sm"
                        >
                          <span className="flex gap-2 items-center">
                            <div
                              className={`w-[6px] h-[6px] rounded-full bg-primary ${
                                isActive("/hrm") ? "bg-white" : "bg-primary"
                              }`}
                            ></div>
                            <span>HRM</span>
                          </span>
                          <span
                            className={`transform transition-transform duration-900 ${
                              openMenu.hrm ? "rotate-180" : ""
                            }`}
                          >
                            <FaChevronDown />
                          </span>
                        </div>
                        {/* Animate HRM nested submenu */}
                        <div
                          className={`transition-all duration-900 overflow-hidden ${
                            openMenu.hrm ? "max-h-[500px]" : "max-h-0"
                          }`}
                        >
                          <ul className="pl-6 space-y-2 mt-1">
                            <li>
                              <Link
                                to="/HRM/add-designation"
                                className={`block p-2 rounded-sm ${
                                  isActive("/HRM/add-designation")
                                    ? "text-white bg-primary"
                                    : "text-gray-500 hover:text-primary"
                                }`}
                              >
                                Add Designation
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/HRM/manage-designation"
                                className={`block p-2 rounded-sm ${
                                  isActive("/HRM/manage-designation")
                                    ? "text-white bg-primary"
                                    : "text-gray-500 hover:text-primary"
                                }`}
                              >
                                Manage Designation
                              </Link>
                            </li>

                            <li>
                              <Link
                                to="/HR/HRM/employee-list"
                                className={`block p-2 rounded-sm ${
                                  isActive("/HRM/add-employee")
                                    ? "text-white bg-primary"
                                    : "text-gray-500 hover:text-primary"
                                }`}
                              >
                                Employee List
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Animate HR submenu attendance*/}
                  <div
                    className={`transition-all duration-300 overflow-hidden px-1 ${
                      openMenu.hrManagement ? "max-h-[200px]" : "max-h-0"
                    }`}
                  >
                    <ul className="space-y-2 px-2 text-sm mt-2">
                      <li>
                        {/* Attendance toggle inside HR */}
                        <div
                          onClick={() => toggleMenu("attendance")}
                          className="flex justify-between items-center p-2 cursor-pointer hover:text-primary rounded-sm"
                        >
                          <span className="flex gap-2 items-center">
                            <div
                              className={`w-[6px] h-[6px] rounded-full bg-primary ${
                                isActive("/attendance")
                                  ? "bg-white"
                                  : "bg-primary"
                              }`}
                            ></div>
                            <span>Attendance</span>
                          </span>
                          <span
                            className={`transform transition-transform duration-900 ${
                              openMenu.attendance ? "rotate-180" : ""
                            }`}
                          >
                            <FaChevronDown />
                          </span>
                        </div>
                        {/* Animate HRM nested submenu */}
                        <div
                          className={`transition-all duration-900 overflow-hidden px-1 ${
                            openMenu.attendance ? "max-h-[500px]" : "max-h-0"
                          }`}
                        >
                          <ul className="pl-6 space-y-2 mt-1">
                            <li>
                              <Link
                                to="/HR/Attendance/AttendanceList"
                                className={`block p-2 rounded-sm ${
                                  isActive("/HR/Attendance/AttendanceList")
                                    ? "text-white bg-primary"
                                    : "text-gray-500 hover:text-primary"
                                }`}
                              >
                                Attendance
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/HR/Attendance/AttendanceList"
                                className={`block p-2 rounded-sm ${
                                  isActive("/HRM/manage-attendance")
                                    ? "text-white bg-primary"
                                    : "text-gray-500 hover:text-primary"
                                }`}
                              >
                                Manage Attendance
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/HRM/attendance-report"
                                className={`block p-2 rounded-sm ${
                                  isActive("/HRM/attendance-report")
                                    ? "text-white bg-primary"
                                    : "text-gray-500 hover:text-primary"
                                }`}
                              >
                                Attendance Report
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                  {/* Animate HR submenu leave*/}
                  <div
                    className={`transition-all duration-300 overflow-hidden px-1 ${
                      openMenu.hrManagement ? "max-h-[200px]" : "max-h-0"
                    }`}
                  >
                    <ul className="space-y-2 px-2 text-sm mt-2">
                      <li>
                        {/* Attendance toggle inside HR */}
                        <div
                          onClick={() => toggleMenu("leave")}
                          className="p-2 cursor-pointer hover:text-primary rounded-sm"
                        >
                          <span className="">
                            <li>
                              <Link
                                to="/HR/HRM/Leave"
                                className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                                  isActive("/HR/HRM/Leave")
                                    ? "text-white bg-primary"
                                    : "text-gray-500 hover:text-primary"
                                }`}
                              >
                                <div
                                  className={`w-[6px] h-[6px] rounded-full bg-primary ${
                                    isActive("/HR/HRM/Leave")
                                      ? "bg-white"
                                      : "bg-primary"
                                  }`}
                                ></div>
                                <span>Leave Request</span>
                              </Link>
                            </li>
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  {/* Animate HR submenu Payroll*/}
                  <div
                    className={`transition-all duration-300 overflow-hidden px-1 ${
                      openMenu.hrManagement ? "max-h-[200px]" : "max-h-0"
                    }`}
                  >
                    <ul className="space-y-2 px-2 text-sm mt-2">
                      <li>
                        {/* Payroll toggle inside HR */}
                        <div
                          onClick={() => toggleMenu("payroll")}
                          className="flex justify-between items-center p-2 cursor-pointer hover:text-primary rounded-sm"
                        >
                          <span className="flex gap-2 items-center">
                            <div
                              className={`w-[6px] h-[6px] rounded-full bg-primary ${
                                isActive("/payroll") ? "bg-white" : "bg-primary"
                              }`}
                            ></div>
                            <span>Payroll</span>
                          </span>
                          <span
                            className={`transform transition-transform duration-900 ${
                              openMenu.payroll ? "rotate-180" : ""
                            }`}
                          >
                            <FaChevronDown />
                          </span>
                        </div>
                        {/* Animate HRM nested submenu */}
                        <div
                          className={`transition-all duration-900 overflow-hidden ${
                            openMenu.payroll ? "max-h-[500px]" : "max-h-0"
                          }`}
                        >
                          <ul className="pl-6 space-y-2 mt-1">
                            <li>
                              <Link
                                to="/HRM/Payroll/Advance-Salary"
                                className={`block p-2 rounded-sm ${
                                  isActive("/HRM/Payroll/Advance-Salary")
                                    ? "text-white bg-primary"
                                    : "text-gray-500 hover:text-primary"
                                }`}
                              >
                                Salary Advance
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/HRM/"
                                className={`block p-2 rounded-sm ${
                                  isActive("/HRM/advance-salary")
                                    ? "text-white bg-primary"
                                    : "text-gray-500 hover:text-primary"
                                }`}
                              >
                                Salary
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/HRM/attendance-report"
                                className={`block p-2 rounded-sm ${
                                  isActive("/HRM/attendance-report")
                                    ? "text-white bg-primary"
                                    : "text-gray-500 hover:text-primary"
                                }`}
                              >
                                Manage Employee salary
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>

                {/* Inventory management */}
                <li className="text-primary font-medium rounded-sm">
                  <div
                    onClick={() => toggleMenu("inventory")}
                    className="flex justify-between items-center py-3 px-2 cursor-pointer hover:bg-primary hover:text-white hover:rounded-sm duration-900"
                  >
                    <span className="flex items-center gap-2">
                      <MdShop />
                      <span>Inventory</span>
                    </span>
                    <span
                      className={`transform transition-transform duration-900 ${
                        openMenu.inventory ? "rotate-180" : ""
                      }`}
                    >
                      <FaChevronDown />
                    </span>
                  </div>
                  <div
                    className={`transition-all duration-900 ease-in-out overflow-hidden ${
                      openMenu.inventory ? "max-h-[200px]" : "max-h-0"
                    }`}
                  >
                    <ul className="space-y-3 px-2 text-sm mt-2">
                      <li>
                        <Link
                          to="/Inventory/Stockin"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Inventory/Stockin")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/Inventory/Stockin")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Stock in</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/Inventory/StockOut"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Inventory/StockOut")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/Inventory/StockOut")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Stock Out</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/Inventory/Vendor"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Inventory/Vendor")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/Inventory/Vendor")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Vendor</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                {/* Purchase Reports */}
                <li className="text-primary font-medium rounded-sm">
                  <div
                    onClick={() => toggleMenu("purchase")}
                    className="flex justify-between items-center py-3 px-2 cursor-pointer hover:bg-primary hover:text-white hover:rounded-sm duration-900 outline-none"
                  >
                    <span className="flex items-center gap-2">
                      <RiLuggageCartLine />
                      <span>Purchase</span>
                    </span>
                    <span
                      className={`transform transition-transform duration-900 ${
                        openMenu.purchase ? "rotate-180" : ""
                      }`}
                    >
                      <FaChevronDown />
                    </span>
                  </div>

                  {/* Dropdown container with smooth expand/collapse */}
                  <div
                    className={`transition-all duration-900 ease-in-out overflow-hidden ${
                      openMenu.purchase ? "max-h-[100px]" : "max-h-0"
                    }`}
                  >
                    <ul className="space-y-3 px-2 text-sm">
                      <li>
                        <Link
                          to="/Purchase/PurchaseList"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Purchase/PurchaseList")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full ${
                              isActive("/Purchase/PurchaseList")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Purchase List</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/Purchase/SupplierList"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Purchase/SupplierList")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full ${
                              isActive("/Purchase/SupplierList")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Supplier List</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                {/* Customer */}
                <li className="text-primary font-medium rounded-sm">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => toggleMenu("customer")}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      toggleMenu("customer")
                    }
                    className="flex justify-between items-center py-3 px-2 cursor-pointer hover:bg-primary hover:text-white hover:rounded-sm duration-300 outline-none"
                  >
                    <span className="flex items-center gap-2">
                      <PiUsersFour />
                      <span>Customer</span>
                    </span>
                    <span
                      className={`transform transition-transform duration-500 ${
                        openMenu.customer ? "rotate-180" : ""
                      }`}
                    >
                      <FaChevronDown />
                    </span>
                  </div>

                  {/* Dropdown container with smooth expand/collapse */}
                  <div
                    className={`transition-all duration-700 ease-in-out overflow-hidden ${
                      openMenu.customer ? "max-h-[500px]" : "max-h-0"
                    }`}
                  >
                    <ul className="space-y-3 px-2 text-sm">
                      <li>
                        <Link
                          to="/Customer"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Customer")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full ${
                              isActive("/Customer") ? "bg-white" : "bg-primary"
                            }`}
                          ></div>
                          <span>Customer List</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                {/* Business */}
                <li className="text-primary font-medium rounded-sm">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => toggleMenu("business")}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      toggleMenu("business")
                    }
                    className="flex justify-between items-center py-3 px-2 cursor-pointer hover:bg-primary hover:text-white hover:rounded-sm duration-300 outline-none"
                  >
                    <span className="flex items-center gap-2">
                      <FaBriefcase />
                      <span>Business Model</span>
                    </span>
                    <span
                      className={`transform transition-transform duration-500 ${
                        openMenu.business ? "rotate-180" : ""
                      }`}
                    >
                      <FaChevronDown />
                    </span>
                  </div>

                  {/* Dropdown container with smooth expand/collapse */}
                  <div
                    className={`transition-all duration-700 ease-in-out overflow-hidden ${
                      openMenu.business ? "max-h-[500px]" : "max-h-0"
                    }`}
                  >
                    <ul className="space-y-3 px-2 text-sm">
                      <li>
                        <Link
                          to="/DailyIncome"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/DailyIncome")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full ${
                              isActive("/DailyIncome")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Daily Income</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/DailyExpense"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/DailyExpense")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full ${
                              isActive("/DailyExpense")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Daily Expense</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                {/* Reports */}
                <li className="text-primary font-medium rounded-sm">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => toggleMenu("reports")}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      toggleMenu("reports")
                    }
                    className="flex justify-between items-center py-3 px-2 cursor-pointer hover:bg-primary hover:text-white hover:rounded-sm duration-300 outline-none"
                  >
                    <span className="flex items-center gap-2">
                      <FaNewspaper />
                      <span>Reports</span>
                    </span>
                    <span
                      className={`transform transition-transform duration-500 ${
                        openMenu.reports ? "rotate-180" : ""
                      }`}
                    >
                      <FaChevronDown />
                    </span>
                  </div>

                  {/* Dropdown container with smooth expand/collapse */}
                  <div
                    className={`transition-all duration-700 ease-in-out overflow-hidden ${
                      openMenu.reports ? "max-h-[500px]" : "max-h-0"
                    }`}
                  >
                    <ul className="space-y-3 px-2 text-sm">
                      <li>
                        <Link
                          to="/Reports/Employee-Report"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Reports/Employee-Report")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full ${
                              isActive("/Reports/Employee-Report")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Employee Report</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/Reports/Driver-Report"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Reports/Driver-Report")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full ${
                              isActive("/Reports/Driver-Report")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Driver Report</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/Reports/Fuel-Report"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Reports/Fuel-Report")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full ${
                              isActive("/Reports/Fuel-Report")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Fuel Report</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/Reports/Purchase-Report"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Reports/Purchase-Report")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full ${
                              isActive("/Reports/Purchase-Report")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Purchase Report</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/Reports/Inventory-Report"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Reports/Inventory-Report")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full ${
                              isActive("/Reports/Inventory-Report")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Inventory Report</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/Reports/Trip-Report"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Reports/Trip-Report")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full ${
                              isActive("/Reports/Trip-Report")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Trip Report</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                {/* User Control */}
                <li className="text-primary font-medium rounded-sm mb-10">
                  <div
                    onClick={() => toggleMenu("user")}
                    className="flex justify-between items-center py-3 px-2 cursor-pointer hover:bg-primary hover:text-white hover:rounded-sm duration-300"
                  >
                    <span className="flex items-center gap-2">
                      <FaUser />
                      <span>Users Control</span>
                    </span>
                    <span
                      className={`transform transition-transform duration-900 ${
                        openMenu.user ? "rotate-180" : ""
                      }`}
                    >
                      <FaChevronDown />
                    </span>
                  </div>
                  <div
                    className={`transition-all duration-900 ease-in-out overflow-hidden ${
                      openMenu.user ? "max-h-[100px]" : "max-h-0"
                    }`}
                  >
                    <ul className="space-y-3 px-2 text-sm mt-2">
                      <li>
                        <Link
                          to="/AllUsers"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/AllUsers")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/AllUsers") ? "bg-white" : "bg-primary"
                            }`}
                          ></div>
                          <span>All Users</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </>
            ) : (
              <>
                {/* private route */}
                {/* Fleet Management */}
                <li className="text-primary font-medium rounded-sm">
                  <div
                    onClick={() => toggleMenu("fleet")}
                    className="flex justify-between items-center py-3 px-2 cursor-pointer hover:bg-primary hover:text-white hover:rounded-sm duration-900"
                  >
                    <span className="flex items-center gap-2">
                      <FaCarRear />
                      <span>ফ্লীট ম্যানেজমেন্ট</span>
                    </span>
                    {openMenu.fleet ? <FaChevronUp /> : <FaChevronDown />}
                  </div>

                  {openMenu.fleet && (
                    <ul className="space-y-0 px-2 text-sm mt-2">
                      <li>
                        <Link
                          to="/CarList"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/CarList")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/CarList") ? "bg-white" : "bg-primary"
                            }`}
                          ></div>
                          <span>গাড়ি তালিকা</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/DriverList"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/DriverList")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/DriverList")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>ড্রাইভার তালিকা</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/TripList"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/TripList")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/TripList") ? "bg-white" : "bg-primary"
                            }`}
                          ></div>
                          <span>ট্রিপ হিসাব</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/Fuel"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Fuel")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/Fuel") ? "bg-white" : "bg-primary"
                            }`}
                          ></div>
                          <span>ফুয়েল হিসাব</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/Parts"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Parts")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/Parts") ? "bg-white" : "bg-primary"
                            }`}
                          ></div>
                          <span>পার্টস এন্ড স্পায়ারস</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/Maintenance"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Maintenance")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/Maintenance")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>মেইনটেনেন্স</span>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>

                {/* Business Reports */}
                <li className="text-primary font-medium rounded-sm">
                  <div
                    onClick={() => toggleMenu("business")}
                    className="flex justify-between items-center py-3 px-2 cursor-pointer hover:bg-primary hover:text-white hover:rounded-sm duration-300"
                  >
                    <span className="flex items-center gap-2">
                      <FaBriefcase />
                      <span>বিজনেসের বিবরণ</span>
                    </span>
                    {openMenu.business ? <FaChevronUp /> : <FaChevronDown />}
                  </div>

                  {openMenu.business && (
                    <ul className="space-y-3 px-2 text-sm mt-2">
                      <li>
                        <Link
                          to="/DailyExpense"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/DailyExpense")
                              ? "text-white bg-primary"
                              : "text-gray-500 hover:text-primary"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/DailyExpense")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>দৈনিক ব্যয়</span>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
