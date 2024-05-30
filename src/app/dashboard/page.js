"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";
import MonthSelection from "../_components/MonthSelection";
import CourseSelection from "../_components/CourseSelection";
import GlobalApi from "../_services/GlobalApi";
import moment from "moment/moment";
import StatusList from "./_components/StatusList";
import { useAttendance } from "@/context/AttendanceContext";
import BarChartCard from "./_components/BarChartCard";
import PieChartCard from "./_components/PieChartCard";

function Dashboard() {
  // Update page to use context api.
  const {
    selectMonth,
    setSelectMonth,
    selectCourse,
    setSelectCourse,
    setAttendanceListData,
    setTotalPercentageData,
  } = useAttendance();

  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
    if (selectMonth && selectCourse) {
      getTotalPresentCount();
      studentAttendanceHandler();
    }
  }, [selectMonth, selectCourse]);

  // call the searchHandler function
  const studentAttendanceHandler = () => {
    const formattedMonth = moment(selectMonth).format("MM/YYYY");
    GlobalApi.getAttendanceList(selectCourse, formattedMonth)
      .then((resp) => {
        setAttendanceListData(resp.data);
      })
      .catch((error) => {
        console.error("API Call Error:", error);
      });
  };

  const getTotalPresentCount = () => {
    GlobalApi.getTotalPresentCountByDay(
      moment(selectMonth).format("MM/YYYY"),
      selectCourse
    )
      .then((resp) => {
        setTotalPercentageData(resp.data);
      })
      .catch((error) => {
        console.error("API Call Error:", error);
      });
  };

  return (
    <div className="p-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-3 items-center ">
          <h2 className="font-bold text-2xl">Attendance:</h2>
          {/* <code className="mt-1 text-xs">
            Month of:
            <em> {moment(selectMonth).format("MMMM")}</em> Course:
            <em> {selectCourse}</em>
          </code> */}
        </div>
        <div className="flex items-center gap-4">
          <MonthSelection selectedMonth={setSelectMonth} />

          <CourseSelection
            selectedCourse={(value) => {
              setSelectCourse(value);
            }}
          />
        </div>
      </div>
      <div>
        <StatusList />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2">
          <BarChartCard />
        </div>
        <div>
          <PieChartCard />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
