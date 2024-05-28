"use client";

import { useEffect, useState } from "react";
import { getUniqueRecords } from "@/app/_services/services";
import moment from "moment/moment";
import { useAttendance } from "@/context/AttendanceContext";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const PieChartCard = () => {
  // Update page to use context api.
  const { attendanceListData } = useAttendance();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (attendanceListData?.result) {
      const uniqueStudentRecords = getUniqueRecords(attendanceListData.result); // get unique user Record (number of box checked)
      const numberOfDays = moment().format("D"); // Number of days in the selected month

      const totalStudents = uniqueStudentRecords.length;

      const totalPresent = attendanceListData.result.filter(
        (attendance) => attendance.present
      ).length;

      const totalAbsent = totalStudents * numberOfDays - totalPresent;

      const presentPercent =
        (totalPresent / (totalStudents * numberOfDays)) * 100;
      const absentPercent =
        (totalAbsent / (totalStudents * numberOfDays)) * 100;

      setData([
        {
          name: "Total Present %",
          value:
            presentPercent % 1 === 0
              ? presentPercent
              : Number(presentPercent.toFixed(2)),
          fill: "#8884d8",
        },
        {
          name: "Total Absent %",
          value:
            absentPercent % 1 === 0
              ? absentPercent
              : Number(absentPercent.toFixed(2)),
          fill: "#82ca9d",
        },
      ]);
    }
  }, [attendanceListData]);

  return (
    <div className="border rounded-lg shadow-sm p-5">
      <h2 className="my-2 text-lg font-bold">Monthly Attendance</h2>
      <ResponsiveContainer width={"100%"} height={300}>
        <PieChart>
          <Legend />
          <Tooltip />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartCard;
