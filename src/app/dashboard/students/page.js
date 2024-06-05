"use client";

import { useEffect, useState } from "react";
import { AddNewStudent } from "./_components/AddNewStudent";
import GlobalApi from "@/app/_services/GlobalApi";
import StudentTableList from "./_components/StudentTableList";
import { StudentProfile } from "./_components/StudentProfile";
import { AddNewCourse } from "./_components/AddNewCourse";

function Student() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllStudentData();
    getAllCoursesData();
  }, []);

  // let's call our API
  const getAllStudentData = async () => {
    try {
      const studentResp = await GlobalApi.getAllStudents();
      setStudents(studentResp.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllCoursesData = async () => {
    try {
      const courseResp = await GlobalApi.getAllCourses();
      setCourses(courseResp.data);
    } catch (error) {
      console.error(error);
    }
  };

  //for AddNewStudent component to update live data
  const handleAddStudent = (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  //for StudentProfile component to update live data
  const handleStudentProfile = (newStudentProfile) => {
    setStudents((prevStudentProfile) => [
      ...prevStudentProfile,
      newStudentProfile,
    ]);
  };

  const totalStudent = students.length;
  const totalCourse = courses.length;

  return (
    <div className="p-7">
      <h2 className="flex flex-col md:flex-row gap-2 justify-between items-center font-bold text-2xl ">
        <div className="text-gray-600 text-center md:text-start">
          <div>
            {totalStudent ? "Total " : ""} Students{" "}
            {totalStudent ? totalStudent : ""}
          </div>
          <div>
            {totalCourse ? "Total " : ""} Courses{" "}
            {totalCourse ? totalCourse : ""}
          </div>
        </div>
        <div className="flex gap-3">
          <StudentProfile />
          <AddNewCourse
            refreshData={getAllCoursesData} // for AddNewStudent component to show the current update after record has been added
          />
          <AddNewStudent
            onAddStudent={handleAddStudent}
            refreshData={getAllStudentData} // for AddNewStudent component to show the current update after record has been added
          />
        </div>
      </h2>
      <StudentTableList
        students={students}
        refreshData={getAllStudentData} // for StudentTableList component to show the current update after record has been deleted
      />
    </div>
  );
}

export default Student;
