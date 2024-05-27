"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import MonthSelection from "../_components/MonthSelection";
import GradeSelection from "../_components/GradeSelection";
import GlobalApi from "../_services/GlobalApi";
import moment from "moment/moment";

function Dashboard() {
  const [selectMonth, setSelectMonth] = useState();
  const [selectGrade, setSelectGrade] = useState();

  // call the searchHandler function
  const studentAttendanceHandler = () => {
    const formattedMonth = moment(selectMonth).format("MM/YYYY");

    GlobalApi.getAttendanceList(selectGrade, formattedMonth)
      .then((resp) => {
        console.log(resp.data.result);
      })
      .catch((error) => {
        console.error("API Call Error:", error);
      });
  };

  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("system");
    studentAttendanceHandler();
  }, [selectMonth, selectGrade]);

  return (
    <div className="p-10">
      <div className="flex justify-between items-center gap-4">
        <h2 className="font-bold text-2xl">Attendance</h2>
        <div className="flex items-center gap-4">
          <MonthSelection
            selectedMonth={(value) => {
              setSelectMonth(value);
            }}
          />

          <GradeSelection
            selectedGrade={(value) => {
              setSelectGrade(value);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
