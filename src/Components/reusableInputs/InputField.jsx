import React from "react";

function InputField({ type, name, placeholder, formik }) {
  return (
    <>
      <div className="mt-4">
        <label className="mb-2 text-success fw-medium">{name}</label>
        <input
          type={type}
          placeholder={placeholder}
          className={`form-control ${
            formik.touched[name]
              ? formik.errors[name]
                ? "is-invalid"
                : "is-valid"
              : ""
          }`}
          aria-describedby="emailHelp"
          name={name}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>

      {formik.errors[name] && formik.touched[name] && (
        <div className="invalid-feedback d-block">{formik.errors[name]}</div>
      )}
    </>
  );
}

export default InputField;
