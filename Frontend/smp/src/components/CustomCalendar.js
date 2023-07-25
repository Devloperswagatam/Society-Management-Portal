import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css"

const CustomCalendar = ({ selected, onChange }) => {
    const timeIntervals = 60;
    const filterPassedTime = (time) => {
        const minutes = time.getMinutes();
        return minutes % timeIntervals === 0;
      };
  return (
    <div className="custom-calendar-container">
      {/* <h2>Select a Date and Time</h2> */}
      <DatePicker
        selected={selected}
        onChange={(date) => onChange(date)} // Pass the onChange event to the parent
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={timeIntervals}
        dateFormat="MMMM d, yyyy h:mm aa"
        filterTime={filterPassedTime}
        timeZone="Asia/Kolkata"
        placeholderText="dd/mm/yyyy"
      />
    </div>
  );
};

export default CustomCalendar;
