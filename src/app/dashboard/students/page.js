"use client";

import { useEffect, useState } from "react";
import { AddNewStudent } from "./_components/AddNewStudent";
import GlobalApi from "@/app/_services/GlobalApi";

function Student() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  //let's call our API
  const getAllData = async () => {
    try {
      const studentResp = await GlobalApi.getAllStudents();

      setStudents(studentResp.data);

      console.log(studentResp.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-7">
      <h2 className="flex justify-between items-center font-bold text-2xl ">
        Students
        <AddNewStudent />
      </h2>
      {students.map((student) => (
        <>
          <div className="flex justify-between items-center">
            <ul>
              <li>{student.fullName}</li>
            </ul>
            <ul>
              <li>{student.grade}</li>
            </ul>
            <ul>
              <li>{student.phone}</li>
            </ul>
            <ul>
              <li>{student.address}</li>
            </ul>
          </div>
        </>
      ))}
    </div>
  );
}

export default Student;
