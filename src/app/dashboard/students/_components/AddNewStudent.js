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
  const [openDialog, isOpenDialog] = useState(false);
  const [grades, setGrades] = useState([]);

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

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
      <Button onClick={() => isOpenDialog(true)}>+ Add New Student</Button>
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
                {...register("example", { required: true })}
              />
            </div>
            <div className="flex flex-col py-2 space-y-2">
              <label>Select a Grade</label>
              <select
                className="p-3 border rounded-lg"
                {...register("grade", { required: true })}
              >
                <option value={"5th"}>5th</option>
                <option value={"6th"}>6th</option>
                <option value={"7th"}>7th</option>
                <option value={"8th"}>8th</option>
                <option value={"9th"}>9th</option>
              </select>
            </div>
            <div className="py-2 space-y-2">
              <label>Phone</label>
              <Input
                type="number"
                placeholder="+234 810 7060 160"
                {...register("phone")}
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
              <Button onClick={() => isOpenDialog(false)} variant="ghost">
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
