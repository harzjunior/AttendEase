"use client";

import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import moment from "moment/moment";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";

//got attendanceListData and selectMonth props from Attendance component
function AttendanceGrid({ attendanceListData, selectMonth }) {
  // Row ag-grid Data: The data to be displayed.
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "studentId", width: 110, filter: true },
    { field: "fullName", filter: true },
  ]);

  // calculating number of days, we can get that from Attendance Component
  const daysOfTheMonth = (year, month) => new Date(year, month, 0).getDate();
  const numberOfDays = daysOfTheMonth(
    moment(selectMonth).format("yyyy"),
    moment(selectMonth).format("MM")
  );
  //get all the days in array form (the size of the month { length: numberOfDays } and counting from init to i + 1, because array starts from 0 (_, i) => i + 1 )
  const daysInArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

  // only refresh the page when there is attendanceListData data
  useEffect(() => {
    // Ensure attendanceListData is valid, the API response indicates success, and result is an array
    if (attendanceListData?.result) {
      const uniqueRecords = getUniqueRecords(attendanceListData.result);
      setRowData(uniqueRecords);

      const newColDefs = [
        { field: "studentId", width: 105, filter: true },
        { field: "fullName", filter: true },
        ...daysInArray.map((date) => ({
          field: date.toString(),
          width: 50,
          editable: true,
        })),
      ];

      setColDefs(newColDefs);

      uniqueRecords.forEach((obj) => {
        daysInArray.forEach((date) => {
          obj[date] = isPresent(obj.studentId, date); //passing studentId of attendanceListData to compare with the isPresent function data date from daysInArray
        });
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

  //using the present column field in attendance table
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
