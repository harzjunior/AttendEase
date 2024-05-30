import moment from "moment/moment";
import React from "react";

const Footer = () => {
  return (
    <div className="flex md:justify-center flex-col md:flex-row md:ml-64 text-center min-w-full p-3 fixed bottom-0 md:text-right text-[10px] md:text-xs ">
      Copyright © {moment().format("yyy")} ALX-Webstack - Portfolio Project, By
      Haruna B. Jibril.
    </div>
  );
};

export default Footer;
