// utils.js

// Convert local date and time to UTC
export const formatDateTimeToUTC = (dateString) => {
    const date = new Date(dateString);
    const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return utcDate.toISOString();
  };
  
  // Convert UTC date and time to local Indian time
  export const formatDateTimeToIndianTime = (dateString) => {
    const date = new Date(dateString);
    const indianTime = new Date(date.getTime());
    return indianTime;
  };
  