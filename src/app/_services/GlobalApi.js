const { default: axios } = require("axios");

// e.g, we can use it in AddNewStudent component
//gets all grades from db
const getAllGrades = () => axios.get("/api/grade");

//create student and used in submit form
const createNewStudent = (data) => axios.post("/api/student", data); //post method and pass in the data param

//gets all students from db
const getAllStudents = () => axios.get("/api/student");

export default { getAllGrades, createNewStudent, getAllStudents };
