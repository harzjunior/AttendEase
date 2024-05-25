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

//create Attendance and used in submit form
const createNewAttendance = (data) => axios.post("/api/attendance", data); //post method and pass in the data param

//gets all Attendances from db
const getAllAttendances = () => axios.get("/api/attendance");

//deletes a Attendances from db by id
const deleteAttendanceRecord = (id) => axios.delete("/api/attendance?id=" + id);

export default {
  getAllGrades,
  createNewStudent,
  getAllStudents,
  deleteStudentRecord,
  createNewAttendance,
  getAllAttendances,
  deleteAttendanceRecord,
};
