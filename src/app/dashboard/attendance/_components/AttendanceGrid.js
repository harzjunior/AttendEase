"use client";

import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

//got attendanceListData props from Attendance component
function AttendanceGrid({ attendanceListData }) {
  // Row ag-grid Data: The data to be displayed.
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "studentId" },
    { field: "fullName" },
  ]);

  // only refresh the page when there is attendanceListData data
  useEffect(() => {
    // Ensure attendanceListData is valid, the API response indicates success, and result is an array
    if (attendanceListData?.result) {
      const uniqueRecords = getUniqueRecords(attendanceListData.result);
      setRowData(uniqueRecords);
    }
  }, [attendanceListData]);

  // get unique user Record
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

  return (
    <div
      className="ag-theme-quartz" // applying the grid theme
      style={{ height: 500 }} // the grid will fill the size of the parent container
    >
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </div>
  );
}

export default AttendanceGrid;
