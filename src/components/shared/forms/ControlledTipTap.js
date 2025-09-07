"use client";

import React from "react";
import { Controller } from "react-hook-form";
import TiptapEditor from "../tiptapeditor/TipTap";

// ControlledTipTap is a component that wraps the TipTap editor and uses the Controller component from react-hook-form to control the editor
const ControlledTipTap = ({
  name,
  control,
  label,
  rules,
  errors,
  editable = true,
  className = "",
  linkOptions = {},
  ...rest
}) => {
  const error = errors[name];
  
  return (
    <div className="w-full bg-slate-800 p-2 rounded-md">
      {label && (
        <label className="mb-2 block text-sm font-medium text-slate-100">
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange, onBlur } }) => (
          <div>
            <TiptapEditor
              value={value || ""}
              onChangeHtml={onChange}
              editable={editable}
              className={`w-full ${className}`}
              linkOptions={linkOptions}
              menuTitle={label || "توضیحات"}
              {...rest}
            />
            {error && (
              <p className="mt-1 text-sm text-red-400">
                {error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default ControlledTipTap;
