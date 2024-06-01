"use client";

import { useEffect, useState } from "react";
import StudentTableList from "../_components/StudentTableList";
import { useSearchParams } from "next/navigation";

const Searched = () => {
  const [students, setStudents] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const studentsParam = searchParams.get("students");
    if (studentsParam) {
      try {
        const studentsData = JSON.parse(decodeURIComponent(studentsParam));
        setStudents(studentsData);
      } catch (error) {
        console.error("Error parsing students data:", error);
      }
    }
  }, [searchParams]);

  return (
    <div>
      <h1>Searched Student</h1>
      {students.length > 0 ? (
        <StudentTableList students={students} />
      ) : (
        <div>No students to display</div>
      )}
    </div>
  );
};

export default Searched;
