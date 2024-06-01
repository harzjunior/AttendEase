import moment from "moment/moment";
import React from "react";

const Footer = () => {
  return (
    <div className="flex md:justify-center flex-col md:flex-row text-center min-w-full p-3 border md:text-right text-[10px] md:text-xs ">
      Copyright © {moment().format("yyy")} ALX-Webstack - Portfolio Project, By
      Haruna B. Jibril.
    </div>
  );
};

export default Footer;
