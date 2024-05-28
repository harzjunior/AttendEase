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
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BarChartCard = () => {
  const { selectMonth, attendanceListData, totalPercentageData } =
    useAttendance();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (attendanceListData && totalPercentageData) {
      formatCountAttendanceList();
    } else {
      console.log("no data");
    }
  }, [attendanceListData, totalPercentageData]);

  const formatCountAttendanceList = () => {
    const uniqueStudentRecords = getUniqueRecords(attendanceListData?.result); // get unique user Record (number of box checked)
    const totalStudents = uniqueStudentRecords?.length;

    const result = totalPercentageData?.result.map((item) => ({
      day: item.day,
      presentCount: item.presentCount,
      absentCount: Number(totalStudents) - Number(item.presentCount),
    }));

    setData(result);
    console.log(result);
  };

  return (
    <div>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="presentCount" fill="#8884d8" />
        <Bar dataKey="absentCount" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default BarChartCard;
