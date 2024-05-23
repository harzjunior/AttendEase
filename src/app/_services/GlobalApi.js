const { default: axios } = require("axios");

// e.g, we can use it in AddNewStudent component
const getAllGrades = () => axios.get("/api/grade");

export default { getAllGrades };
