"use client";

import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { Button } from "@/components/ui/button";
import { Search, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";

function StudentTableList({ students, refreshData }) {
  const [searchInput, setSearchInput] = useState(""); // searchInput used in AgGridReact

  //handleDelete record
  const handleDelete = (id) => {
    GlobalApi.deleteStudentRecord(id)
      .then((resp) => {
        if (resp.data && resp.data.success) {
          toast.warning("Record Successfully Deleted");
          refreshData(); // call this function by props from Student component
        }
      })
      .catch((error) => {
        console.error("Error deleting student record:", error);
        toast.warning("Failed to delete the record");
      });
  };

  // custom button for the column grid and other component from shadCn/ui
  const CustomBtn = (props) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="destructive">
            <Trash className="text-white" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-500">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              record and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(props?.data?.id)}
              className="hover:bg-red-500"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  // Column ag-grid Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "id", width: 105, filter: true },
    { field: "fullName", filter: true },
    { field: "address", width: 300, filter: true },
    { field: "phone", filter: true },
    { field: "action", width: 90, cellRenderer: CustomBtn }, // custom column for actions
  ]);

  // Row ag-grid Data: The data to be displayed.
  const [rowData, setRowData] = useState([]);

  // only refresh the page when there is students data
  useEffect(() => {
    if (students) {
      setRowData(students);
    }
  }, [students]);

  // react hook form
  const {
    formState: { errors },
  } = useForm();

  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 25, 50,100,250,500];

  return (
    <div className="my-7">
      {/* wrapping container with theme & size */}
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 500 }} // the grid will fill the size of the parent container
      >
        <div className="flex items-center gap-2 mb-4 p-2 rounded-lg border shadow-sm max-w-sm">
          <Search />
          <input
            className="outline-none w-full"
            type="text"
            placeholder="Search on record..."
            onChange={(e) => {
              setSearchInput(e.target.value); //used in AgGridReact component
            }}
          />
        </div>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          quickFilterText={searchInput}
          pagination={pagination} //pagination with 10 records
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
}

export default StudentTableList;
