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
// import avatar from "../assets/ms.png";
import { Link, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { FaUsers } from "react-icons/fa";
import { PiUsersFour } from "react-icons/pi";
import { RiLuggageCartLine } from "react-icons/ri";
import { HiCurrencyBangladeshi } from "react-icons/hi2";

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
        <div className="py-[6px] flex justify-center border-b border-gray-300">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-28" />
          </Link>
        </div>

        {/* Admin Info */}
        {/* <div className="p-3 border-b border-gray-300">
          <div className="bg-white p-2 rounded-md flex gap-2 items-center">
            <img
              src={avatar}
              alt="Admin Avatar"
              className="w-8 rounded-2xl drop-shadow"
            />
            <h3 className="text-gray-700 font-semibold">Admin</h3>
          </div>
        </div> */}

        {/* Navigation */}
        <div className="mt-3 px-2">
          <ul className="space-y-3">
            {/* Dashboard */}
            <li
              className={`py-3 px-2 rounded-sm cursor-pointer ${
                isActive("") ? "bg-primary text-white" : "text-white bg-primary"
              }`}
            >
              <Link to="" className="flex items-center gap-2 font-semibold">
                <FaBars />
                <span className="ps-2">Dashboard</span>
              </Link>
            </li>

            {isAdmin ? (
              <>
                {/* Fleet Management */}
                <li className="text-gray-700 font-medium rounded-sm">
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
                              : "text-gray-700 hover:text-gray-700"
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
                          to="/TripList"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/TripList")
                              ? "text-white bg-primary"
                              : "text-gray-700 hover:text-gray-700"
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
                      {/* <li>
                        <Link
                          to="/Maintenance"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Maintenance")
                              ? "text-white bg-primary"
                              : "text-gray-700 hover:text-gray-700"
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
                      </li> */}
                    </ul>
                  </div>
                </li>
                {/* Vendor management */}
                <li className="text-gray-700 font-medium rounded-sm">
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
                              : "text-gray-700 hover:text-gray-700"
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
                <li className="text-gray-700 font-medium rounded-sm">
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
                              : "text-gray-700 hover:text-gray-700"
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
                <li className="text-gray-700 font-medium rounded-sm">
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
                          className="flex justify-between items-center p-2 cursor-pointer hover:text-gray-700 rounded-sm"
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
                                to="/HR/HRM/employee-list"
                                className={`flex gap-2 items-center block p-2 rounded-sm ${
                                  isActive("/HR/HRM/employee-list")
                                    ? "text-white bg-primary"
                                    : "text-gray-700 hover:text-gray-700"
                                }`}
                              >
                                <div
                                  className={`w-[6px] h-[6px] rounded-full bg-primary ${
                                    isActive("/HR/HRM/employee-list")
                                      ? "bg-white"
                                      : "bg-primary"
                                  }`}
                                ></div>
                                Employee List
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/DriverList"
                                className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                                  isActive("/DriverList")
                                    ? "text-white bg-primary"
                                    : "text-gray-700 hover:text-gray-700"
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
                                to="/HelperList"
                                className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                                  isActive("/HelperList")
                                    ? "text-white bg-primary"
                                    : "text-gray-700 hover:text-gray-700"
                                }`}
                              >
                                <div
                                  className={`w-[6px] h-[6px] rounded-full bg-primary ${
                                    isActive("/HelperList")
                                      ? "bg-white"
                                      : "bg-primary"
                                  }`}
                                ></div>
                                <span>Helper List</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/HR/HRM/Office"
                                className={`flex gap-2 items-center p-2 rounded-sm ${
                                  isActive("/HR/HRM/Office")
                                    ? "text-white bg-primary"
                                    : "text-gray-700 hover:text-gray-700"
                                }`}
                              >
                                <div
                                  className={`w-[6px] h-[6px] rounded-full bg-primary ${
                                    isActive("/HR/HRM/Office")
                                      ? "bg-white"
                                      : "bg-primary"
                                  }`}
                                ></div>
                                Office
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
                          className="flex justify-between items-center p-2 cursor-pointer hover:text-gray-700 rounded-sm"
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
                                    : "text-gray-700 hover:text-gray-700"
                                }`}
                              >
                                <span className="flex gap-2 items-center">
                                  <div
                                    className={`w-[6px] h-[6px] rounded-full bg-primary ${
                                      isActive("/HR/Attendance/AttendanceList")
                                        ? "bg-white"
                                        : "bg-primary"
                                    }`}
                                  ></div>
                                  <span>Attendance</span>
                                </span>
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
                          className="p-2 cursor-pointer hover:text-gray-700 rounded-sm"
                        >
                          <li>
                            <Link
                              to="/HR/HRM/Leave"
                              className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                                isActive("/HR/HRM/Leave")
                                  ? "text-white bg-primary"
                                  : "text-gray-700 hover:text-gray-700"
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
                          {/* <li>
                            <Link
                              to="/HR/HRM/MonthAttendance"
                              className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                                isActive("/HR/HRM/MonthAttendance")
                                  ? "text-white bg-primary"
                                  : "text-gray-700 hover:text-gray-700"
                              }`}
                            >
                              <div
                                className={`w-[6px] h-[6px] rounded-full bg-primary ${
                                  isActive("/HR/HRM/MonthAttendance")
                                    ? "bg-white"
                                    : "bg-primary"
                                }`}
                              ></div>
                              <span>Month Attendance</span>
                            </Link>
                          </li> */}
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
                          className="flex justify-between items-center p-2 cursor-pointer hover:text-gray-700 rounded-sm"
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
                                className={`flex items-center gap-2 p-2 rounded-sm ${
                                  isActive("/HRM/Payroll/Advance-Salary")
                                    ? "text-white bg-primary"
                                    : "text-gray-700 hover:text-gray-700"
                                }`}
                              >
                                <div
                                  className={`w-[6px] h-[6px] rounded-full bg-primary ${
                                    isActive("/HRM/Payroll/Advance-Salary")
                                      ? "bg-white"
                                      : "bg-primary"
                                  }`}
                                ></div>
                                Salary Advance
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/HRM/attendance-report"
                                className={`block p-2 rounded-sm ${
                                  isActive("/HRM/attendance-report")
                                    ? "text-white bg-primary"
                                    : "text-gray-700 hover:text-gray-700"
                                }`}
                              >
                                Manage Employee salary
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/HRM/payroll/generate-salary"
                                className={`block p-2 rounded-sm ${
                                  isActive("/HRM/payroll/generate-salary")
                                    ? "text-white bg-primary"
                                    : "text-gray-700 hover:text-gray-700"
                                }`}
                              >
                                Generate Salary
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>

                {/* Inventory management */}
                <li className="text-gray-700 font-medium rounded-sm">
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
                      {/* <li>
                        <Link
                          to="/Inventory/Stockin"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Inventory/Stockin")
                              ? "text-white bg-primary"
                              : "text-gray-700 hover:text-gray-700"
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
                      </li> */}
                      <li>
                        <Link
                          to="/Inventory/StockOut"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Inventory/StockOut")
                              ? "text-white bg-primary"
                              : "text-gray-700 hover:text-gray-700"
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
                      {/* <li>
                        <Link
                          to="/Inventory/Inventory-supplier"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Inventory/Inventory-supplier")
                              ? "text-white bg-primary"
                              : "text-gray-700 hover:text-gray-700"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/Inventory/Inventory-supplier")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Inventory Supplier</span>
                        </Link>
                      </li> */}
                    </ul>
                  </div>
                </li>
                {/* Purchase */}
                <li className="text-gray-700 font-medium rounded-sm">
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
                    <ul className="space-y-3 px-2 text-sm mt-2">
                      <li>
                        <Link
                          to="/Purchase/PurchaseList"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Purchase/PurchaseList")
                              ? "text-white bg-primary"
                              : "text-gray-700 hover:text-gray-700"
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
                              : "text-gray-700 hover:text-gray-700"
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
                <li className="text-gray-700 font-medium rounded-sm">
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
                    <ul className="space-y-3 px-2 text-sm mt-2">
                      <li>
                        <Link
                          to="/Customer"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Customer")
                              ? "text-white bg-primary"
                              : "text-gray-700 hover:text-gray-700"
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
                <li className="text-gray-700 font-medium rounded-sm">
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
                    <ul className="space-y-3 px-2 text-sm mt-2">
                      <li>
                        <Link
                          to="/DailyIncome"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/DailyIncome")
                              ? "text-white bg-primary"
                              : "text-gray-700 hover:text-gray-700"
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
                              : "text-gray-700 hover:text-gray-700"
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
                <li className="text-gray-700 font-medium rounded-sm">
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
                    <ul className="mt-2 space-y-3 px-2 text-sm">
                      <li>
                        <Link
                          to="/Reports/Employee-Report"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Reports/Employee-Report")
                              ? "text-white bg-primary"
                              : "text-gray-700 hover:text-gray-700"
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
                              : "text-gray-700 hover:text-gray-700"
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
                              : "text-gray-700 hover:text-gray-700"
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
                              : "text-gray-700 hover:text-gray-700"
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
                              : "text-gray-700 hover:text-gray-700"
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
                              : "text-gray-700 hover:text-gray-700"
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
                {/* Accounts */}
                <li className="text-gray-700 font-medium rounded-sm">
                  <div
                    onClick={() => toggleMenu("accounts")}
                    className="flex justify-between items-center py-3 px-2 cursor-pointer hover:bg-primary hover:text-white hover:rounded-sm duration-300"
                  >
                    <span className="flex items-center gap-2">
                      <FaBriefcase />
                      <span>Accounts</span>
                    </span>
                    <span
                      className={`transform transition-transform duration-900 ${
                        openMenu.accounts ? "rotate-180" : ""
                      }`}
                    >
                      <FaChevronDown />
                    </span>
                  </div>
                  <div
                    className={`transition-all duration-900 ease-in-out overflow-hidden ${
                      openMenu.accounts ? "max-h-[500px]" : "max-h-0"
                    }`}
                  >
                    {" "}
                    <ul className="space-y-3 px-2 text-sm mt-2">
                      <li>
                        <Link
                          to="/account/CashDispatch"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/account/CashDispatch")
                              ? "text-white bg-primary"
                              : "text-gray-700 hover:text-gray-700"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/account/CashDispatch")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Fund Transfer</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/account/PaymentList"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/account/PaymentList")
                              ? "text-white bg-primary"
                              : "text-gray-700 hover:text-gray-700"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/account/PaymentList")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Payment List</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/account/PaymentReceive"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/account/PaymentReceive")
                              ? "text-white bg-primary"
                              : "text-gray-700 hover:text-gray-700"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/account/PaymentReceive")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Payment Receive</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/account/SupplierLedger"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/account/SupplierLedger")
                              ? "text-white bg-primary"
                              : "text-gray-700 hover:text-gray-700"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/account/SupplierLedger")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Supplier Ledger</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/account/DriverLedger"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/account/DriverLedger")
                              ? "text-white bg-primary"
                              : "text-gray-700 hover:text-gray-700"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/account/DriverLedger")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Driver Ledger</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/account/VendorLedger"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/account/VendorLedger")
                              ? "text-white bg-primary"
                              : "text-gray-700 hover:text-gray-700"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/account/VendorLedger")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Vendor Ledger</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/account/CustomerLedger"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/account/CustomerLedger")
                              ? "text-white bg-primary"
                              : "text-gray-700 hover:text-gray-700"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/account/CustomerLedger")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Customer Ledger</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/account/OfficeLedger"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/account/OfficeLedger")
                              ? "text-white bg-primary"
                              : "text-gray-700 hover:text-gray-700"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/account/OfficeLedger")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Office Ledger</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                {/* Billing Control */}
                <li className="text-gray-700 font-medium rounded-sm">
                  <div
                    onClick={() => toggleMenu("billing")}
                    className="flex justify-between items-center py-3 px-2 cursor-pointer hover:bg-primary hover:text-white hover:rounded-sm duration-300"
                  >
                    <span className="flex items-center gap-2">
                      <HiCurrencyBangladeshi className="text-xl" />
                      <span>Billing</span>
                    </span>
                    <span
                      className={`transform transition-transform duration-900 ${
                        openMenu.billing ? "rotate-180" : ""
                      }`}
                    >
                      <FaChevronDown />
                    </span>
                  </div>
                  <div
                    className={`transition-all duration-900 ease-in-out overflow-hidden ${
                      openMenu.billing ? "max-h-[300px]" : "max-h-0"
                    }`}
                  >
                    <ul className="space-y-3 px-2 text-sm mt-2">
                      <li>
                        <Link
                          to="/billing/Yamaha"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/billing/Yamaha")
                              ? "text-white bg-primary"
                              : "text-gray-700 hover:text-gray-700"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/billing/Yamaha")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Yamaha</span>
                        </Link>
                      </li>
                      <li>
                        {/* hatim toggle inside billing */}
                        <div
                          onClick={() => toggleMenu("hatimMenu")}
                          className="flex justify-between items-center p-2 cursor-pointer hover:text-gray-700 rounded-sm"
                        >
                          <span className="flex gap-2 items-center">
                            <div
                              className={`w-[6px] h-[6px] rounded-full bg-primary ${
                                isActive("/hatimMenu")
                                  ? "bg-white"
                                  : "bg-primary"
                              }`}
                            ></div>
                            <span>Hatim</span>
                          </span>
                          <span
                            className={`transform transition-transform duration-900 ${
                              openMenu.hatimMenu ? "rotate-180" : ""
                            }`}
                          >
                            <FaChevronDown />
                          </span>
                        </div>
                        {/* hatim submenu */}
                        <div
                          className={`transition-all duration-900 overflow-hidden ${
                            openMenu.hatimMenu ? "max-h-[500px]" : "max-h-0"
                          }`}
                        >
                          <ul className="pl-6 space-y-2 mt-1">
                            <li>
                              <Link
                                to="/billing/Hatim"
                                className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                                  isActive("/billing/Hatim")
                                    ? "text-white bg-primary"
                                    : "text-gray-700 hover:text-gray-700"
                                }`}
                              >
                                <div
                                  className={`w-[6px] h-[6px] rounded-full bg-primary ${
                                    isActive("/billing/Hatim")
                                      ? "bg-white"
                                      : "bg-primary"
                                  }`}
                                ></div>
                                <span>Hatim Rupgonj</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/billing/HatimPubail"
                                className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                                  isActive("/billing/HatimPubail")
                                    ? "text-white bg-primary"
                                    : "text-gray-700 hover:text-gray-700"
                                }`}
                              >
                                <div
                                  className={`w-[6px] h-[6px] rounded-full bg-primary ${
                                    isActive("/billing/HatimPubail")
                                      ? "bg-white"
                                      : "bg-primary"
                                  }`}
                                ></div>
                                <span>Hatim Pubail</span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <Link
                          to="/billing/Suzuki"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/billing/Suzuki")
                              ? "text-white bg-primary"
                              : "text-gray-700 hover:text-gray-700"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/billing/Suzuki")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Suzuki</span>
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          to="/billing/Sonalika"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/billing/Sonalika")
                              ? "text-white bg-primary"
                              : "text-gray-700 hover:text-gray-700"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/billing/Sonalika")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Sonalika</span>
                        </Link>
                      </li> */}
                      <li>
                        <Link
                          to="/billing/Honda"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/billing/Honda")
                              ? "text-white bg-primary"
                              : "text-gray-700 hover:text-gray-700"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/billing/Honda")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Honda</span>
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          to="/billing/Meghdona"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/billing/Meghdona")
                              ? "text-white bg-primary"
                              : "text-gray-700 hover:text-gray-700"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/billing/Meghdona")
                                ? "bg-white"
                                : "bg-primary"
                            }`}
                          ></div>
                          <span>Meghdona</span>
                        </Link>
                      </li> */}
                    </ul>
                  </div>
                </li>
                {/* User Control */}
                {/* <li className="text-gray-700 font-medium rounded-sm mb-10">
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
                              : "text-gray-700 hover:text-gray-700"
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
                </li> */}
              </>
            ) : (
              <>
                {/* private route */}
                {/* Fleet Management */}
                <li className="text-gray-700 font-medium rounded-sm">
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
                              : "text-gray-700 hover:text-gray-700"
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
                              : "text-gray-700 hover:text-gray-700"
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
                              : "text-gray-700 hover:text-gray-700"
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
                      {/* <li>
                        <Link
                          to="/Fuel"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Fuel")
                              ? "text-white bg-primary"
                              : "text-gray-700 hover:text-gray-700"
                          }`}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full bg-primary ${
                              isActive("/Fuel") ? "bg-white" : "bg-primary"
                            }`}
                          ></div>
                          <span>ফুয়েল হিসাব</span>
                        </Link>
                      </li> */}
                      <li>
                        <Link
                          to="/Parts"
                          className={`flex gap-2 items-center p-2 rounded-sm font-medium ${
                            isActive("/Parts")
                              ? "text-white bg-primary"
                              : "text-gray-700 hover:text-gray-700"
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
                              : "text-gray-700 hover:text-gray-700"
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
                <li className="text-gray-700 font-medium rounded-sm">
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
                              : "text-gray-700 hover:text-gray-700"
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
