import ControlledSelect from "@/components/shared/forms/ControlledSelect";
import React from "react";

const ProductOrganization = ({ control, errors, productCategories, tags }) => {
  return (
    <>
      <div className="flex flex-col gap-4 w-full md:flex-row">
        {/* category */}
        <ControlledSelect
          name={"category"}
          control={control}
          label={"دسته بندی"}
          rules={{
            required: "دسته بندی الزامی است",
          }}
          errors={errors}
          variant="bordered"
          color="primary"
          options={(productCategories || []).map((category) => ({
            label: category.name,
            value: category._id,
          }))}
          renderValue={(items) => {
            const selectedItem = items[0];
            if (!selectedItem) return null;
            return <span className="text-white">{selectedItem.textValue}</span>;
          }}
          classNames={{
            base: "w-full bg-slate-800 p-2 rounded-md border-0 ",
            trigger: "p-2 rounded-md border-slate-600",
          }}
        />

        {/* status */}
        <ControlledSelect
          name={"status"}
          control={control}
          label={"وضعیت"}
          errors={errors}
          variant="bordered"
          color="primary"
          options={[
            { label: "پیش‌نویس", value: "DRAFT" },
            { label: "منتشر شده", value: "PUBLISHED" },
            { label: "آرشیو شده", value: "ARCHIVED" },
          ]}
          renderValue={(items) => {
            const selectedItem = items[0];
            if (!selectedItem) return null;
            return <span className="text-white">{selectedItem.textValue}</span>;
          }}
          rules={{
            required: "وضعیت الزامی است",
          }}
          classNames={{
            base: "w-full bg-slate-800 p-2 rounded-md border-0 ",
            trigger: "p-2 rounded-md border-slate-600",
          }}
        />
      </div>

      {/* tags */}
      <ControlledSelect
        name={"tags"}
        control={control}
        label={"برچسب‌ها"}
        errors={errors}
        variant="bordered"
        color="primary"
        selectionMode="multiple"
        options={(tags || []).map((tag) => ({
          label: tag.name,
          value: tag._id,
        }))}
        renderValue={(items) => {
          if (items.length === 0) return null;
          return (
            <div className="flex gap-1 flex-wrap">
              {items.map((item) => (
                <span
                  key={item.key}
                  className="text-white text-xs bg-blue-600 px-2 py-1 mt-1.5 rounded"
                >
                  {item.textValue}
                </span>
              ))}
            </div>
          );
        }}
        classNames={{
          base: "w-full bg-slate-800 p-2 rounded-md border-0 ",
          trigger: "p-2 rounded-md border-slate-600",
        }}
      />
    </>
  );
};

export default ProductOrganization;
