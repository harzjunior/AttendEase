import { useForm } from "react-hook-form";
import GlobalApi from "../_services/GlobalApi";
import { useEffect, useState } from "react";

// Component for selecting a grade, used in the Attendance component
function GradeSelection({ selectedGrade }) {
  const [grades, setGrades] = useState([]);

  // Fetch grades data when the component mounts
  useEffect(() => {
    getAllData();
  }, []);

  // Fetch all grades from the API
  const getAllData = async () => {
    try {
      const gradeResp = await GlobalApi.getAllGrades(); // Call API to get grades
      setGrades(gradeResp.data); // Set the fetched grades to state
    } catch (error) {
      console.error(error); // Log any errors
    }
  };

  return (
    <div>
      <select
        className="p-2 border rounded-lg"
        onChange={(e) => selectedGrade(e.target.value)} // Pass the selected grade to the parent component
      >
        {grades.map((item) => (
          <option key={item.id} value={item.grade}>
            {item.grade} {/* Display each grade */}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GradeSelection;
























"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import { addMonths } from "date-fns";
import moment from "moment/moment";
import { Calendar } from "@/components/ui/calendar";

// Component for selecting a month, used in the Attendance component
function MonthSelection({ selectedMonth }) {
  const today = new Date();
  const nextMonth = addMonths(today, 0); // Get the current date and month
  const [month, setMonth] = useState(nextMonth); // Initialize state with the current month

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 text-slate-500 "
          >
            <CalendarDays className="size-5" />
            {moment(month).format("MMM yyyy")}{" "}
            {/* Display the selected month */}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            month={month}
            onMonthChange={(value) => {
              selectedMonth(value); // Pass the selected month to the parent component
              setMonth(value); // Update the state with the selected month
            }}
            className="flex justify-center flex-1"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default MonthSelection;






















const { default: axios } = require("axios");

// ==========================================Grades===========================================

// Fetches all grades from the database
const getAllGrades = () => axios.get("/api/grade");

// ==========================================Students=========================================

// Creates a new student record, used in the submit form
const createNewStudent = (data) => axios.post("/api/student", data);

// Fetches all student records from the database
const getAllStudents = () => axios.get("/api/student");

// Deletes a student record from the database by ID
const deleteStudentRecord = (id) => axios.delete(`/api/student?id=${id}`);

// ==========================================Attendance=======================================

// Fetches all attendance records from the database for a specific grade and month
const getAttendanceList = (grade, month) => {
  return axios.get(`/api/attendance?grade=${grade}&month=${month}`);
};

// Creates a new attendance record, used in the submit form
const createAttendance = (data) => axios.post("/api/attendance", data);

// Deletes an attendance record from the database by studentId, day, and date
const deleteAttendance = (studentId, day, date) => {
  return axios.delete(
    `/api/attendance?studentId=${studentId}&day=${day}&date=${date}`
  );
};

// Exporting all functions for use in other components
export default {
  getAllGrades,
  createNewStudent,
  getAllStudents,
  deleteStudentRecord,
  getAttendanceList,
  createAttendance,
  deleteAttendance,
};




















const { NextResponse } = require("next/server");
import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { and, eq, isNull, or } from "drizzle-orm";

// API endpoint to fetch attendance data
export async function GET(req) {
  // Extract query parameters from the request URL
  const { searchParams } = new URL(req.url);
  const grade = searchParams.get("grade");
  const month = searchParams.get("month");

  try {
    // Query the database to fetch attendance data
    const result = await db
      .select({
        fullName: STUDENTS.fullName,
        present: ATTENDANCE.present,
        day: ATTENDANCE.day,
        date: ATTENDANCE.date,
        grade: STUDENTS.grade,
        studentId: STUDENTS.id,
        attendanceId: ATTENDANCE.id,
      })
      .from(STUDENTS)
      .leftJoin(ATTENDANCE, eq(STUDENTS.id, ATTENDANCE.studentId))
      .where(eq(STUDENTS.grade, grade))
      .where(or(eq(ATTENDANCE.date, month), isNull(eq(ATTENDANCE.date)))); // Include students without attendance records for the specified month

    // Return the fetched attendance data as a JSON response
    return NextResponse.json({ success: true, result });
  } catch (error) {
    // Handle errors if fetching attendance data fails
    console.error("Query Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch attendance" },
      { status: 500 }
    );
  }
}

// API endpoint to insert new attendance data
export async function POST(req) {
  // Extract data from the request body
  const data = await req.json();

  try {
    // Insert the new attendance data into the database
    const result = await db.insert(ATTENDANCE).values({
      studentId: data.studentId,
      present: data.present,
      day: data.day,
      date: data.date,
    });

    // Return the result of the insertion as a JSON response
    return NextResponse.json(result);
  } catch (error) {
    // Handle errors if inserting attendance data fails
    console.error("Insert Error:", error);
    return NextResponse.json(
      { error: "Failed to insert attendance data" },
      { status: 500 }
    );
  }
}

// API endpoint to delete attendance data
export async function DELETE(req) {
  // Extract query parameters from the request URL
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId");
  const day = searchParams.get("day");
  const date = searchParams.get("date");

  try {
    // Delete attendance data based on provided parameters
    const result = await db
      .delete(ATTENDANCE)
      .where(
        and(
          eq(ATTENDANCE.studentId, studentId),
          eq(ATTENDANCE.day, day),
          eq(ATTENDANCE.date, date)
        )
      );

    // Return the result of the deletion as a JSON response
    return NextResponse.json({ success: true, result });
  } catch (error) {
    // Handle errors if deleting attendance data fails
    console.error("Delete Error:", error);
    return NextResponse.json(
      { error: "Failed to delete attendance record" },
      { status: 500 }
    );
  }
}










import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

// Handle authentication for GET requests
export const GET = handleAuth();




















const { NextResponse } = require("next/server");
import { db } from "@/utils";
import { GRADES } from "@/utils/schema";

// API endpoint to fetch grades data, to be used in GlobalApi.js
export async function GET(req) {
  try {
    // Query the database to fetch all grades
    const result = await db.select().from(GRADES);

    // Return the fetched grades data as JSON response
    return NextResponse.json(result);
  } catch (error) {
    // Handle errors if fetching grades data fails
    console.error("Query Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch grades" },
      { status: 500 }
    );
  }
}




























const { NextResponse } = require("next/server");
import { db } from "@/utils";
import { STUDENTS } from "@/utils/schema";
import { eq } from "drizzle-orm";

// API endpoints to be used in GlobalApi.js

// POST endpoint to insert a new student into the database
export async function POST(req, res) {
  try {
    // Parse the request body to get student data
    const data = await req.json();

    // Insert the new student data into the STUDENTS table
    const result = await db.insert(STUDENTS).values({
      fullName: data?.fullName,
      grade: data?.grade,
      phone: data?.phone,
      address: data?.address,
    });

    // Return the result of the insertion as JSON response
    return NextResponse.json(result);
  } catch (error) {
    // Handle errors if inserting student data fails
    console.error("Insert Error:", error);
    return NextResponse.json(
      { error: "Failed to insert student data" },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch all students from the database
export async function GET(req) {
  try {
    // Query the database to fetch all students
    const result = await db.select().from(STUDENTS);

    // Return the fetched student data as JSON response
    return NextResponse.json(result);
  } catch (error) {
    // Handle errors if fetching student data fails
    console.error("Query Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch student data" },
      { status: 500 }
    );
  }
}

// DELETE endpoint to remove a student from the database by ID
export async function DELETE(req) {
  try {
    // Extract the student ID from the request URL query parameters
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("id"); // The student ID to be deleted

    // Delete the student from the STUDENTS table where the ID matches the provided ID
    const result = await db
      .delete(STUDENTS)
      .where(eq(STUDENTS.id, parseInt(_id))); // Parse the ID to an integer

    // Return the result of the deletion as JSON response
    return NextResponse.json({ success: true, result });
  } catch (error) {
    // Handle errors if deleting student data fails
    console.error("Delete Error:", error);
    return NextResponse.json(
      { error: "Failed to delete student record" },
      { status: 500 }
    );
  }
}


























import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return NextResponse.redirect(
      new URL("/api/auth/login?post_login_redirect_url=/dashboard", request.url)
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  paths: ["/about/:path*", "/dashboard/:path*"], //fixed the property name to 'paths'
};























"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";

/**
 * Avatar component displays the user's avatar and optionally their name and email.
 *
 * @param {Object} props - Component props.
 * @param {string} props.avClass - CSS class for the avatar container.
 * @param {boolean} props.bool - Flag to determine whether to display user details.
 */
function Avatar({ avClass, bool }) {
  const { user } = useKindeBrowserClient();

  return (
    <div className={`${avClass}`}>
      {/* Display user picture if available, otherwise show a default image */}
      {user?.picture ? (
        <Image
          src={user?.picture}
          width={35}
          height={35}
          alt="user"
          className="rounded-full cursor-pointer"
        />
      ) : (
        <Image
          src="/images/Kyrian.png"
          width={35}
          height={35}
          alt="user"
          className="rounded-full cursor-pointer"
        />
      )}

      {/* Conditionally display user details if the 'bool' prop is true */}
      <div>
        {bool && (
          <>
            {user ? (
              <>
                <h2 className="text-sm font-bold">
                  {user?.given_name} {user?.family_name}
                </h2>
                <h2 className="text-xs text-slate-400">{user?.email}</h2>
              </>
            ) : (
              <>
                <h2 className="text-sm font-bold">Jon Doe</h2>
                <h2 className="text-xs text-slate-400">jondoe@gmail.com</h2>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Avatar;
























import Avatar from "./common/Avatar";

/**
 * Header component renders the header section with an avatar.
 *
 * @returns {JSX.Element} The header element.
 */
function Header() {
  return (
    <div className="flex border p-4 shadow-sm justify-between">
      {/* Left side of the header - can be used for future content */}
      <div></div>

      {/* Right side of the header containing the Avatar component */}
      <div>
        <Avatar bool={false} avClass="" />
      </div>
    </div>
  );
}

export default Header;






















"use client";

import { GraduationCap, Hand, LayersIcon, Settings } from "lucide-react";
import Image from "next/image";
import Avatar from "./common/Avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * SideNav component renders the sidebar navigation menu.
 *
 * @returns {JSX.Element} The sidebar navigation element.
 */
function SideNav() {
  // List of menu items with their names, icons, and paths
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayersIcon,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Students",
      icon: GraduationCap,
      path: "/dashboard/students",
    },
    {
      id: 3,
      name: "Attendance",
      icon: Hand,
      path: "/dashboard/attendance",
    },
    {
      id: 4,
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  // Get the current pathname for highlighting active menu item
  const path = usePathname();

  return (
    <div className="border shadow-md h-screen p-5">
      {/* Logo */}
      <Image src={"/logo.svg"} height={180} width={50} alt="logo" priority />
      <hr className="my-5"></hr>

      {/* Render menu items */}
      {menuList.map((menu, index) => (
        <Link key={index} href={menu.path}>
          <h2
            className={`${
              path == menu.path && "text-slate-500 bg-primary"
            } flex items-center text-center gap-3 p-4 my-1 text-slate-500 hover:bg-primary cursor-pointer rounded-lg`}
          >
            <menu.icon />
            {menu.name}
          </h2>
        </Link>
      ))}

      {/* User avatar */}
      <Avatar
        bool={true} // Display user details
        avClass="flex gap-2 items-center bottom-5 fixed p-2" // Additional CSS classes for positioning
      />
    </div>
  );
}

export default SideNav;
































"use client";

import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import moment from "moment/moment";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";

/**
 * AttendanceGrid component renders the grid for displaying attendance data.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.attendanceListData - Attendance data to display.
 * @param {string} props.selectMonth - Selected month for attendance.
 * @returns {JSX.Element} The attendance grid component.
 */
function AttendanceGrid({ attendanceListData, selectMonth }) {
  // Row ag-grid Data: The data to be displayed.
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "studentId", width: 105 },
    { field: "fullName" },
  ]);

  // Calculate the number of days in the selected month
  const daysOfTheMonth = (year, month) => new Date(year, month, 0).getDate();
  const numberOfDays = daysOfTheMonth(
    moment(selectMonth).format("yyyy"),
    moment(selectMonth).format("MM")
  );
  const daysInArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

  // Refresh the page when there is attendance data
  useEffect(() => {
    if (attendanceListData?.result) {
      const uniqueRecords = getUniqueRecords(attendanceListData.result);
      setRowData(uniqueRecords);

      const newColDefs = [
        { field: "studentId", width: 105 },
        { field: "fullName" },
        ...daysInArray.map((date) => ({
          field: date.toString(),
          width: 50,
          editable: true,
        })),
      ];

      setColDefs(newColDefs);

      uniqueRecords.forEach((obj) => {
        daysInArray.forEach((date) => {
          obj[date] = isPresent(obj.studentId, date);
        });
      });
    }
  }, [attendanceListData]);

  // Get unique user records
  const getUniqueRecords = (attendanceListData) => {
    const uniqueRecord = [];
    const existingUser = new Set();

    attendanceListData.forEach((attendance) => {
      if (!existingUser.has(attendance.studentId)) {
        existingUser.add(attendance.studentId);
        uniqueRecord.push(attendance);
      }
    });

    return uniqueRecord;
  };

  // Check if the student is present on a particular day
  const isPresent = (studentId, day) => {
    if (attendanceListData?.result) {
      const result = attendanceListData.result.find(
        (item) => item.day == day && item.studentId == studentId
      );
      return result ? true : false;
    }
  };

  // Handle Attendance Updates
  const handleCellValueChanged = async (event) => {
    const { data, colDef, newValue } = event;
    const day = colDef.field;
    const studentId = data.studentId;
    const present = newValue;

    try {
      const date = moment(selectMonth).format("MM/YYYY");

      if (present) {
        GlobalApi.createAttendance({
          studentId,
          day,
          date,
          present,
        }).then((resp) => {
          toast.success(`Student number: ${studentId} Present`);
        });
      } else {
        GlobalApi.deleteAttendance(studentId, day, date).then((resp) => {
          toast.error(`Marked student number: ${studentId} as absent`);
        });
      }
    } catch (error) {
      toast.error("Failed to update attendance record");
      console.error("Failed to update attendance record", error);
    }
  };

  return (
    <div
      className="ag-theme-quartz" // applying the grid theme
      style={{ height: 500 }} // the grid will fill the size of the parent container
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        onCellValueChanged={handleCellValueChanged}
      />
    </div>
  );
}

export default AttendanceGrid;































"use client";

import GradeSelection from "@/app/_components/GradeSelection";
import MonthSelection from "@/app/_components/MonthSelection";
import GlobalApi from "@/app/_services/GlobalApi";
import { Button } from "@/components/ui/button";
import moment from "moment/moment";
import { useState } from "react";
import AttendanceGrid from "./_components/AttendanceGrid";
import { LoaderIcon } from "lucide-react";

/**
 * Attendance component manages the attendance view and functionality.
 * Allows users to select a month and grade to view attendance data.
 * Displays the attendance grid for the selected criteria.
 */
function Attendance() {
  // States for selected month, grade, attendance data, and loading state
  const [selectMonth, setSelectMonth] = useState();
  const [selectGrade, setSelectGrade] = useState();
  const [attendanceListData, setAttendanceListData] = useState();
  const [loading, setLoading] = useState(false);

  // Function to handle search for attendance data
  const searchHandler = () => {
    // Format the selected month
    const formattedMonth = moment(selectMonth).format("MM/YYYY");

    // Call API to fetch attendance data based on selected criteria
    GlobalApi.getAttendanceList(selectGrade, formattedMonth)
      .then((resp) => {
        setLoading(false);
        setAttendanceListData(resp.data);
      })
      .catch((error) => {
        console.error("API Call Error:", error);
      });
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl ">Attendance</h2>
      {/* Form for selecting month, grade, and search button */}
      <div className="flex items-center border shadow-sm rounded-lg my-5 p-5 gap-4 ">
        <div className="flex items-center gap-2">
          <label>Select Month:</label>
          {/* MonthSelection component */}
          <MonthSelection
            selectedMonth={(value) => {
              setSelectMonth(value);
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <label>Select Grade:</label>
          {/* GradeSelection component */}
          <GradeSelection
            selectedGrade={(value) => {
              setSelectGrade(value);
            }}
          />
        </div>
        {/* Search button */}
        <Button
          onClick={() => searchHandler()}
          disable={loading ? loading.toString() : undefined}
        >
          {/* Show loader icon if loading, otherwise show "Search" text */}
          {loading ? <LoaderIcon className="animate-spin" /> : "Search"}
        </Button>
      </div>
      {/* AttendanceGrid component to display attendance data */}
      <div>
        <AttendanceGrid
          attendanceListData={attendanceListData}
          selectMonth={selectMonth}
        />
      </div>
    </div>
  );
}

export default Attendance;

























"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

/**
 * AddNewStudent component handles the functionality to add a new student.
 * Renders a dialog form to input student details.
 * Allows submitting the form to create a new student.
 * @param {Function} onAddStudent - Callback function to update parent component with new student data.
 * @param {Function} refreshData - Function to refresh data after adding a new student.
 */
export function AddNewStudent({ onAddStudent, refreshData }) {
  // State variables for dialog visibility, loading state, and grades data
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [grades, setGrades] = useState([]);

  // React hook form setup
  const {
    register,
    handleSubmit,
    reset, // Clears the form
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  const onSubmit = (data) => {
    setLoading(true);
    GlobalApi.createNewStudent(data)
      .then((resp) => {
        if (resp.data) {
          setLoading(false);
          setOpenDialog(false);
          toast.success("New student has been added");
          // Update the parent component's state with new student data
          onAddStudent(resp.data);
          // Refresh data after adding a new student
          refreshData();
          // Clear the form
          reset();
        }
      })
      .catch((error) => {
        console.error("Error creating new student:", error);
      });
  };

  // Fetch grades data on component mount
  useEffect(() => {
    getAllData();
  }, []);

  // Function to fetch all grades data
  const getAllData = async () => {
    try {
      const gradeResp = await GlobalApi.getAllGrades();
      setGrades(gradeResp.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* Button to open the dialog form */}
      <Button onClick={() => setOpenDialog(true)}>+ Add New Student</Button>
      {/* Dialog form */}
      <Dialog open={openDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="py-4">
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          {/* Form for adding a new student */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-2 space-y-2">
              <label>Full Name</label>
              <Input
                placeholder="Rabbit Gate"
                {...register("fullName", { required: true })}
              />
              {/* Error message for required full name field */}
              {errors.fullName?.type === "required" && (
                <p role="alert" className="text-red-400 ">
                  Full name is required
                </p>
              )}
            </div>
            <div className="flex flex-col py-2 space-y-2">
              <label>Select a Grade</label>
              {/* Dropdown for selecting a grade */}
              <select
                className="p-3 border rounded-lg"
                {...register("grade", { required: true })}
              >
                {grades.map((item) => (
                  <option key={item.id} value={item.grade}>
                    {item.grade}
                  </option>
                ))}
              </select>
            </div>
            <div className="py-2 space-y-2">
              <label>Phone</label>
              <Input
                type="tel"
                placeholder="+234 810 7060 160"
                {...register("phone", {
                  required: true,
                  pattern: /^[+]?[0-9\s]*$/,
                })}
              />
              {/* Error message for required phone number field */}
              {errors.phone?.type === "required" && (
                <p role="alert" className="text-red-400 ">
                  Phone number is required
                </p>
              )}
            </div>
            <div className="py-2 space-y-2">
              <label>Address</label>
              <Input
                placeholder="Anvil apt City Center"
                {...register("address", { required: true })}
              />
              {/* Error message for required address field */}
              {errors.address?.type === "required" && (
                <p role="alert" className="text-red-400 ">
                  Address is required
                </p>
              )}
            </div>
            {/* Buttons for canceling and submitting the form */}
            <div className="flex justify-end items-center gap-3 mt-5">
              <Button
                type="button"
                onClick={() => setOpenDialog(false)}
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disable={loading ? loading.toString() : undefined}
              >
                {/* Show loader icon if loading, otherwise show "Save" text */}
                {loading ? <LoaderIcon className="animate-spin" /> : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

























import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { Button } from "@/components/ui/button";
import { Search, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";

/**
 * StudentTableList component renders a table of student records using Ag-Grid.
 * Allows searching and deleting student records.
 * @param {Array} students - Array of student records to display.
 * @param {Function} refreshData - Function to refresh the data after deleting a record.
 */
function StudentTableList({ students, refreshData }) {
  // State variables for search input and row data
  const [searchInput, setSearchInput] = useState(""); // Search input used in AgGridReact
  const [rowData, setRowData] = useState([]);

  // Function to handle deletion of a student record
  const handleDelete = (id) => {
    GlobalApi.deleteStudentRecord(id)
      .then((resp) => {
        if (resp.data && resp.data.success) {
          toast.success("Record Successfully Deleted");
          refreshData(); // Call this function passed as prop to update the parent component's state
        }
      })
      .catch((error) => {
        console.error("Error deleting student record:", error);
        toast.warning("Failed to delete the record");
      });
  };

  // Custom button component for the delete action
  const CustomBtn = (props) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="destructive">
            <Trash className="text-white" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-500">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              record and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(props?.data?.id)}
              className="hover:bg-red-500"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  // Column definitions for AgGridReact
  const [colDefs, setColDefs] = useState([
    { field: "id", width: 105, filter: true },
    { field: "fullName", filter: true },
    { field: "address", width: 300, filter: true },
    { field: "phone", filter: true },
    { field: "action", width: 90, cellRenderer: CustomBtn }, // Custom column for actions
  ]);

  // useEffect hook to update row data when students prop changes
  useEffect(() => {
    if (students) {
      setRowData(students);
    }
  }, [students]);

  // react-hook-form setup
  const {
    formState: { errors },
  } = useForm();

  // AgGridReact pagination options
  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 25, 50];

  return (
    <div className="my-7">
      {/* Container for AgGridReact */}
      <div
        className="ag-theme-quartz" // Applying the grid theme
        style={{ height: 500 }} // The grid will fill the size of the parent container
      >
        {/* Search input */}
        <div className="flex items-center gap-2 mb-4 p-2 rounded-lg border shadow-sm max-w-sm">
          <Search />
          <input
            className="outline-none w-full"
            type="text"
            placeholder="Search on record..."
            onChange={(e) => {
              setSearchInput(e.target.value); // Used in AgGridReact component
            }}
          />
        </div>
        {/* AgGridReact component */}
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          quickFilterText={searchInput}
          pagination={pagination} // Pagination with 10 records per page
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
}





























"use client";

import { useEffect, useState } from "react";
import { AddNewStudent } from "./_components/AddNewStudent";
import GlobalApi from "@/app/_services/GlobalApi";
import StudentTableList from "./_components/StudentTableList";

/**
 * Student component manages the display of student records.
 * Retrieves student data from the server and renders the student table list.
 */
function Student() {
  // State variable to store the list of students
  const [students, setStudents] = useState([]);

  // useEffect hook to fetch student data on component mount
  useEffect(() => {
    getAllData();
  }, []);

  // Function to fetch all student data from the server
  const getAllData = async () => {
    try {
      const studentResp = await GlobalApi.getAllStudents();
      setStudents(studentResp.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle adding a new student to the list
  const handleAddStudent = (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  // Total number of students
  const totalStudent = students.length;

  return (
    <div className="p-7">
      {/* Header with total number of students and AddNewStudent component */}
      <h2 className="flex justify-between items-center font-bold text-2xl ">
        {totalStudent ? "Total " : ""} Students{" "}
        {totalStudent ? totalStudent : ""}
        {/* AddNewStudent component to add a new student */}
        <AddNewStudent
          onAddStudent={handleAddStudent}
          refreshData={getAllData} // For AddNewStudent component to show the current update after adding a record
        />
      </h2>
      {/* StudentTableList component to display the list of students */}
      <StudentTableList
        students={students}
        refreshData={getAllData} // For StudentTableList component to show the current update after deleting a record
      />
    </div>
  );
}

export default Student;



























import React from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";

/**
 * Layout component wraps the main content with a side navigation and header.
 * @param {Object} children - The child components to be rendered within the layout.
 */
function Layout({ children }) {
  return (
    <div>
      {/* SideNav component for navigation */}
      <div className="md:w-64 fixed hidden md:block">
        <SideNav />
      </div>
      {/* Main content area */}
      <div className="md:ml-64">
        {/* Header component */}
        <Header />
        {/* Render children components */}
        {children}
      </div>
    </div>
  );
}

export default Layout;


















import { useTheme } from "next-themes";
import { useEffect } from "react";

/**
 * Dashboard component sets the theme to "dark".
 */
function Dashboard() {
  const { setTheme } = useTheme();

  useEffect(() => {
    // Set the theme to "dark" when the component mounts
    setTheme("dark");
  }, [setTheme]); // Added setTheme to the dependency array to prevent unnecessary re-renders

  return <div>Attendance</div>;
}

export default Dashboard;

































require("dotenv").config();
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

/**
 * Creates a connection to the MySQL database.
 * @returns {Promise<Object>} - Connection object.
 * @throws {Error} - If connection to the database fails.
 */
async function createConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    console.log("Database connected successfully");
    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

// Create a connection to the database
const connection = await createConnection();

// Create a drizzle instance with the database connection
export const db = drizzle(connection);

// require("dotenv").config();
// const mysql = require("mysql2/promise");
// const { drizzle } = require("drizzle-orm/mysql2");

// const createConnection = async () => {
//   try {
//     const connection = await mysql.createConnection({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_DATABASE,
//     });
//     console.log("Database connected successfully");
//     return drizzle(connection);
//   } catch (error) {
//     console.error("Error connecting to the database:", error);
//     throw error;
//   }
// };

// module.exports = { createConnection };




























import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using Tailwind CSS and class merging utilities.
 * @param {...string} inputs - Class names to be combined.
 * @returns {string} - Combined class names string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


















import { Inter } from "next/font/google";
import { ThemeProvider } from "@/common/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AttendEase",
  description: "Generated AttendEase",
};

/**
 * RootLayout component serves as the top-level layout for the application.
 * It sets up the language, font, theme provider, and toaster component.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Add any additional meta tags here */}
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Toaster for displaying notifications */}
          <Toaster richColors />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
























"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

/**
 * Home component redirects users to the login page upon mounting.
 * After successful login, users are redirected to the dashboard.
 */
export default function Home() {
  useEffect(() => {
    redirect("/api/auth/login?post_login_redirect_url=/dashboard");
  }, []);

  return <main className="">Home</main>;
}
