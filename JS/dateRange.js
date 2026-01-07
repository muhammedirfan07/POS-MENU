const dateBtn = document.getElementById("dateBtn");
const calendarBox = document.getElementById("calendarBox");
const applyBtn = document.getElementById("applyDate");
const dateText = document.getElementById("dateText");

const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");

// Toggle calendar
dateBtn.addEventListener("click", () => {
  calendarBox.classList.toggle("hidden");
});

// Apply date range
applyBtn.addEventListener("click", () => {
  const start = startDateInput.value;
  const end = endDateInput.value;

  if (!start || !end) {
    alert("Please select both dates");
    return;
  }
  if( start > end){
    alert ( "invalied date entry .")
    return
  }

  dateText.textContent = formatDate(start) + " - " + formatDate(end);
  calendarBox.classList.add("hidden");

  console.log("A new date selection was made:", start, "to", end);
});

// // Close  outside
document.addEventListener("click", (e) => {
  if (!dateBtn.contains(e.target) && !calendarBox.contains(e.target)) {
    calendarBox.classList.add("hidden");
  }
});

// Format Y
function formatDate(date) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}
