"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import { addMonths } from "date-fns";
import moment from "moment/moment";
import { Calendar } from "@/components/ui/calendar";

// selectedMonth prop used in Attendance component
function MonthSelection({ selectedMonth }) {
  const today = new Date();
  const nextMonth = addMonths(new Date(), 0); //current new date and month (0). also used moment to format date to own specifics
  const [month, setMonth] = useState(nextMonth);

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 text-slate-500 "
          >
            <CalendarDays className="size-5" />
            {moment(month).format("MMM yyy")}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            month={month}
            onMonthChange={(value) => {
              selectedMonth(value);
              setMonth(value);
            }} //setMonth to the value provided by the month change
            className="flex justify-center flex-1"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default MonthSelection;
