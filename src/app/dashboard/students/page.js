import { AddNewStudent } from "./_components/AddNewStudent";

function page() {
  return (
    <div className="p-7">
      <h2 className="flex justify-between items-center font-bold text-2xl ">
        Students
        <AddNewStudent />
      </h2>
    </div>
  );
}

export default page;
