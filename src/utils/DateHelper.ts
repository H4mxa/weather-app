export const converDateTo12HrFormat = (date: Date): string => {
  let hours = date.getHours();
  const currentHour = new Date().getHours();

  if (currentHour === hours) return "Now";

  const amPM = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${hours} ${amPM}`;
};

export const getDayOfWeek = (date: Date): [string, boolean] => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let today = new Date().getDate() === date.getDate();

  return [days[date.getDay()], today];
};
