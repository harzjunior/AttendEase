"use client";

import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import moment from "moment/moment";

//got attendanceListData and selectMonth props from Attendance component
function AttendanceGrid({ attendanceListData, selectMonth }) {
  // Row ag-grid Data: The data to be displayed.
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "studentId", width: 105 },
    { field: "fullName" },
  ]);

  // calculating number of days, we can get that from Attendance Component
  const daysOfTheMonth = (year, month) => new Date(year, month, 0).getDate();
  const numberOfDays = daysOfTheMonth(
    moment(selectMonth).format("yyyy"),
    moment(selectMonth).format("MM")
  );
  //get all the days in array form (the size of the month { length: numberOfDays } and counting from init to i + 1, because array starts from 0 (_, i) => i + 1 )
  const daysInArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

  console.log(numberOfDays, typeof numberOfDays);
  console.log(daysInArray);

  // only refresh the page when there is attendanceListData data
  useEffect(() => {
    // Ensure attendanceListData is valid, the API response indicates success, and result is an array
    if (attendanceListData?.result) {
      const uniqueRecords = getUniqueRecords(attendanceListData.result);
      setRowData(uniqueRecords);

      daysInArray.forEach((date) => {
        setColDefs((prevData) => [
          ...prevData,
          {
            field: date.toString(),
            width: 50,
            editable: true,
          },
        ]);
      });
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
