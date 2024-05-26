"use client";

import GradeSelection from "@/app/_components/GradeSelection";
import MonthSelection from "@/app/_components/MonthSelection";
import GlobalApi from "@/app/_services/GlobalApi";
import { Button } from "@/components/ui/button";
import moment from "moment/moment";
import { useState } from "react";
import AttendanceGrid from "./_components/AttendanceGrid";

function Attendance() {
  // states for months and grades
  const [selectMonth, setSelectMonth] = useState();
  const [selectGrade, setSelectGrade] = useState();
  const [attendanceListData, setAttendanceListData] = useState(); //for attendance list fetch

  // call the searchHandler function
  const searchHandler = () => {
    const formattedMonth = moment(selectMonth).format("MM/YYYY");

    GlobalApi.getAttendanceList(selectGrade, formattedMonth)
      .then((resp) => {
        setAttendanceListData(resp.data);
      })
      .catch((error) => {
        console.error("API Call Error:", error);
      });
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl ">Attendance</h2>
      <div className="flex items-center border shadow-sm rounded-lg my-5 p-5 gap-4 ">
        <div className="flex items-center gap-2">
          <label>Select Month:</label>
          <MonthSelection
            selectedMonth={(value) => {
              setSelectMonth(value);
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <label>Select Grade:</label>
          <GradeSelection
            selectedGrade={(value) => {
              setSelectGrade(value);
            }}
          />
        </div>
        <Button onClick={() => searchHandler()}>Search</Button>
      </div>
      <div>
        <AttendanceGrid attendanceListData={attendanceListData} />
      </div>
    </div>
  );
}

export default Attendance;
