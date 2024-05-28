"use client";

import { useEffect, useState } from "react";
import { getUniqueRecords } from "@/app/_services/services";
import moment from "moment/moment";
import { GraduationCap, TrendingDown, TrendingUp } from "lucide-react";
import Card from "./Card";
import { useAttendance } from "@/context/AttendanceContext";

function StatusList() {
  // Update page to use context api.
  const { attendanceListData, selectMonth } = useAttendance();
  const [totalStudent, setTotalStudent] = useState(0);
  const [percentagePresent, setPercentagePresent] = useState(0);
  const [percentageAbsent, setPercentageAbsent] = useState(0);

  useEffect(() => {
    if (attendanceListData?.result) {
      const uniqueStudentRecords = getUniqueRecords(attendanceListData.result); // get unique user Record (number of box checked)
      const numberOfDays = moment(selectMonth).daysInMonth(); // Number of days in the selected month

      // attendanceListData.result.length, size/length of box/boxes checked
      // uniqueStudentRecords.length, number of student in current grade

      const totalStudents = uniqueStudentRecords.length;
      setTotalStudent(totalStudents);

      const totalPresent = attendanceListData.result.filter(
        (attendance) => attendance.present
      ).length;
      const totalAbsent = totalStudents * numberOfDays - totalPresent;

      const presentPercent =
        (totalPresent / (totalStudents * numberOfDays)) * 100;
      const absentPercent =
        (totalAbsent / (totalStudents * numberOfDays)) * 100;

      setPercentagePresent(presentPercent);
      setPercentageAbsent(absentPercent);
    }
  }, [attendanceListData]);

  const formatPercentage = (percentage) => {
    return percentage % 1 === 0 ? percentage : percentage.toFixed(2);
  };

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
        value={`${formatPercentage(percentagePresent)}%`}
      />
      <Card
        icon={<TrendingDown />}
        title={"Total Student Absent "}
        value={`${formatPercentage(percentageAbsent)}%`}
      />
    </div>
  );
}

export default StatusList;
