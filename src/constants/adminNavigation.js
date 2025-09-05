import { BiCategory, BiHomeAlt2, BiTag, BiUser } from "react-icons/bi";
import { AiFillProduct } from "react-icons/ai";

// admin navigation links for sidebar and mobile menu
export const ADMIN_NAVIGATIONS = [
  {
    name: "داشبورد",
    path: "/admin",
    icon: (
      <BiHomeAlt2 className="inline-flex text-3xl p-1  items-center justify-center rounded-lg bg-blue-500/15 text-blue-400 ring-1 ring-inset ring-blue-400/20" />
    ),
  },
  {
    name: "کاربران",
    path: "/admin/users",
    icon: (
      <BiUser className="inline-flex p-1 text-3xl items-center justify-center rounded-md bg-blue-500/15 text-blue-400 ring-1 ring-inset ring-blue-400/20" />
    ),
  },
  {
    name: "دسته بندی محصولات",
    path: "/admin/product-categories",
    icon: (
      <BiCategory className="inline-flex p-1 text-3xl items-center justify-center rounded-md bg-blue-500/15 text-blue-400 ring-1 ring-inset ring-blue-400/20" />
    ),
  },
  {
    name: "تگ ها",
    path: "/admin/tags",
    icon: (
      <BiTag className="inline-flex p-1 text-3xl items-center justify-center rounded-md bg-blue-500/15 text-blue-400 ring-1 ring-inset ring-blue-400/20" />
    ),
  },
  {
    name: "محصولات",
    path: "/admin/products",
    icon: (
      <AiFillProduct className="inline-flex p-1 text-3xl items-center justify-center rounded-md bg-blue-500/15 text-blue-400 ring-1 ring-inset ring-blue-400/20" />
    ),
  },
];
