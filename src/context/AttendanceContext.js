"use client";

import { createContext, useContext, useState } from "react";

const AttendanceContext = createContext();

export const useAttendance = () => useContext(AttendanceContext);

export const AttendanceProvider = ({ children }) => {
  const [selectMonth, setSelectMonth] = useState();
  const [selectGrade, setSelectGrade] = useState();
  const [attendanceListData, setAttendanceListData] = useState();
  const [totalPercentageData, setTotalPercentageData] = useState();

  return (
    <AttendanceContext.Provider
      value={{
        selectMonth,
        setSelectMonth,
        selectGrade,
        setSelectGrade,
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
