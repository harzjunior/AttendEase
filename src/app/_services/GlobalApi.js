const { default: axios } = require("axios");

// e.g, we can use it in AddNewStudent component
//gets all courses from db
const COURSE_BASE_URL = "/api/course/";

const getAllCourses = () => axios.get(COURSE_BASE_URL);

//create course and used in submit form
const createNewCourse = (data) => axios.post(COURSE_BASE_URL, data);

// ==========================================Students============================================
const BASE_URL = "/api/student/";

//create student and used in submit form
const createNewStudent = (data) => axios.post(BASE_URL, data); //post method and pass in the data param

//gets all students from db
const getAllStudents = () => axios.get(BASE_URL);

//deletes a students from db by id
// const deleteStudentRecord = (id) => axios.delete(BASE_URL + id);
const deleteStudentRecord = (id) => axios.delete(`${BASE_URL}?id=${id}`);

//update a students from db by id
const editStudentRecord = (data) => axios.patch(BASE_URL, data);

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

// ==========================================profile============================================
//search a student profile from db by id
// const searchStudent = (data) => axios.get("/api/profile", { data });

const searchStudent = (data) => {
  const params = new URLSearchParams();
  if (data.fullName) params.append("fullName", data.fullName);
  if (data.phone) params.append("phone", data.phone);
  if (data.address) params.append("address", data.address);

  return axios.get(`/api/profile?${params.toString()}`);
};

export default {
  getAllCourses,
  createNewCourse,
  createNewStudent,
  getAllStudents,
  deleteStudentRecord,
  searchStudent,
  editStudentRecord,
  getAttendanceList,
  createAttendance,
  deleteAttendance,
  getTotalPresentCountByDay,
};
