"use client";

import React from "react";
import { useFieldArray } from "react-hook-form";
import { Button } from "@heroui/react";
import ControlledInput from "@/components/shared/forms/ControlledInput";
import { FiPlus, FiTrash2 } from "react-icons/fi";

const inputClassNames = {
  base: "w-full bg-slate-800 p-2 rounded-md border-0",
  inputWrapper: "w-full bg-slate-800 p-2 rounded-md border-slate-600",
};

/**
 * Level 3 Children Manager (deepest level)
 */
const Level3ChildrenManager = ({ control, errors, parentIndex, level2Index }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `children.${parentIndex}.children.${level2Index}.children`,
  });

  const addChild = () => {
    append({
      name: "",
      path: "",
      icon: "",
    });
  };

  if (fields.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 pt-3 border-t border-slate-700 space-y-2">
      <div className="flex items-center justify-between mb-2">
        <h5 className="text-xs font-medium text-slate-400">زیرمنوهای سطح 3</h5>
        <Button
          type="button"
          onClick={addChild}
          size="sm"
          variant="flat"
          className="bg-slate-700 text-white text-xs h-6"
          startContent={<FiPlus size={12} />}
        >
          افزودن
        </Button>
      </div>
      {fields.map((field, index) => {
        // Get the reverse index for display numbering
        const displayIndex = fields.length - index;
        return (
        <div
          key={field.id}
          className="bg-slate-800/50 rounded-md p-2 space-y-2 border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">سطح 3 - #{displayIndex}</span>
            <Button
              type="button"
              onClick={() => remove(index)}
              size="sm"
              variant="light"
              color="danger"
              isIconOnly
              className="min-w-6 h-6"
            >
              <FiTrash2 size={12} />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <ControlledInput
              name={`children.${parentIndex}.children.${level2Index}.children.${index}.name`}
              control={control}
              label="نام"
              rules={{
                required: "نام الزامی است",
                minLength: { value: 2, message: "حداقل 2 کاراکتر" },
              }}
              errors={errors}
              variant="bordered"
              color="primary"
              classNames={{
                base: "w-full bg-slate-900 p-1.5 rounded-md border-0 text-xs",
                inputWrapper: "w-full bg-slate-900 p-1.5 rounded-md border-slate-600",
              }}
            />
            <ControlledInput
              name={`children.${parentIndex}.children.${level2Index}.children.${index}.path`}
              control={control}
              label="مسیر"
              rules={{ required: "مسیر الزامی است" }}
              errors={errors}
              variant="bordered"
              color="primary"
              classNames={{
                base: "w-full bg-slate-900 p-1.5 rounded-md border-0 text-xs",
                inputWrapper: "w-full bg-slate-900 p-1.5 rounded-md border-slate-600",
              }}
            />
          </div>
          <ControlledInput
            name={`children.${parentIndex}.children.${level2Index}.children.${index}.icon`}
            control={control}
            label="آیکون (اختیاری)"
            errors={errors}
            variant="bordered"
            color="primary"
            classNames={{
              base: "w-full bg-slate-900 p-1.5 rounded-md border-0 text-xs",
              inputWrapper: "w-full bg-slate-900 p-1.5 rounded-md border-slate-600",
            }}
          />
        </div>
        );
      }).reverse()}
    </div>
  );
};

/**
 * Level 2 Children Manager
 */
