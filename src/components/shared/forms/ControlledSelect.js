"use client";

import { Select, SelectItem } from "@heroui/react";
import React from "react";
import { Controller } from "react-hook-form";

// ControlledSelect is a component that wraps the Select component from heroui and uses the Controller component from react-hook-form to control the select

const ControlledSelect = ({
  name,
  control,
  label,
  placeholder,
  rules,
  errors,
  options,
  variant = "bordered",
  ...rest
}) => {
  const error = errors[name];
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <Select
          {...field}
          {...rest}
          errorMessage={error?.message}
          isInvalid={!!error}
          label={label}
          placeholder={placeholder}
          variant={variant}
          isClearable
          selectedKeys={field.value ? [field.value] : []}
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys)[0];
            field.onChange(selectedKey);
          }}
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              textValue={option.label}
            >
              {option.label}
            </SelectItem>
          ))}
        </Select>
      )}
    />
  );
};

export default ControlledSelect;
