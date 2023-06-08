// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.
$(document).ready(function () {
  // Displays current day
  $("#currentDay").text(dayjs().format("MMMM, D, YYYY"));

  // Get the current hour using Day.js
  var currentHour = dayjs().hour();

  // Iterate over each time block
  $(".time-block").each(function () {
    // Get the hour from the id attribute
    var blockHour = parseInt($(this).attr("id").split("-")[1]);

    // Check if the block hour is in the past, present, or future
    if (blockHour < currentHour) {
      // Add the "past" class if the block hour is in the past
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      // Add the "present" class if the block hour is the current hour
      $(this).addClass("present");
    } else {
      // Add the "future" class if the block hour is in the future
      $(this).addClass("future");
    }

    // Retrieve the saved user input from localStorage
    var savedInput = localStorage.getItem("hour-" + blockHour);

    // Set the value of the textarea element to the saved input
    $(this).find(".description").val(savedInput);
  });

  // Event listener for the save buttons
  $(".saveBtn").on("click", function () {
    // Get the block hour from the parent element
    var blockHour = $(this).parent().attr("id").split("-")[1];

    // Get the user input from the textarea element
    var userInput = $(this).siblings(".description").val();

    // Save the user input to localStorage
    localStorage.setItem("hour-" + blockHour, userInput);
  });
});
