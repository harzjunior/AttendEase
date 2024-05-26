"use client";

import { useEffect, useState } from "react";

//got attendanceListData props from Attendance component
function AttendanceGrid({ attendanceListData }) {
  // Row ag-grid Data: The data to be displayed.
  const [rowData, setRowData] = useState([]);

  // only refresh the page when there is attendanceListData data
  useEffect(() => {
    // Ensure attendanceListData is valid, the API response indicates success, and result is an array
    if (attendanceListData?.result) {
      const uniqueRecords = getUniqueRecords(attendanceListData.result);
      console.log(uniqueRecords);
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

  return <div>Attendance</div>;
}

export default AttendanceGrid;
