import React, { useState } from "react";
import { Alert, Button } from "@heroui/react";
import { addToast } from "@heroui/react";
import { FiUpload, FiFolder, FiFile } from "react-icons/fi";
import ControlledInput from "@/components/shared/forms/ControlledInput";
import { useForm } from "react-hook-form";

const UploadFile = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      folder: "products",
      customFilename: "",
    },
  });

  // handle submit
  const onSubmit = async (data) => {
    if (!file) {
      setError("لطفاً یک فایل را انتخاب کنید.");
      return;
    }
    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", data.folder);
    formData.append("customFilename", data.customFilename);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "خطا در آپلود");
      
      addToast({
        title: "موفقیت",
        description: "تصویر با موفقیت آپلود شد.",
        color: "success",
      });
      
      // Reset form and file
      reset();
      setFile(null);
      onUploadSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // return the upload file component
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* File input */}
        <div>
          <label className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
            <FiFile className="text-blue-400" />
            انتخاب فایل
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-slate-300 
                file:mr-4 file:py-2 file:px-4 
                file:rounded-lg file:border-0 
                file:text-sm file:font-semibold 
                file:bg-gradient-to-l file:from-blue-600 file:to-indigo-700 
                file:text-white file:cursor-pointer
                hover:file:from-blue-700 hover:file:to-indigo-800
                file:transition-all file:duration-300
                bg-slate-800/50 border border-slate-600 rounded-lg 
                px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            {file && (
              <div className="mt-2 text-sm text-slate-400 flex items-center gap-2">
                <FiFile className="text-green-400" />
                فایل انتخاب شده: {file.name}
              </div>
            )}
          </div>
        </div>

        {/* Form inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* folder input */}
          <ControlledInput
            name="folder"
            control={control}
            label="نام پوشه (مثال: products, categories)"
            rules={{
              required: "نام پوشه الزامی است",
              minLength: {
                value: 2,
                message: "نام پوشه باید حداقل 2 کاراکتر باشد",
              },
            }}
            errors={errors}
            variant="bordered"
            color="primary"
            classNames={{
              base: "w-full",
              inputWrapper: "bg-slate-800/50 border-slate-600 hover:border-slate-500",
              input: "text-slate-100 placeholder:text-slate-400",
              label: "text-slate-300",
            }}
          />

          {/* custom filename input */}
          <ControlledInput
            name="customFilename"
            control={control}
            label="نام دلخواه فایل (اختیاری)"
            errors={errors}
            variant="bordered"
            color="primary"
            classNames={{
              base: "w-full",
              inputWrapper: "bg-slate-800/50 border-slate-600 hover:border-slate-500",
              input: "text-slate-100 placeholder:text-slate-400",
              label: "text-slate-300",
            }}
          />
        </div>

        {/* submit button */}
        <Button
          type="submit"
          isLoading={isUploading}
          disabled={isUploading || !file}
          className="w-full md:w-auto bg-gradient-to-l from-blue-600 to-indigo-700 text-white font-semibold py-2 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <FiUpload className="text-lg" />
          {isUploading ? "در حال آپلود..." : "آپلود تصویر"}
        </Button>
      </form>

      {/* error */}
      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-400/40 rounded-lg text-red-400 flex items-center gap-2">
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  );
};

export default UploadFile;