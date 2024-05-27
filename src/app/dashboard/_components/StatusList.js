"use client";

import { useEffect, useState } from "react";
import { getUniqueRecords } from "@/app/_services/services";
import moment from "moment/moment";

function StatusList({ attendanceListData }) {
  console.log(attendanceListData.result);

  const [totalStudent, setTotalStudent] = useState(0);
  const [percentagePresent, setPercentagePresent] = useState(0);

  useEffect(() => {
    if (attendanceListData?.result) {
      const uniqueStudentRecords = getUniqueRecords(attendanceListData.result); // get unique user Record (number of box checked)
      setTotalStudent(uniqueStudentRecords);

      // attendanceListData.result.length, size/length of box/boxes checked
      // uniqueStudentRecords.length, number of student in current grade

      const today = moment().format("D");
      const totalPercent =
        (attendanceListData.result.length /
          (uniqueStudentRecords.length * Number(today))) *
        100;

      console.log("totalPercent ", totalPercent);

      console.log(
        attendanceListData.result.length,
        uniqueStudentRecords.length,
        today
      );
    }
  }, [attendanceListData]);

  return (
    <div>
      <h2>Status List</h2>
    </div>
  );
}

export default StatusList;
