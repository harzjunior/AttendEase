"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import MonthSelection from "../_components/MonthSelection";
import GradeSelection from "../_components/GradeSelection";
import GlobalApi from "../_services/GlobalApi";
import moment from "moment/moment";
import StatusList from "./_components/StatusList";
import { useAttendance } from "@/context/AttendanceContext";

function Dashboard() {
  // Update page to use context api.
  const {
    selectMonth,
    setSelectMonth,
    selectGrade,
    setSelectGrade,
    setAttendanceListData,
  } = useAttendance();
  // const [attendanceList, setAttendanceList] = useState(0);
  const [totalParcentageData, setTotalParcentageData] = useState([]);

  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
    if (selectMonth && selectGrade) {
      studentAttendanceHandler();
      getTotalPresentCount();
    }
  }, [selectMonth, selectGrade]);

  // call the searchHandler function
  const studentAttendanceHandler = () => {
    const formattedMonth = moment(selectMonth).format("MM/YYYY");
    GlobalApi.getAttendanceList(selectGrade, formattedMonth)
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
      selectGrade
    )
      .then((resp) => {
        console.log(resp.data);
        setTotalParcentageData(resp.data);
      })
      .catch((error) => {
        console.error("API Call Error:", error);
      });
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-3 items-center ">
          <h2 className="font-bold text-2xl">Attendance:</h2>
          <code className="mt-1 text-xs">
            Month of:
            <em> {moment(selectMonth).format("MMMM")}</em> Grade:
            <em> {selectGrade}</em>
          </code>
        </div>
        <div className="flex items-center gap-4">
          <MonthSelection selectedMonth={setSelectMonth} />

          <GradeSelection
            selectedGrade={(value) => {
              setSelectGrade(value);
            }}
          />
        </div>
      </div>
      <div>
        <StatusList />
      </div>
    </div>
  );
}

export default Dashboard;
