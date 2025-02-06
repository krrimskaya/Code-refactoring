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
            // Code smell: Too many DOM accesses - need to refactor this block
            // This block checks the type of the field multiple times.
            // We can create a function to handle this logic and reduce duplication.

            // Code smell: Large function responsibility - loadFormData is doing both loading and validating.
            handleFieldLoad(field, savedData[key]); // Extract the logic to a separate function to handle field updates.
          }
        }
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  };

  // Create a separate function to handle field data assignment
  const handleFieldLoad = (field, value) => {
    if (field.type === "checkbox" || field.type === "radio") {
      field.checked = value;
    } else if (field.tagName === "SELECT" || field.tagName === "TEXTAREA" || field.tagName === "INPUT") {
      field.value = value;
    }
  };

  // Save data to localStorage with error handling
  const saveFormData = () => {
    try {
      const formData = {};
      Array.from(form.elements).forEach((field) => {
        if (field.name) {
          // Code smell: Code duplication - saving data for checkboxes and radio buttons is repeated here
          formData[field.name] = handleFieldSave(field); // Extract the logic to a separate function to handle saving.
        }
      });
      localStorage.setItem("formData", JSON.stringify(formData));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  };

  // Create a separate function to handle saving field data
  const handleFieldSave = (field) => {
    if (field.type === "checkbox" || field.type === "radio") {
      return field.checked;
    } else {
      return field.value;
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
