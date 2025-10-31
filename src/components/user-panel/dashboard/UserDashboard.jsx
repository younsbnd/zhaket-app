import { USER_BANNERS } from "@/constants/user-panel/dashboard/userBanner";
import Image from "next/image";
import React from "react";
import PurchasedProducts from "./PurchasedProducts";
import TicketsSupport from "./TicketsSupport";

const UserDashboard = () => {
  return (
    <div>
      {/* user banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-4">
        {USER_BANNERS.map((banner) => (
          <Image
            key={banner.id}
            src={banner.image}
            alt={banner.title}
            width={500}
            height={500}
            className="w-full h-full object-cover rounded-lg cursor-pointer"
          />
        ))}
      </div>
      {/* purchased products and tickets support */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <PurchasedProducts />
        <TicketsSupport />
      </div>
    </div>
  );
};

export default UserDashboard;
