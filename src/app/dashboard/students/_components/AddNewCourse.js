"use client";

import { useState } from "react";
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
import { LoaderIcon, Plus } from "lucide-react";

//onAddCourse from Student component
export function AddNewCourse({ refreshData }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  // react hook form
  const {
    register,
    handleSubmit,
    reset, //clears the form
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    GlobalApi.createNewCourse(data)
      .then((resp) => {
        if (resp.data) {
          setLoading(false);
          setOpenDialog(false);
          toast.success("New course has been added");
          refreshData();
          reset(); //clear form
        }
      })
      .catch((error) => {
        console.error("Error creating new course:", error);
      });
  };

  return (
    <div>
      <Button onClick={() => setOpenDialog(true)}>
        <Plus /> Add New Course
      </Button>
      <Dialog open={openDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="py-4">
            <DialogTitle>Add New Course</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-2 space-y-2 ">
              <label>Course</label>
              <Input
                placeholder="Pascal"
                {...register("course", { required: true })}
              />
              {errors.course?.type === "required" && (
                <p role="alert" className="text-red-400 ">
                  Course is required
                </p>
              )}
            </div>
            <div className="py-2 space-y-2">
              <label>Student ID</label>
              <Input
                placeholder="21"
                {...register("id", {
                  required: true,
                })}
              />
              {errors.id?.type === "required" && (
                <p role="alert" className="text-red-400 ">
                  Student ID is required
                </p>
              )}
            </div>
            <div className="flex justify-end items-center gap-3 mt-5">
              <Button
                type="button"
                onClick={() => setOpenDialog(false)}
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                // disable={loading}
                disable={loading ? loading.toString() : undefined}
              >
                {loading ? <LoaderIcon className="animate-spin" /> : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
