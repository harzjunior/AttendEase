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
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";

//onAddStudent from Student component
export function StudentProfile() {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // react hook form
  const {
    register,
    handleSubmit,
    reset, //clears the form
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!data.fullName && !data.phone && !data.address) {
      toast.error("Please provide at least one search criteria.");
      return;
    }

    setLoading(true);
    GlobalApi.searchStudent(data)
      .then((resp) => {
        if (resp.data) {
          setLoading(false);
          //setStudents(resp.data);

          if (resp.data && resp.data.length > 0) {
            // setStudents(resp.data);
            toast.success("Student(s) found");

            // Serialize data to URL parameters
            const encodedStudents = encodeURIComponent(
              JSON.stringify(resp.data)
            );

            // Navigate to the profile page with query parameters
            router.push(
              `/dashboard/students/searched?students=${encodedStudents}`
            );
          } else {
            // setStudents([]); // Clear the student list
            toast.info("No students found");
          }
          reset(); //clear form
          setOpenDialog(false);
        }
      })
      .catch((error) => {
        console.error("Error searching for student:", error);
        toast.error("Failed to find student");
        setLoading(false);
      });
  };

  return (
    <div>
      <Button className="bg-slate-400" onClick={() => setOpenDialog(true)}>
        Find Student
      </Button>
      <Dialog open={openDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="py-4">
            <DialogTitle>Find Student Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-2 space-y-2">
              <label>Full Name</label>
              <Input
                placeholder="Rabbit Gate"
                {...register("fullName", { required: false })}
              />
            </div>
            <div className="py-2 space-y-2">
              <label>Phone</label>
              <Input
                type="tel"
                placeholder="+234 810 7060 160"
                {...register("phone", {
                  required: false,
                  pattern: /^[+]?[0-9\s]*$/,
                })}
              />
            </div>
            <div className="py-2 space-y-2">
              <label>Address</label>
              <Input
                placeholder="Anvil apt City Center"
                {...register("address", { required: false })}
              />
            </div>
            <div className="flex justify-between items-center gap-3 mt-5">
              <Button
                type="button"
                onClick={() => setOpenDialog(false)}
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disable={loading ? loading.toString() : undefined}
              >
                {loading ? <LoaderIcon className="animate-spin" /> : "Search"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
