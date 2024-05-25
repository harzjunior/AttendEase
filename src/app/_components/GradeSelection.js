import { useForm } from "react-hook-form";
import GlobalApi from "../_services/GlobalApi";
import { useEffect, useState } from "react";

// selectedGrade used in Attendance component
function GradeSelection({ selectedGrade }) {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  //let's call our API
  const getAllData = async () => {
    try {
      const gradeResp = await GlobalApi.getAllGrades();

      setGrades(gradeResp.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <select
        className="p-2 border rounded-lg"
        onChange={(e) => selectedGrade(e.target.value)}
      >
        {grades.map((item) => (
          <option key={item.id} value={item.grade}>
            {item.grade}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GradeSelection;
