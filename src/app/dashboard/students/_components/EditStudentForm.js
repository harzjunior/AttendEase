// src/app/dashboard/students/_components/EditStudentForm.js

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

function EditStudentForm({ student, onClose, refreshData }) {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: student,
  });

  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = async () => {
    try {
      const courseResp = await GlobalApi.getAllCourses();
      setCourses(courseResp.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const resp = await GlobalApi.editStudentRecord(data);
      if (resp.data.success) {
        toast.success("Student record has been updated");
        onClose();
        refreshData();
        reset();
      }
    } catch (error) {
      console.error("Error updating student record:", error);
      toast.error("Failed to update the record");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="py-4">
          <DialogTitle>Edit Student</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-2 space-y-2">
            <label>Full Name</label>
            <Input
              placeholder="Rabbit Gate"
              {...register("fullName", { required: true })}
            />
            {errors.fullName?.type === "required" && (
              <p role="alert" className="text-red-400">
                Full name is required
              </p>
            )}
          </div>
          <div className="flex flex-col py-2 space-y-2">
            <label>Select a Course</label>
            <select
              className="p-3 border rounded-lg"
              {...register("course", { required: true })}
            >
              {courses.map((item) => (
                <option key={item.id} value={item.course}>
                  {item.course}
                </option>
              ))}
            </select>
          </div>
          <div className="py-2 space-y-2">
            <label>Phone</label>
            <Input
              type="tel"
              placeholder="+234 810 7060 160"
              {...register("phone", {
                required: true,
                pattern: /^[+]?[0-9\s]*$/,
              })}
            />
            {errors.phone?.type === "required" && (
              <p role="alert" className="text-red-400">
                Phone number is required
              </p>
            )}
          </div>
          <div className="py-2 space-y-2">
            <label>Address</label>
            <Input
              placeholder="Anvil apt City Center"
              {...register("address", { required: true })}
            />
            {errors.address?.type === "required" && (
              <p role="alert" className="text-red-400">
                Address is required
              </p>
            )}
          </div>
          <div className="flex justify-end items-center gap-3 mt-5">
            <Button type="button" onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderIcon className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditStudentForm;
