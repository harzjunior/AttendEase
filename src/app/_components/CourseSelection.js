import { useForm } from "react-hook-form";
import GlobalApi from "../_services/GlobalApi";
import { useEffect, useState } from "react";

// selectedCourse used in Attendance component
function CourseSelection({ selectedCourse }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  //let's call our API
  const getAllData = async () => {
    try {
      const courseResp = await GlobalApi.getAllCourses();

      setCourses(courseResp.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <select
        className="p-2 border rounded-lg"
        onChange={(e) => selectedCourse(e.target.value)}
      >
        {courses.map((item) => (
          <option key={item.id} value={item.course}>
            {item.course}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CourseSelection;
