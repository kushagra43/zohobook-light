document.querySelector("#myForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Collect form data
  let formData = new FormData(this);

  const number = formData.get("mobilephone");

  var expr = /^(0|91)?[6-9][0-9]{9}$/;
  if (!expr.test(number)) {
    document.querySelector("#mobileError").innerHTML =
      "Please enter a valid 10 digit mobile number";
    document.querySelector("#mobileError").style.color = "red";
    document.querySelector("#mobileError").style.display = "block";
    return;
  }

  // Send post request to the server
  fetch(
    "https://forms.hubspot.com/uploads/form/v2/23736002/688d8b8a-37c8-4bf1-bd94-9e2e31d4c0d8",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        // Show success message
        document.querySelector("#thankYou").innerHTML =
          "Thank you for submitting the form!";
        document.querySelector("#thankYou").style.color = "green";
        document.querySelector("#thankYou").style.display = "block";
      } else {
        // Show error message
        document.querySelector("#thankYou").innerHTML =
          "An error occurred while submitting the form. Please try again later.";
        document.querySelector("#thankYou").style.color = "red";
        document.querySelector("#thankYou").style.display = "block";
      }

      // Remove form
      this.remove();
    })
    .catch((error) => {
      console.error(error);
      // Show error message
      document.querySelector("#thankYou").innerHTML =
        "Something went wrong, please try again later.";
      document.querySelector("#thankYou").style.color = "red";
      document.querySelector("#thankYou").style.display = "block";
      // Remove form
      this.remove();
    });
});

// Tabs
function openTab(evt, tabName) {
  // Get all elements with class "tab" and hide them
  const tabs = document.getElementsByClassName("tab");
  for (const tab of tabs) {
    tab.style.display = "none";
  }

  // Remove the "activeTab" class from all tab buttons
  const tabButtons = document.getElementsByClassName("tab-button");
  for (const button of tabButtons) {
    button.classList.remove("activeTabButton");
  }

  // Show the selected tab, add the "activeTab" class to the button,
  // and add the "activeTabButton" class to style the active button
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("activeTab", "activeTabButton");
}

// By default, show the first tab
document.getElementById("tab1").style.display = "block";
document
  .querySelector(".tab-button")
  .classList.add("activeTab", "activeTabButton");
