"use client";
import { Button, Card, Input, Textarea } from "@heroui/react";
import React, { useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { BiPlus, BiTrash, BiChevronUp, BiChevronDown } from "react-icons/bi";

const CategoryFAQ = ({ control, errors }) => {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "faqs",
  });

  const [newFAQ, setNewFAQ] = useState({ question: "", answer: "" });

  // Add new FAQ
  const handleAddFAQ = () => {
    if (newFAQ.question.trim() && newFAQ.answer.trim()) {
      append({
        question: newFAQ.question,
        answer: newFAQ.answer,
        order: fields.length,
      });
      setNewFAQ({ question: "", answer: "" });
    }
  };

  // Move FAQ up
  const handleMoveUp = (index) => {
    if (index > 0) {
      move(index, index - 1);
      // Update order values after moving
      setTimeout(() => {
        fields.forEach((_, idx) => {
          control.setValue(`faqs.${idx}.order`, idx);
        });
      }, 0);
    }
  };

  // Move FAQ down
  const handleMoveDown = (index) => {
    if (index < fields.length - 1) {
      move(index, index + 1);
      // Update order values after moving
      setTimeout(() => {
        fields.forEach((_, idx) => {
          control.setValue(`faqs.${idx}.order`, idx);
        });
      }, 0);
    }
  };

  return (
    <div className="glass mt-4 space-y-4 rounded-2xl p-5 w-full">
      <h3 className="mb-4 text-xl font-bold text-white">
        سوالات متداول (FAQ)
      </h3>

      {/* List of existing FAQs */}
      {fields.length > 0 && (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <Card
              key={field.id}
              className="glass border border-white/10 p-4"
            >
              <div className="flex items-start gap-3">
                {/* FAQ Content */}
                <div className="flex-1 space-y-3">
                  <Controller
                    name={`faqs.${index}.question`}
                    control={control}
                    rules={{
                      required: "سوال الزامی است",
                      minLength: {
                        value: 3,
                        message: "سوال باید حداقل 3 کاراکتر باشد",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="سوال"
                        placeholder="سوال خود را وارد کنید"
                        variant="bordered"
                        classNames={{
                          label: "text-white",
                          input: "text-white",
                          inputWrapper:
                            "border-white/20 hover:border-white/40",
                        }}
                        errorMessage={
                          errors?.faqs?.[index]?.question?.message
                        }
                        isInvalid={!!errors?.faqs?.[index]?.question}
                      />
                    )}
                  />

                  <Controller
                    name={`faqs.${index}.answer`}
                    control={control}
                    rules={{
                      required: "پاسخ الزامی است",
                      minLength: {
                        value: 3,
                        message: "پاسخ باید حداقل 3 کاراکتر باشد",
                      },
                    }}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        label="پاسخ"
                        placeholder="پاسخ سوال را وارد کنید"
                        variant="bordered"
                        minRows={3}
                        classNames={{
                          label: "text-white",
                          input: "text-white",
                          inputWrapper:
                            "border-white/20 hover:border-white/40",
                        }}
                        errorMessage={
                          errors?.faqs?.[index]?.answer?.message
                        }
                        isInvalid={!!errors?.faqs?.[index]?.answer}
                      />
                    )}
                  />

                  <Controller
                    name={`faqs.${index}.order`}
                    control={control}
                    defaultValue={index}
                    render={({ field }) => (
                      <input
                        type="hidden"
                        {...field}
                        value={field.value !== undefined ? field.value : index}
                      />
                    )}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  {/* Move Up */}
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    className="bg-blue-500/20 text-blue-400"
                    onPress={() => handleMoveUp(index)}
                    isDisabled={index === 0}
                  >
                    <BiChevronUp className="text-xl" />
                  </Button>

                  {/* Move Down */}
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    className="bg-blue-500/20 text-blue-400"
                    onPress={() => handleMoveDown(index)}
                    isDisabled={index === fields.length - 1}
                  >
                    <BiChevronDown className="text-xl" />
                  </Button>

                  {/* Delete */}
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    className="bg-red-500/20 text-red-400"
                    onPress={() => remove(index)}
                  >
                    <BiTrash className="text-xl" />
                  </Button>
                </div>
              </div>

              <div className="mt-2 text-xs text-gray-400">
                ترتیب نمایش: {index + 1}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add new FAQ form */}
      <Card className="glass border border-white/10 p-4">
        <h4 className="mb-3 text-sm font-semibold text-white">
          افزودن سوال جدید
        </h4>
        <div className="space-y-3">
          <Input
            label="سوال"
            placeholder="سوال خود را وارد کنید"
            value={newFAQ.question}
            onChange={(e) =>
              setNewFAQ({ ...newFAQ, question: e.target.value })
            }
            variant="bordered"
            classNames={{
              label: "text-white",
              input: "text-white",
              inputWrapper: "border-white/20 hover:border-white/40",
            }}
          />

          <Textarea
            label="پاسخ"
            placeholder="پاسخ سوال را وارد کنید"
            value={newFAQ.answer}
            onChange={(e) =>
              setNewFAQ({ ...newFAQ, answer: e.target.value })
            }
            variant="bordered"
            minRows={2}
            classNames={{
              label: "text-white",
              input: "text-white",
              inputWrapper: "border-white/20 hover:border-white/40",
            }}
          />

          <Button
            onPress={handleAddFAQ}
            className="w-full bg-gradient-to-l from-green-600 to-emerald-700 text-white"
            startContent={<BiPlus className="text-xl" />}
            isDisabled={!newFAQ.question.trim() || !newFAQ.answer.trim()}
          >
            افزودن سوال
          </Button>
        </div>
      </Card>

      {fields.length === 0 && (
        <div className="rounded-xl bg-yellow-500/10 p-4 text-center text-sm text-yellow-400">
          هنوز سوالی اضافه نشده است. از فرم بالا سوال جدید اضافه کنید.
        </div>
      )}
    </div>
  );
};

export default CategoryFAQ;

