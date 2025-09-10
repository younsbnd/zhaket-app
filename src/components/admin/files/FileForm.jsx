import ControlledInput from "@/components/shared/forms/ControlledInput";
import ControlledSelect from "@/components/shared/forms/ControlledSelect";
import ControlledTextarea from "@/components/shared/forms/ControlledTextarea";
import { Button, Form, Input } from "@heroui/react";
import React, { useState } from "react";

const FileForm = ({
  products = [],
  onFileUpload,
  isUploading,
  control,
  errors,
  btnText,
  isEditMode = false,
  fileInfo,
  handleSubmit,
  onSubmit,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);

  // prepare products options
  const productOptions = products.map((product) => ({
    value: product._id,
    label: product.title,
  }));

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // Handle form submission with selectedFile
  const handleFormSubmit = (data) => {
    onSubmit(data, selectedFile);
  };

  return (
    <Form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full space-y-4"
    >
      {/* product selection */}
      <ControlledSelect
        name={"product"}
        control={control}
        label={"محصول"}
        rules={{
          required: "انتخاب محصول الزامی است",
        }}
        errors={errors}
        options={productOptions}
        variant="bordered"
        color="primary"
        classNames={{
          base: "w-full bg-slate-800 p-2 rounded-md border-0",
          trigger: "w-full bg-slate-800 p-2 rounded-md border-slate-600",
        }}
        renderValue={(items) => {
          const selectedItem = items[0];
          if (!selectedItem) return null;
          return <span className="text-white">{selectedItem.textValue}</span>;
        }}
      />

      {/* show the current file info in edit mode */}
      {isEditMode && fileInfo && (
        <div className="bg-slate-700 p-4 rounded-lg">
          <h3 className="text-white mb-2">فایل فعلی:</h3>
          <div className="text-sm text-gray-300 space-y-1">
            <p>نام فایل: {fileInfo.fileName}</p>
            <p>حجم: {(fileInfo.fileSize / 1024).toFixed(2)} KB</p>
            <p>نوع: {fileInfo.fileType.split("/")[1]}</p>
            <p>مسیر: {fileInfo.filePath}</p>
          </div>
        </div>
      )}

      {/* file upload - for both modes */}
      <div className="flex flex-col gap-4 w-full">
        <Input
          type="file"
          label={isEditMode ? "انتخاب فایل جدید (اختیاری)" : "انتخاب فایل"}
          onChange={handleFileChange}
          variant="bordered"
          color="primary"
          classNames={{
            base: "w-full bg-slate-800 p-2 rounded-md border-0",
            inputWrapper: "w-full bg-slate-800 p-2 rounded-md border-slate-600",
          }}
        />
        {selectedFile && (
          <div className="text-sm text-gray-400">
            <p>فایل جدید:</p>
            <p>نام فایل: {selectedFile.name}</p>
            <p>حجم: {(selectedFile.size / 1024).toFixed(2)} KB</p>
            <p>نوع: {selectedFile.type}</p>
          </div>
        )}
      </div>

      {/* version */}
      <ControlledInput
        name={"version"}
        control={control}
        label={"نسخه"}
        type="number"
        rules={{ required: "نسخه الزامی است" }}
        errors={errors}
        variant="bordered"
        color="primary"
        classNames={{
          base: "w-full bg-slate-800 p-2 rounded-md border-0",
          inputWrapper: "w-full bg-slate-800 p-2 rounded-md border-slate-600",
        }}
      />

      {/* release notes */}
      <ControlledTextarea
        name={"releaseNotes"}
        control={control}
        label={"یادداشت‌های انتشار"}
        errors={errors}
        variant="bordered"
        color="primary"
        classNames={{
          base: "w-full bg-slate-800 p-2 rounded-md border-0",
          inputWrapper: "w-full bg-slate-800 p-2 rounded-md border-slate-600",
        }}
      />

      {/* submit button */}
      <Button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-l from-blue-600 to-indigo-700 px-3 py-2 text-white"
        isLoading={isUploading}
        isDisabled={!isEditMode && !selectedFile}
      >
        {btnText}
      </Button>
    </Form>
  );
};

export default FileForm;