const Level2ChildrenManager = ({ control, errors, parentIndex }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `children.${parentIndex}.children`,
  });

  const addChild = () => {
    append({
      name: "",
      path: "",
      icon: "",
      children: [],
    });
  };

  if (fields.length === 0) {
    return (
      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-slate-300">زیرمنوهای سطح 2 (اختیاری)</h4>
          <Button
            type="button"
            onClick={addChild}
            size="sm"
            variant="flat"
            className="bg-slate-700 text-white text-xs"
            startContent={<FiPlus size={14} />}
          >
            افزودن
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 pt-4 border-t border-slate-700 space-y-3">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-slate-300">زیرمنوهای سطح 2</h4>
        <Button
          type="button"
          onClick={addChild}
          size="sm"
          variant="flat"
          className="bg-slate-700 text-white text-xs"
          startContent={<FiPlus size={14} />}
        >
          افزودن
        </Button>
      </div>
      {fields.map((field, index) => {
        // Get the reverse index for display numbering
        const displayIndex = fields.length - index;
        return (
        <div
          key={field.id}
          className="bg-slate-800/50 rounded-md p-3 space-y-2 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">سطح 2 - #{displayIndex}</span>
            <Button
              type="button"
              onClick={() => remove(index)}
              size="sm"
              variant="light"
              color="danger"
              isIconOnly
              className="min-w-6 h-6"
            >
              <FiTrash2 size={12} />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <ControlledInput
              name={`children.${parentIndex}.children.${index}.name`}
              control={control}
              label="نام"
              rules={{
                required: "نام الزامی است",
                minLength: { value: 2, message: "حداقل 2 کاراکتر" },
              }}
              errors={errors}
              variant="bordered"
              color="primary"
              classNames={{
                base: "w-full bg-slate-900 p-1.5 rounded-md border-0 text-xs",
                inputWrapper: "w-full bg-slate-900 p-1.5 rounded-md border-slate-600",
              }}
            />
            <ControlledInput
              name={`children.${parentIndex}.children.${index}.path`}
              control={control}
              label="مسیر"
              rules={{ required: "مسیر الزامی است" }}
              errors={errors}
              variant="bordered"
              color="primary"
              classNames={{
                base: "w-full bg-slate-900 p-1.5 rounded-md border-0 text-xs",
                inputWrapper: "w-full bg-slate-900 p-1.5 rounded-md border-slate-600",
              }}
            />
          </div>
          <ControlledInput
            name={`children.${parentIndex}.children.${index}.icon`}
            control={control}
            label="آیکون (اختیاری)"
            errors={errors}
            variant="bordered"
            color="primary"
            classNames={{
              base: "w-full bg-slate-900 p-1.5 rounded-md border-0 text-xs",
              inputWrapper: "w-full bg-slate-900 p-1.5 rounded-md border-slate-600",
            }}
          />
          
          {/* Level 3 children */}
          <Level3ChildrenManager
            control={control}
            errors={errors}
            parentIndex={parentIndex}
            level2Index={index}
          />
        </div>
        );
      })}
    </div>
  );
};

/**
 * Main Children Manager (Level 1)
 */
const ChildrenManager = ({ control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "children",
  });

  const addChild = () => {
    append({
      name: "",
      path: "",
      icon: "",
      children: [],
    });
  };

  if (fields.length === 0) {
    return (
      <div className="mt-6 p-4 border border-dashed border-slate-700 rounded-md text-center">
        <p className="text-slate-400 mb-3 text-sm">هیچ زیرمنویی اضافه نشده است.</p>
        <Button
          type="button"
          onClick={addChild}
          size="sm"
          variant="flat"
          className="bg-blue-600 text-white text-sm"
          startContent={<FiPlus size={16} />}
        >
          افزودن زیرمنو سطح 1
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">زیرمنوها (سطح 1)</h3>
        <Button
          type="button"
          onClick={addChild}
          size="sm"
          variant="flat"
          className="bg-blue-600 text-white text-sm"
          startContent={<FiPlus size={16} />}
        >
          افزودن زیرمنو سطح 1
        </Button>
      </div>
      <div className={`space-y-6 ${fields.length > 3 ? 'max-h-[600px] overflow-y-auto pr-2' : ''}`}>
      {fields.map((field, index) => {
        // Display index for numbering (normal order)
        const displayIndex = index + 1;
        return (
        <div
          key={field.id}
          className="bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-md relative"
        >
          <h4 className="text-md font-bold text-white mb-4">زیرمنو 1.{displayIndex}</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ControlledInput
              name={`children.${index}.name`}
              control={control}
              label="نام زیرمنو"
              rules={{
                required: "نام زیرمنو الزامی است",
                minLength: { value: 2, message: "حداقل 2 کاراکتر" },
              }}
              errors={errors}
              variant="bordered"
              color="primary"
              classNames={inputClassNames}
            />
            <ControlledInput
              name={`children.${index}.path`}
              control={control}
              label="مسیر زیرمنو"
              rules={{ required: "مسیر زیرمنو الزامی است" }}
              errors={errors}
              variant="bordered"
              color="primary"
              classNames={inputClassNames}
            />
          </div>
          
          <div className="mt-4">
            <ControlledInput
              name={`children.${index}.icon`}
              control={control}
              label="آیکون زیرمنو (اختیاری)"
              errors={errors}
              variant="bordered"
              color="primary"
              classNames={inputClassNames}
            />
          </div>

          {/* Level 2 children */}
          <Level2ChildrenManager
            control={control}
            errors={errors}
            parentIndex={index}
          />

          <Button
            type="button"
            onClick={() => remove(index)}
            size="sm"
            variant="flat"
            color="danger"
            className="absolute top-2 left-2 text-xs"
            isIconOnly
          >
            <FiTrash2 size={14} />
          </Button>
        </div>
        );
      })}
      </div>
    </div>
  );
};

export default ChildrenManager;
