const { default: axios } = require("axios");

// e.g, we can use it in AddNewStudent component
//gets all courses from db
const getAllCourses = () => axios.get("/api/course");

// ==========================================Students============================================
//create student and used in submit form
const createNewStudent = (data) => axios.post("/api/student", data); //post method and pass in the data param

//gets all students from db
const getAllStudents = () => axios.get("/api/student");

//deletes a students from db by id
const deleteStudentRecord = (id) => axios.delete("/api/student?id=" + id);

// ==========================================Attendance============================================

//gets all Attendances from db
const getAttendanceList = (course, month) => {
  // console.log(`Fetching attendance for course=${course}&month=${month}`);
  return axios.get(`/api/attendance?course=${course}&month=${month}`);
};

//create student and used in submit form
const createAttendance = (data) => axios.post("/api/attendance", data); //post method and pass in the data param

//deletes an attendance record from db by studentId, day, and date
const deleteAttendance = (studentId, day, date) => {
  return axios.delete(
    `/api/attendance?studentId=${studentId}&day=${day}&date=${date}`
  );
};

// ==========================================Dashboard============================================
//gets date and course for records for stats from db

const getTotalPresentCountByDay = (date, course) => {
  return axios.get(`/api/dashboard?date=${date}&course=${course}`);
};

export default {
  getAllCourses,
  createNewStudent,
  getAllStudents,
  deleteStudentRecord,
  getAttendanceList,
  createAttendance,
  deleteAttendance,
  getTotalPresentCountByDay,
};
