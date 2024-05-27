const { default: axios } = require("axios");

// e.g, we can use it in AddNewStudent component
//gets all grades from db
const getAllGrades = () => axios.get("/api/grade");

// ==========================================Students============================================
//create student and used in submit form
const createNewStudent = (data) => axios.post("/api/student", data); //post method and pass in the data param

//gets all students from db
const getAllStudents = () => axios.get("/api/student");

//deletes a students from db by id
const deleteStudentRecord = (id) => axios.delete("/api/student?id=" + id);

// ==========================================Attendance============================================

//gets all Attendances from db
const getAttendanceList = (grade, month) => {
  // console.log(`Fetching attendance for grade=${grade}&month=${month}`);
  return axios.get(`/api/attendance?grade=${grade}&month=${month}`);
};

//create student and used in submit form
const createAttendance = (data) => axios.post("/api/attendance", data); //post method and pass in the data param

//deletes an attendance record from db by studentId, day, and date
const deleteAttendance = (studentId, day, date) => {
  return axios.delete(
    `/api/attendance?studentId=${studentId}&day=${day}&date=${date}`
  );
};

export default {
  getAllGrades,
  createNewStudent,
  getAllStudents,
  deleteStudentRecord,
  getAttendanceList,
  createAttendance,
  deleteAttendance,
};
