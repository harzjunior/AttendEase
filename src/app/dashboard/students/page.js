"use client";

import { useEffect, useState } from "react";
import { AddNewStudent } from "./_components/AddNewStudent";
import GlobalApi from "@/app/_services/GlobalApi";
import StudentTableList from "./_components/StudentTableList";
import { StudentProfile } from "./_components/StudentProfile";

function Student() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  // let's call our API
  const getAllData = async () => {
    try {
      const studentResp = await GlobalApi.getAllStudents();
      setStudents(studentResp.data);
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

  return (
    <div className="p-7">
      <h2 className="flex flex-col md:flex-row gap-2 justify-between items-center font-bold text-2xl ">
        {totalStudent ? "Total " : ""} Students{" "}
        {totalStudent ? totalStudent : ""}
        <div className="flex gap-3">
          <StudentProfile
            onAddStudent={handleStudentProfile}
            refreshData={getAllData}
          />
          <AddNewStudent
            onAddStudent={handleAddStudent}
            refreshData={getAllData} // for AddNewStudent component to show the current update after record has been added
          />
        </div>
      </h2>
      <StudentTableList
        students={students}
        refreshData={getAllData} // for StudentTableList component to show the current update after record has been deleted
      />
    </div>
  );
}

export default Student;
