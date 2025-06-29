// Wait for DOM to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Calendar functionality
  let currentDate = new Date();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calculate next week's date (7 days from today)
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 1); // Changed from +1 to +7 for next week

  let selectedDate = null;
  let selectedCell = null;

  // Initialize UI elements - FIXED: Handle both desktop and mobile booking buttons
  const desktopBookingButton = document.getElementById("desktopBookingButton");
  const mobileBookingButton = document.getElementById("mobileBookingButton");
  const bookingPanel = document.getElementById("bookingPanel");
  const closeButton = document.getElementById("closeButton");
  const calendarBody = document.getElementById("calendarBody");
  const currentMonthYear = document.getElementById("currentMonthYear");
  const selectedDateDisplay = document.getElementById("selectedDateDisplay");
  const selectedDateInput = document.getElementById("selectedDate");
  const submitButton = document.getElementById("submitButton");
  const bookingForm = document.getElementById("bookingForm");

  // Function to open booking panel
  function openBookingPanel() {
    if (bookingPanel) {
      bookingPanel.classList.remove("hidden");
      generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

      // Close mobile menu if it's open when booking is clicked from mobile
      if (typeof closeMobileMenu === "function") {
        closeMobileMenu();
      }
    }
  }

  // Add event listeners to both booking buttons
  if (desktopBookingButton) {
    desktopBookingButton.addEventListener("click", openBookingPanel);
  }

  if (mobileBookingButton) {
    mobileBookingButton.addEventListener("click", openBookingPanel);
  }

  if (closeButton && bookingPanel) {
    closeButton.addEventListener("click", function () {
      bookingPanel.classList.add("hidden");
    });
  }

  if (bookingPanel) {
    bookingPanel.addEventListener("click", function (e) {
      if (e.target === this) {
        this.classList.add("hidden");
      }
    });
  }

  // Month navigation
  const prevMonthBtn = document.getElementById("prevMonth");
  const nextMonthBtn = document.getElementById("nextMonth");

  if (prevMonthBtn) {
    prevMonthBtn.addEventListener("click", function () {
      currentDate.setMonth(currentDate.getMonth() - 1);
      generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });
  }

  if (nextMonthBtn) {
    nextMonthBtn.addEventListener("click", function () {
      currentDate.setMonth(currentDate.getMonth() + 1);
      generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });
  }

  function generateCalendar(year, month) {
    if (!calendarBody) return;

    calendarBody.innerHTML = "";

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    if (currentMonthYear) {
      currentMonthYear.textContent = new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
      }).format(firstDay);
    }

    let date = 1;
    for (let i = 0; i < 6; i++) {
      if (date > daysInMonth) break;

      const row = document.createElement("tr");

      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td");
        cell.className = "text-center p-2";

        if (i === 0 && j < startingDay) {
          cell.textContent = "";
        } else if (date > daysInMonth) {
          cell.textContent = "";
        } else {
          const currentCellDate = new Date(year, month, date);
          cell.textContent = date;

          if (currentCellDate < nextWeek) {
            cell.classList.add("text-gray-700", "cursor-not-allowed");
          } else {
            cell.classList.add(
              "cursor-pointer",
              "hover:bg-gray-300",
              "rounded"
            );
            cell.addEventListener("click", function () {
              selectDate(currentCellDate, cell);
            });

            if (
              selectedDate &&
              currentCellDate.getTime() === selectedDate.getTime()
            ) {
              cell.classList.add("bg-primary", "text-white");
              selectedCell = cell;
            }
          }

          if (currentCellDate.toDateString() === today.toDateString()) {
            cell.classList.add("font-bold", "text-primary");
          }

          date++;
        }

        row.appendChild(cell);
      }

      calendarBody.appendChild(row);
    }
  }

  function selectDate(date, cell) {
    if (selectedCell) {
      selectedCell.classList.remove("bg-primary", "text-white");
      selectedCell.classList.add("hover:bg-gray-100");
    }

    cell.classList.add("bg-primary", "text-white");
    cell.classList.remove("hover:bg-gray-100");

    selectedDate = date;
    selectedCell = cell;

    if (selectedDateDisplay) {
      selectedDateDisplay.textContent = date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }

    if (selectedDateInput) {
      selectedDateInput.value = date.toISOString();
    }

    if (submitButton) {
      submitButton.disabled = false;
    }
  }
});
