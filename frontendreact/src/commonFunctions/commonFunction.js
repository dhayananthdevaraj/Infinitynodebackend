function formatIndianCurrency(value) {
  return value.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
}

function convertTo12HourFormat(time24) {
  const [hours, minutes] = time24.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  const time12 = `${hours12}:${String(minutes).padStart(2, "0")} ${period}`;
  return time12;
}

function isUserLoggedIn() {
  const isLoggedIn = localStorage.getItem("message");
  return isLoggedIn;
}

function getUserRole() {
  const role = localStorage.getItem("role");
  return role;
}

export {
  formatIndianCurrency,
  convertTo12HourFormat,
  isUserLoggedIn,
  getUserRole,
};
