// get unique user Record, used in AttendanceGrid
export const getUniqueRecords = (attendanceListData) => {
  const uniqueRecord = [];
  const existingUser = new Set();

  attendanceListData.forEach((attendance) => {
    if (!existingUser.has(attendance.studentId)) {
      existingUser.add(attendance.studentId);
      uniqueRecord.push(attendance);
    }
  });

  return uniqueRecord;
};
