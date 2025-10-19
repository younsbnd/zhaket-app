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
  selectionMode = "single",
  ...rest
}) => {
  const error = errors[name];
  const isMultiple = selectionMode === "multiple";

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => {
        // Handle selectedKeys for both single and multiple selection
        const getSelectedKeys = () => {
          if (!field.value) return [];

          if (isMultiple) {
            return Array.isArray(field.value) ? field.value : [];
          } else {
            return [field.value];
          }
        };

        return (
          <Select
            {...rest}
            selectionMode={selectionMode}
            errorMessage={error?.message}
            isInvalid={!!error}
            label={label}
            placeholder={placeholder}
            variant={variant}
            isClearable
            selectedKeys={getSelectedKeys()}
            onSelectionChange={(keys) => {
              const keysArray = Array.from(keys);

              if (isMultiple) {
                field.onChange(keysArray);
              } else {
                field.onChange(keysArray[0] || "");
              }
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
        );
      }}
    />
  );
};

export default ControlledSelect;
