import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  return (
    // <div className="custom-calendar">
    //   <Calendar
    //     locale="en-US"
    //     minDate={new Date()}
    //     maxDate={new Date(2023, 11, 31)}
    //     view="month"
    //     tileContent={({ date, view }) => view === 'month' && date.getDay() === 0 ? <div>Sunday</div> : null}
    //     onClickDay={(date) => console.log('Clicked date:', date)}
    //     onActiveStartDateChange={({ activeStartDate, view }) => console.log('Active start date changed:', activeStartDate, view)}
    //   />
    // </div>
    <div>
      <input type="date"  />
    </div>
  );
};

export default MyCalendar;
