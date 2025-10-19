"use client";

import { Textarea } from "@heroui/react";
import React from "react";
import { Controller } from "react-hook-form";

// ControlledTextarea is a component that wraps the Textarea component from heroui and uses the Controller component from react-hook-form to control the textarea
const ControlledTextarea = ({
  name,
  control,
  label,
  placeholder,
  rules,
  errors,
  variant = "bordered",
  rows: minRows,
  ...rest
}) => {
  const error = errors[name];
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <Textarea
          {...field}
          {...rest}
          errorMessage={error?.message}
          isInvalid={!!error}
          label={label}
          placeholder={placeholder}
          minRows={minRows}
          variant={variant}
        />
      )}
    />
  );
};

export default ControlledTextarea;
