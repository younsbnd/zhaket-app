import ControlledInput from "@/components/shared/forms/ControlledInput";
import { Button, Form } from "@heroui/react";
import React from "react";

const MenuForm = ({ handleSubmit, errors, onSubmit, control, btnText, isLoading }) => {
  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex flex-col gap-4 w-full md:flex-row">
        {/* name */}
        <ControlledInput
          name={"name"}
          control={control}
          label={"نام منو"}
          rules={{
            required: "نام منو الزامی است",
            minLength: {
              value: 3,
              message: "نام منو باید حداقل 3 کاراکتر باشد",
            },
          }}
          errors={errors}
          variant="bordered"
          color="primary"
          classNames={{
            base: "w-full bg-slate-800 p-2 rounded-md border-0",
            inputWrapper: "w-full bg-slate-800 p-2 rounded-md border-slate-600",
          }}
        />

        {/* slug */}
        <ControlledInput
          name={"slug"}
          control={control}
          label={"شناسه منو"}
          errors={errors}
          rules={{
            required: "شناسه منو الزامی است",
            minLength: {
              value: 3,
              message: "شناسه منو باید حداقل 3 کاراکتر باشد",
            },
            pattern: {
              value: /^[a-z0-9-]+$/,
              message: "شناسه فقط می‌تواند شامل حروف انگلیسی کوچک، اعداد و خط تیره باشد",
            },
          }}
          variant="bordered"
          color="primary"
          classNames={{
            base: "w-full bg-slate-800 p-2 rounded-md border-0",
            inputWrapper: "w-full bg-slate-800 p-2 rounded-md border-slate-600",
          }}
        />
      </div>

      {/* submit button */}
      <Button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-l from-blue-600 to-indigo-700 px-3 py-2 text-white"
        isLoading={isLoading}
      >
        {btnText}
      </Button>
    </Form>
  );
};

export default MenuForm;

