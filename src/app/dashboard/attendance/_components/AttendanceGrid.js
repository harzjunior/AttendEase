"use client";

import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import moment from "moment/moment";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";
import { getUniqueRecords } from "@/app/_services/services";
import { useAttendance } from "@/context/AttendanceContext";

function AttendanceGrid() {
  // Update page to use context api.
  const { attendanceListData, selectMonth } = useAttendance();
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
      const uniqueRecords = getUniqueRecords(attendanceListData.result); // get unique user Record
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

  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 25, 50];

  return (
    <div
      className="ag-theme-quartz" // applying the grid theme
      style={{ height: 500 }} // the grid will fill the size of the parent container
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        onCellValueChanged={handleCellValueChanged}
        pagination={pagination} //pagination with 10 records
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
      />
    </div>
  );
}

export default AttendanceGrid;
