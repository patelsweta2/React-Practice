import React, { useState, useRef, useEffect } from "react";

const fieldOrder = ["name", "email", "phone"];

const validators = {
  name: (value) => value.trim() !== "" || "Name cannot be empty",
  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Please enter a valid email.",
};

const RefForm = () => {
  const refs = useRef({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    //clear error on change
    if (error[name]) {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };
  const handleKeyDown = (e, currentField) => {
    if (e.key === "Enter") {
      const validator = validators[currentField];
      const value = formData[currentField];
      if (validator) {
        const validationResult = validator(value);
        if (validationResult !== true) {
          setError((prev) => ({ ...prev, [currentField]: validationResult }));
          setTimeout(() => refs.current[currentField]?.focus(), 100);
          return;
        }
      }
      const nextIndex = fieldOrder.indexOf(currentField) + 1;
      const nextField = fieldOrder[nextIndex];
      if (nextField) {
        refs.current[nextField]?.focus();
      } else {
        alert("Form submitted", JSON.stringify(formData, null, 2));
      }
    }
  };

  useEffect(() => {
    refs.current["name"]?.focus();
  }, []);
  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
      <h2>Optimized Accessible Form</h2>
      {fieldOrder.map((field) => (
        <label key={field} style={{ display: "block", marginBottom: "1rem" }}>
          {field.charAt(0).toUpperCase() + field.slice(1)}
          <input
            ref={(el) => (refs.current[field] = el)}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, field)}
            placeholder={`Enter your ${field}`}
            style={{
              display: "block",
              marginTop: "0.25rem",
              width: "100%",
              borderColor: error[field] ? "red" : "#ccc",
            }}
          />
          {error[field] && (
            <span style={{ color: "red", fontSize: "0.9rem" }}>
              {error[field]}
            </span>
          )}
        </label>
      ))}
    </div>
  );
};

export default RefForm;
