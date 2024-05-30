"use client";

import { createContext, useContext, useState } from "react";

const AttendanceContext = createContext();

export const useAttendance = () => useContext(AttendanceContext);

export const AttendanceProvider = ({ children }) => {
  const [selectMonth, setSelectMonth] = useState();
  const [selectCourse, setSelectCourse] = useState();
  const [attendanceListData, setAttendanceListData] = useState();
  const [totalPercentageData, setTotalPercentageData] = useState();

  return (
    <AttendanceContext.Provider
      value={{
        selectMonth,
        setSelectMonth,
        selectCourse,
        setSelectCourse,
        attendanceListData,
        setAttendanceListData,
        totalPercentageData,
        setTotalPercentageData,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};
