import React from "react";

function Card({ icon, title, value }) {
  return (
    <div className="flex items-center gap-5 bg-slate-100 shadow-sm rounded-lg p-7">
      <div className="p-2 size-10 bg-white text-primary shadow-sm rounded-full">
        {icon}
      </div>
      <div className="">
        <h2 className="font-bold">{title}</h2>
        <h2 className="text-lg">{value}</h2>
      </div>
    </div>
  );
}

export default Card;
