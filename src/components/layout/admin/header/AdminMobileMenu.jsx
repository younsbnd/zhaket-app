import { Drawer, DrawerBody, DrawerContent, DrawerHeader } from "@heroui/react";
import React from "react";
import AdminSidebarLogo from "../sidebar/AdminSidebarLogo";
import AdminNavLinks from "../sidebar/AdminNavLinks";

// admin mobile menu for mobile devices
const AdminMobileMenu = ({ isOpen, onOpenChange }) => {
  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      classNames={{
        base: "glass w-[18rem] ",
        closeButton:
          "p-2 m-4 cursor-pointer hover:bg-white/5 rounded-md active:bg-white/5 text-xl text-white/70",
      }}
    >
      {/* drawer content */}
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="px-3">
              <AdminSidebarLogo />
            </DrawerHeader>
            <DrawerBody className="p-0">
              <div>
                <AdminNavLinks />
              </div>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default AdminMobileMenu;
