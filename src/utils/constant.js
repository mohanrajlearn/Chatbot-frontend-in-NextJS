import moment from "moment";

export const radiusOptions = [
  { key: 5, title: "5 KM" },
  { key: 10, title: "10 KM" },
  { key: 15, title: "15 KM" },
  { key: 20, title: "20 KM" },
];

export const weekList = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export const timeOptions = [
  "12:00 AM",
  "01:00 AM",
  "02:00 AM",
  "03:00 AM",
  "04:00 AM",
  "05:00 AM",
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
  "10:00 PM",
  "11:00 PM",
];

export function convertTimeStringToDate(timeString) {
  const [time, period] = timeString.split(" ");
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  if (period === "PM" && hours !== 12) {
    date.setHours(date.getHours() + 12);
  }
  let t = moment(date).format();
  return t
}

export function formatTimeFromDate(date) {
  return moment(date).format("hh:mm A");
}

export const members = [
  "0-1",
  "2-5",
  "6-10",
  "11-25",
  "26-50",
  "51-80",
  "80-100",
  "100-500",
  "500+",
];

export const companies = [
  {
    key: "SMALL BUSINESS",
    name: "Small Business",
  },
  {
    key: "STARTUP",
    name: "Startup",
  },

  {
    key: "AGENCY",
    name: "Agency",
  },
  {
    key: "LARGE COMPANY",
    name: "Large Company",
  },
];
