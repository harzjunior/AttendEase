"use client";

import { useEffect, useState } from "react";
import { getUniqueRecords } from "@/app/_services/services";
import moment from "moment/moment";
import { GraduationCap, TrendingDown, TrendingUp } from "lucide-react";
import Card from "./Card";

function StatusList({ attendanceListData }) {
  console.log(attendanceListData.result);

  const [totalStudent, setTotalStudent] = useState(0);
  const [percentagePresent, setPercentagePresent] = useState(0);

  useEffect(() => {
    if (attendanceListData?.result) {
      const uniqueStudentRecords = getUniqueRecords(attendanceListData.result); // get unique user Record (number of box checked)
      setTotalStudent(uniqueStudentRecords.length);

      // attendanceListData.result.length, size/length of box/boxes checked
      // uniqueStudentRecords.length, number of student in current grade

      const today = moment().format("D");
      const totalPercent =
        (attendanceListData.result.length /
          (uniqueStudentRecords.length * Number(today))) *
        100;
      setPercentagePresent(totalPercent);

      console.log(
        attendanceListData.result.length,
        uniqueStudentRecords.length,
        today
      );
    }
  }, [attendanceListData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6">
      <Card
        icon={<GraduationCap />}
        title={"Total Students "}
        value={totalStudent}
      />
      <Card
        icon={<TrendingUp />}
        title={"Total Student Present "}
        value={percentagePresent.toFixed(2) + "%"}
      />
      <Card
        icon={<TrendingDown />}
        title={"Total Student Absent "}
        value={(100 - percentagePresent).toFixed(2) + "%"}
      />
    </div>
  );
}

export default StatusList;
