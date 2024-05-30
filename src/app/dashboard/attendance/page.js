"use client";

import CourseSelection from "@/app/_components/CourseSelection";
import MonthSelection from "@/app/_components/MonthSelection";
import GlobalApi from "@/app/_services/GlobalApi";
import { Button } from "@/components/ui/button";
import moment from "moment/moment";
import { useState } from "react";
import AttendanceGrid from "./_components/AttendanceGrid";
import { LoaderIcon } from "lucide-react";
import { useAttendance } from "@/context/AttendanceContext";

function Attendance() {
  // Update page to use context api.
  const {
    selectMonth,
    setSelectMonth,
    selectCourse,
    setSelectCourse,
    attendanceListData,
    setAttendanceListData,
  } = useAttendance();
  const [loading, setLoading] = useState(false);

  // call the searchHandler function
  const searchHandler = () => {
    const formattedMonth = moment(selectMonth).format("MM/YYYY");

    GlobalApi.getAttendanceList(selectCourse, formattedMonth)
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
          <label>Select Course:</label>
          <CourseSelection
            selectedCourse={(value) => {
              setSelectCourse(value);
            }}
          />
        </div>
        <Button
          onClick={() => searchHandler()}
          disable={loading ? loading.toString() : undefined}
        >
          {loading ? <LoaderIcon className="animate-spin" /> : "Search"}
        </Button>
      </div>
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
