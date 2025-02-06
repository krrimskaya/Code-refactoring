document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");

  // Load saved data from localStorage with error handling
  const loadFormData = () => {
    try {
      const savedData = JSON.parse(localStorage.getItem("formData"));
      if (savedData) {
        for (const key in savedData) {
          const field = form.elements[key];
          if (field) {
            if (field.type === "checkbox" || field.type === "radio") {
              field.checked = savedData[key];
            } else if (field.tagName === "SELECT" || field.tagName === "TEXTAREA" || field.tagName === "INPUT") {
              field.value = savedData[key];
            }
          }
        }
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  };

  // Save data to localStorage with error handling
  const saveFormData = () => {
    try {
      const formData = {};
      Array.from(form.elements).forEach((field) => {
        if (field.name) {
          if (field.type === "checkbox" || field.type === "radio") {
            formData[field.name] = field.checked;
          } else {
            formData[field.name] = field.value;
          }
        }
      });
      localStorage.setItem("formData", JSON.stringify(formData));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  };

  // Clear form data and localStorage
  document.getElementById("clearForm").addEventListener("click", () => {
    form.reset();
    try {
      localStorage.removeItem("formData");
    } catch (error) {
      console.error("Error clearing data from localStorage:", error);
    }
  });

  // Save form data on input event
  form.addEventListener("input", saveFormData);

  // Load form data when page loads
  loadFormData();
});
