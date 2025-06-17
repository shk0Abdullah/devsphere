const firebaseConfig = {
  apiKey: "AIzaSyCvHGJ9pucHkEVEpNMh5ij_IRQTdWUf280",
  authDomain: "devsphere-ed8da.firebaseapp.com",
  projectId: "devsphere-ed8da",
  storageBucket: "devsphere-ed8da.firebasestorage.app",
  messagingSenderId: "356519587631",
  appId: "1:356519587631:web:14e63cc011b59df456fbda",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", function () {
  // Declare variables in proper scope
  let selectedDate = null;
  let selectedCell = null;

  // Get DOM elements
  const bookingForm = document.getElementById("bookingForm");
  const submitButton = document.getElementById("submitButton");
  const selectedDateDisplay = document.getElementById("selectedDateDisplay");
  const bookingPanel = document.getElementById("bookingPanel");

  // Form submission with improved validation
  if (bookingForm) {
    bookingForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Get form elements
      const firstName = document.getElementById("firstName");
      const lastName = document.getElementById("lastName");
      const email = document.getElementById("email");
      const phone = document.getElementById("phone");
      const selectedDateInput = document.getElementById("selectedDate");

      // Validate form inputs
      if (!firstName.value || !lastName.value || !email.value || !phone.value) {
        alert("Please fill in all required fields");
        return;
      }

      // IMPROVED DATE VALIDATION - Check multiple sources
      let dateValue = null;
      let formattedDateValue = null;

      // Method 1: Check selectedDate variable
      if (selectedDate) {
        dateValue = selectedDate;
      }

      // Method 2: Check hidden input field
      if (!dateValue && selectedDateInput && selectedDateInput.value) {
        dateValue = selectedDateInput.value;
      }

      // Method 3: Check display element
      if (
        !dateValue &&
        selectedDateDisplay &&
        selectedDateDisplay.textContent &&
        selectedDateDisplay.textContent !== "Select a date"
      ) {
        formattedDateValue = selectedDateDisplay.textContent;
        dateValue = formattedDateValue; // Use display text as fallback
      }

      // Final validation
      if (!dateValue || dateValue === "Select a date") {
        alert("Please select a date");
        return;
      }

      // Use formatted date if available, otherwise use dateValue
      const finalFormattedDate =
        formattedDateValue || selectedDateDisplay.textContent || dateValue;

      console.log("Date validation passed:", {
        selectedDate: selectedDate,
        dateValue: dateValue,
        inputValue: selectedDateInput
          ? selectedDateInput.value
          : "No input found",
        displayText: selectedDateDisplay
          ? selectedDateDisplay.textContent
          : "No display found",
        finalFormattedDate: finalFormattedDate,
      });

      const formData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phone: phone.value,
        selectedDate: dateValue,
        formattedDate: finalFormattedDate,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };

      if (submitButton) {
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = "Saving...";

        try {
          const docRef = await db.collection("bookings").add(formData);
          console.log("Booking saved with ID: ", docRef.id);

          alert(
            `Booking confirmed!\n\nDate: ${finalFormattedDate}\nName: ${formData.firstName} ${formData.lastName}`
          );

          // Reset form
          bookingForm.reset();
          resetBookingState();
        } catch (error) {
          console.error("Error saving booking: ", error);
          alert("Error submitting booking. Please try again.");
        } finally {
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
          }
        }
      }
    });
  }

  // Helper function to reset booking state
  function resetBookingState() {
    selectedDate = null;

    if (bookingPanel) bookingPanel.classList.add("hidden");
    if (selectedDateDisplay) selectedDateDisplay.textContent = "Select a date";
    if (submitButton) submitButton.disabled = true;

    const selectedDateInput = document.getElementById("selectedDate");
    if (selectedDateInput) selectedDateInput.value = "";

    // Reset calendar selection
    if (selectedCell) {
      selectedCell.classList.remove("bg-primary", "text-white");
      selectedCell.classList.add("hover:bg-gray-100");
      selectedCell = null;
    }
  }

  // Enhanced calendar click handler
  function handleCalendarCellClick(cellElement, dateValue, formattedDate) {
    console.log("Calendar cell clicked:", { dateValue, formattedDate });

    // Remove previous selection
    if (selectedCell) {
      selectedCell.classList.remove("bg-primary", "text-white");
      selectedCell.classList.add("hover:bg-gray-100");
    }

    // Set new selection
    selectedCell = cellElement;
    selectedDate = dateValue;

    // Update UI
    selectedCell.classList.add("bg-primary", "text-white");
    selectedCell.classList.remove("hover:bg-gray-100");

    // Update form elements
    if (selectedDateDisplay) {
      selectedDateDisplay.textContent = formattedDate || dateValue;
    }

    const selectedDateInput = document.getElementById("selectedDate");
    if (selectedDateInput) {
      selectedDateInput.value = dateValue;
    }

    // Enable submit button
    if (submitButton) {
      submitButton.disabled = false;
    }

    console.log("Date selection updated:", {
      selectedDate: selectedDate,
      displayText: selectedDateDisplay
        ? selectedDateDisplay.textContent
        : "No display",
      inputValue: selectedDateInput ? selectedDateInput.value : "No input",
    });
  }

  // Debug function - call this to check current state
  window.debugBookingState = function () {
    console.log("Current booking state:", {
      selectedDate: selectedDate,
      selectedCell: selectedCell,
      displayText: selectedDateDisplay
        ? selectedDateDisplay.textContent
        : "Element not found",
      inputValue: document.getElementById("selectedDate")
        ? document.getElementById("selectedDate").value
        : "Element not found",
      submitButtonDisabled: submitButton
        ? submitButton.disabled
        : "Element not found",
    });
  };

  // Make handleCalendarCellClick available globally so your existing calendar code can use it
  window.handleCalendarCellClick = handleCalendarCellClick;
});
