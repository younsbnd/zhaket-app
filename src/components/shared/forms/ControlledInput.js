"use client";

import { Input } from "@heroui/react";
import { Controller } from "react-hook-form";

// ControlledInput is a component that wraps the Input component from heroui and uses the Controller component from react-hook-form to control the input
const ControlledInput = ({
  name,
  control,
  label,
  placeholder,
  rules,
  errors,
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
        <Input
          {...field}
          {...rest}
          errorMessage={error?.message}
          isInvalid={!!error}
          label={label}
          placeholder={placeholder}
          variant={variant}
        />
      )}
    />
  );
};

export default ControlledInput;
