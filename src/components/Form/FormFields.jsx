import React from "react";
import { useFormContext } from "react-hook-form";
import { MdOutlineArrowDropDown } from "react-icons/md";

export const InputField = ({
  name,
  label,
  type,
  placeholder = "",
  defaultValue,
  required = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        id={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder || `Enter ${label || name}`}
        {...register(name, {
          required: required ? `${label || name} is required` : false,
        })}
        className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
      />

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export const SelectField = ({
  name,
  label,
  options = [],
  required = false,
  placeholder = "Select an option",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  return (
    <div className="mb-4 relative">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <select
        id={name}
        {...register(name, {
          required: required ? `${label || name} is required` : false,
        })}
        defaultValue=""
        className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};
