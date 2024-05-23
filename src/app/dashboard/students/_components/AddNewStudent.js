"use client";

import { useEffect, useState } from "react";
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

export function AddNewStudent() {
  const [openDialog, setOpenDialog] = useState(false);
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    GlobalApi.createNewStudent(data).then((resp) => {
      console.log(resp);
      if (resp.data) {
        setOpenDialog(false);
        // toast("New student has been added");
      }
    });
  };

  useEffect(() => {
    getAllGradesLst();
  }, []);

  //let's call our API
  const getAllGradesLst = async () => {
    try {
      const resp = await GlobalApi.getAllGrades();
      setGrades(resp.data);
      console.log(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpenDialog(true)}>+ Add New Student</Button>
      <Dialog open={openDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="py-4">
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-2 space-y-2 ">
              <label>Full Name</label>
              <Input
                placeholder="Rabbit Gate"
                {...register("fullName", { required: true })}
              />
            </div>
            <div className="flex flex-col py-2 space-y-2">
              <label>Select a Grade</label>
              <select
                className="p-3 border rounded-lg"
                {...register("grade", { required: true })}
              >
                {grades.map((item) => (
                  <option key={item.id} value={item.grade}>
                    {item.grade}
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
            </div>
            <div className="py-2 space-y-2">
              <label>Address</label>
              <Input
                placeholder="Anvil apt City Center"
                {...register("address")}
              />
            </div>
            <div className="flex justify-end items-center gap-3 mt-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
