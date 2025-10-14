import React from "react";
import Image from "next/image";
import { Card, CardBody, Skeleton } from "@heroui/react";

const CartSkeleton = () => {
  return (
    <div className="relative pt-0.5">
      {/* background image */}
      <Image
        src="/images/main/home/cart/cart-bg.svg"
        alt="cart"
        width={100}
        height={100}
        className="absolute right-0 top-0 -z-10 w-full overflow-hidden bg-repeat-round object-cover h-[141px]!"
        priority
      />
      <div className="mx-auto mt-[26px] mb-[100px] w-full bg-white p-4 md:max-w-[1057px] md:shadow-[0px_20px_60px_-15px_rgba(0,0,0,0.15)]">
        {/* Header skeleton */}
        <div className="mb-6">
          <Skeleton className="h-8 w-32 rounded-lg mb-2" />
          <Skeleton className="h-4 w-48 rounded-lg" />
        </div>

        <div className="flex flex-col rounded-md pb-[15px] shadow-[0px_25px_40px_0px_rgba(73,75,84,0.1)] md:flex-row md:justify-between md:gap-[39px] md:pb-0 md:shadow-none">
          {/* Cart items skeleton */}
          <div className="md:flex md:w-full md:flex-col md:justify-between">
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="p-4">
                  <CardBody className="flex-row gap-4">
                    <Skeleton className="h-20 w-20 rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-3/4 rounded-lg" />
                      <Skeleton className="h-4 w-1/2 rounded-lg" />
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-8 w-20 rounded-lg" />
                        <Skeleton className="h-6 w-16 rounded-lg" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart summary skeleton */}
          <div className="top-[10%] h-max w-full md:sticky md:max-w-[348px] md:p-5 md:pt-0">
            <Card className="p-4">
              <CardBody className="space-y-4">
                <Skeleton className="h-6 w-32 rounded-lg" />
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20 rounded-lg" />
                    <Skeleton className="h-4 w-16 rounded-lg" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16 rounded-lg" />
                    <Skeleton className="h-4 w-14 rounded-lg" />
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-24 rounded-lg" />
                    <Skeleton className="h-5 w-20 rounded-lg" />
                  </div>
                </div>
                <Skeleton className="h-12 w-full rounded-lg" />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
