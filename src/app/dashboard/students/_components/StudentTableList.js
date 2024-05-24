import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

function StudentTableList({ students }) {
  // Column ag-grid Definitions: Defines the columns to be displayed.

  /**
   * custom button for the column grid
   */
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
    { field: "phone", filter: true },
    { field: "address", filter: true },
    { field: "action", cellRenderer: CustomBtn }, // custom column for actions
  ]);

  // Row ag-grid Data: The data to be displayed.
  const [rowData, setRowData] = useState([]);

  /**
   * only refresh the page when there is students data
   */

  useEffect(() => {
    students && setRowData(students);
  }, [students]);

  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 25, 50];

  return (
    <div>
      {/* wrapping container with theme & size */}
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 500 }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          pagination={pagination} //pagination with 10 records
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
}

export default StudentTableList;
