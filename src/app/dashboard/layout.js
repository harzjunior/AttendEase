import React from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

function layout({ children }) {
  return (
    <div className="flex flex-col justify-between ">
      <div className="md:w-64 fixed hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <Header />
        {children}
      </div>
      <div className="md:ml-64 mt-5">
        <Footer />
      </div>
    </div>
  );
}

export default layout;
