"use client";
import { Card, CardBody, Skeleton } from "@heroui/react";

export default function WalletSkeleton() {
  return (
    <div className="w-full mt-4 md:mt-8 pb-8 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
          {/* Right Column - Balance and Deposit */}
          <div className="lg:col-span-1 space-y-4 md:space-y-6">
            <Card>
              <CardBody className="space-y-3">
                <Skeleton className="h-6 w-24 rounded" />
                <Skeleton className="h-10 w-32 rounded" />
              </CardBody>
            </Card>

            <Card>
              <CardBody className="space-y-3">
                <Skeleton className="h-6 w-32 rounded" />
                <Skeleton className="h-10 w-full rounded" />
                <Skeleton className="h-10 w-24 rounded" />
              </CardBody>
            </Card>
          </div>

          {/* Left Column - Transactions */}
          <div className="lg:col-span-2">
            <Card>
              <CardBody className="space-y-3">
                <Skeleton className="h-6 w-40 rounded" />
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-16 w-full rounded" />
                ))}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

