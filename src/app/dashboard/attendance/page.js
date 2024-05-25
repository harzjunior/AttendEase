"use client";

import GradeSelection from "@/app/_components/GradeSelection";
import MonthSelections from "@/app/_components/MonthSelections";
import { Button } from "@/components/ui/button";

function page() {
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl ">Attendance</h2>
      <div className="flex items-center border shadow-sm rounded-lg my-5 p-5 gap-4 ">
        <div className="flex items-center gap-2">
          <label>Select Month:</label>
          <MonthSelections />
        </div>
        <div className="flex items-center gap-2">
          <label>Select Grade:</label>
          <GradeSelection />
        </div>
        <Button>Search</Button>
      </div>
    </div>
  );
}

export default page;
