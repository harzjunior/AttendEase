import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { Button } from "@/components/ui/button";
import { Search, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

function StudentTableList({ students }) {
  const [searchInput, setSearchInput] = useState(); // searchInput used in AgGridReact

  // Column ag-grid Definitions: Defines the columns to be displayed.

  // custom button for the column grid
  const CustomBtn = () => {
    return (
      <Button variant="destructive">
        <Trash className="text-white" />
      </Button>
    );
  };

  const [colDefs, setColDefs] = useState([
    { field: "id", filter: true },
    { field: "fullName", filter: true },
    { field: "address", filter: true },
    { field: "phone", filter: true },
    { field: "action", cellRenderer: CustomBtn }, // custom column for actions
  ]);

  // Row ag-grid Data: The data to be displayed.
  const [rowData, setRowData] = useState([]);

  // only refresh the page when there is students data

  useEffect(() => {
    students && setRowData(students);
  }, [students]);

  // react hook form
  const {
    register,
    formState: { errors },
  } = useForm();

  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 25, 50];

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
            placeholder="Search on anything..."
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
