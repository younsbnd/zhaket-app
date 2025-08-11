import { Switch } from "@heroui/react";
import React from "react";
import { Controller } from "react-hook-form";

// ControlledSwitch is a component that wraps the Switch component from heroui and uses the Controller component from react-hook-form to control the switch

const ControlledSwitch = ({
  name,
  control,
  label,
  rules,
  errors,
  size = "md",
  variant = "bordered",
  color = "success",
  ...rest
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value, ref, ...field } }) => (
        <Switch
          {...field}
          {...rest}
          label={label}
          variant={variant}
          size={size}
          color={color}
          ref={ref}
          isSelected={value}
          onValueChange={onChange}
        >
          {label}
        </Switch>
      )}
    />
  );
};

export default ControlledSwitch;
