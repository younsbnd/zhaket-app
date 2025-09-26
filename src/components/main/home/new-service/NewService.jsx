import Image from "next/image";
import React from "react";

const NewService = () => {
  return (
    <div className="flex items-center justify-center mt-5 w-full max-w-[1279px] mx-auto px-4 md:mt-20 md:px-0 mt-10!">
      <div className="flex flex-col justify-between overflow-hidden rounded-xl shadow-none border-none shadow-0 w-full border-[1.5px] border-white object-cover">
        <Image
          src="/images/main/home/new-service/new-service.png"
          alt="new service"
          width={1000}
          height={1000}
          priority
          quality={100}
          unoptimized={true}
          className="object-cover w-full h-full hidden sm:block"
        />
        <Image
          src="/images/main/home/new-service/new-service-mobile.png"
          alt="new service mobile"
          width={1000}
          height={1000}
          priority
          unoptimized={true}
          className="object-cover w-full h-full sm:hidden"
        />
      </div>
    </div>
  );
};

export default NewService;
