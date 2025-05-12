import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { MdOutlineArrowDropDown } from "react-icons/md";
import Select from "react-select";

export const InputField = ({
  name,
  label,
  type,
  placeholder = "",
  defaultValue,
  required = false,
  inputRef,
  icon,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;
  const { ref, ...rest } = register(name, {
    required: required ? `${label || name} is required` : false,
  });

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-primary"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          type={type}
          placeholder={placeholder || `Enter ${label || name}`}
          defaultValue={defaultValue}
          {...rest}
          ref={(el) => {
            ref(el);
            if (inputRef) inputRef(el);
          }}
          className={`remove-date-icon mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none ${
            icon ? "pr-10" : ""
          }`}
        />
        {icon && icon}
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export const SelectField = ({ name, label, required, options, control }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1 text-primary">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field: { onChange, value, ref } }) => (
        <Select
          inputRef={ref}
          value={options.find((opt) => opt.value === value) || null}
          onChange={(val) => onChange(val ? val.value : "")}
          options={options}
          placeholder={` ${label}...`}
          className="text-sm hide-scrollbar"
          classNamePrefix="react-select"
          isClearable
        />
      )}
    />
  </div>
);
