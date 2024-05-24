"use client";

import { useEffect, useState } from "react";
import { AddNewStudent } from "./_components/AddNewStudent";
import GlobalApi from "@/app/_services/GlobalApi";
import StudentTableList from "./_components/StudentTableList";

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

  const totalStudent = students.length;

  return (
    <div className="p-7">
      <h2 className="flex justify-between items-center font-bold text-2xl ">
        {totalStudent ? "Total " : ""} Students{" "}
        {totalStudent ? totalStudent : ""}
        <AddNewStudent
          onAddStudent={handleAddStudent}
          refreshData={getAllData} // for AddNewStudent component to show the current update after record has been added
        />
      </h2>
      <StudentTableList
        students={students}
        refreshData={getAllData} // for StudentTableList component to show the current update after record has been deleted
      />
    </div>
  );
}

export default Student;
