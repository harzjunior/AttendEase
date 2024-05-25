"use client";

import GradeSelection from "@/app/_components/GradeSelection";
import MonthSelection from "@/app/_components/MonthSelection";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function Attendance() {
  // states for months and grades
  const [selectMonth, setSelectMonth] = useState();
  const [selectGrade, setSelectGrade] = useState();

  // call the searchHandler function
  const searchHandler = () => {
    console.log("Grade: " + selectGrade, "Month: " + selectMonth);
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
    </div>
  );
}

export default Attendance;
