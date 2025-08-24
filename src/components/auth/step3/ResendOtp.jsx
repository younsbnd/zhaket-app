"use client";
import { fetcher } from "@/lib/api/fetcher";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { FiRefreshCcw } from "react-icons/fi";
import { addToast } from "@heroui/react";
import { useCrud } from "@/hooks/useCrud";

const ResendOtp = ({ identifier, withOtp }) => {
  const { data: resendOtpData } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/send-otp?identifier=${identifier}`,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );
  const { createRecord } = useCrud("/auth/send-otp");

  // on send otp handler
  const onSendOtp = async () => {
    try {
      const response = await createRecord({ identifier });

      if (response.ok) {
        // Set counter immediately upon successful OTP send
        if (response.data.expiresAt) {
          const expireTime = new Date(response.data.expiresAt).getTime();
          const currentTime = new Date().getTime();
          const distance = expireTime - currentTime;

          if (distance > 0) {
            const newCounter = Math.floor(distance / 1000);
            setCounter(newCounter);
            localStorage.setItem("otp-counter", newCounter.toString());
          }
        } else {
          // If no expiration time is provided, set a default counter
          setCounter(60);
          localStorage.setItem("otp-counter", "60");
        }

        // Force refresh the SWR data
        mutate(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/send-otp?identifier=${identifier}`
        );

        addToast({
          title: response.data.message,
          color: response.data.expiresAt ? "warning" : "success",
          timeout: response.data.expiresAt ? 8000 : 3000,
          shouldShowTimeoutProgress: true,
        });
      }
    } catch (err) {
      addToast({
        title: err.message,
        color: "danger",
      });
    }
  };

  const [otp, setOtp] = useState("");
  const [counter, setCounter] = useState(60);

  // Restore counter from localStorage on component mount
  useEffect(() => {
    const savedCounter = localStorage.getItem("otp-counter");
    if (savedCounter) {
      setCounter(Number(savedCounter));
    }
  }, []);

  useEffect(() => {
    // Immediately update counter when we get data from API
    if (resendOtpData?.otp?.expiresAt) {
      const expireTime = new Date(resendOtpData.otp.expiresAt).getTime();
      const currentTime = new Date().getTime();
      const distance = expireTime - currentTime;

      if (distance > 0) {
        setCounter(Math.floor(distance / 1000));
      } else {
        setCounter(0);
      }
    }

    // Update counter every second
    const interval = setInterval(() => {
      const expireTime = new Date(resendOtpData?.otp?.expiresAt).getTime();
      const currentTime = new Date().getTime();
      const distance = expireTime - currentTime;

      if (distance > 0) {
        const newCounter = Math.floor(distance / 1000);
        setCounter(newCounter);
        localStorage.setItem("otp-counter", newCounter.toString());
      } else {
        setCounter(0);
        localStorage.removeItem("otp-counter");
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [resendOtpData]);

  return (
    <div>
      <section>
        <p
          className={`text-[11px] mt-2 border-b-1  border-dashed inline-block ${
            counter > 0
              ? "cursor-not-allowed text-gray-400"
              : "cursor-pointer text-blue-400 border-blue-400"
          }`}
          disabled={counter > 0}
          onClick={counter > 0 ? undefined : onSendOtp}
        >
          {counter > 0 ? (
            // counter
            <span className="flex items-center gap-1">
              {" "}
              <FiRefreshCcw className="inline-block mr-1" /> {counter} ثانیه
            </span>
          ) : (
            // resend otp button
            <span className="flex items-center gap-1">
              {" "}
              <FiRefreshCcw className="inline-block mr-1" /> ارسال مجدد کد
            </span>
          )}
        </p>
      </section>
    </div>
  );
};

export default ResendOtp;
