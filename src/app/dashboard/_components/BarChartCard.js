"use client";

import { getUniqueRecords } from "@/app/_services/services";
import { useAttendance } from "@/context/AttendanceContext";
// import moment from "moment/moment";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BarChartCard = () => {
  const { attendanceListData, totalPercentageData } = useAttendance();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (attendanceListData && totalPercentageData) {
      formatCountAttendanceList();
    } else {
      console.log("no data");
    }
  }, [attendanceListData, totalPercentageData]);

  const formatCountAttendanceList = () => {
    const totalStudents = getUniqueRecords(attendanceListData?.result); // get unique user Record (number of box checked)

    const result = totalPercentageData?.result.map((item) => ({
      day: "Day " + item.day,
      presentCount: item.presentCount,
      absentCount: Number(totalStudents?.length) - Number(item.presentCount),
    }));

    setData(result);
    // console.log(result);
  };

  return (
    <div className="border rounded-lg shadow-sm p-5">
      <h2 className="my-2 text-lg font-bold">Attendance</h2>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="presentCount" name="Total Present" fill="#8884d8" />
          <Bar dataKey="absentCount" name="Total Absent" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCard;
