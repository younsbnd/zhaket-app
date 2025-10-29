import { TbLayoutGrid } from "react-icons/tb";
import { FiDollarSign, FiDownload, FiLock } from "react-icons/fi";
import { HiOutlineCog, HiOutlineTicket } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BiPlus } from "react-icons/bi";

// Ordered route matching (most specific first)
export const USER_HEADER_ROUTE_MAP = [
  {
    test: /^\/panel\/settings\/edit-profile\/edit-password$/,
    title: "تغییر رمز عبور",
    iconKey: "lock",
  },
  {
    test: /^\/panel\/settings\/edit-profile(\/.*)?$/,
    title: "تکمیل پروفایل",
    iconKey: "user",
  },
  { test: /^\/panel\/settings(\/.*)?$/, title: "تنظیمات", iconKey: "settings" },
  { test: /^\/panel\/downloads$/, title: "دانلودها", iconKey: "download" },
  { test: /^\/panel\/invoices$/, title: "مالی", iconKey: "money" },
  { test: /^\/panel(\/)?$/, title: "داشبورد", iconKey: "dashboard" },
  { test: /^\/panel\/tickets$/, title: "تیکت ها", iconKey: "ticket" },
  { test: /^\/panel\/tickets\/new$/, title: "ثبت تیکت", iconKey: "ticket" },
  { test: /^\/panel\/wallet$/, title: "کیف پول", iconKey: "wallet" },
];

export const USER_HEADER_ICON_MAP = {
  dashboard: TbLayoutGrid,
  download: FiDownload,
  lock: FiLock,
  settings: HiOutlineCog,
  user: FaUser,
  money: MdOutlineAttachMoney,
  ticket: HiOutlineTicket,
  newTicket: BiPlus,
  wallet: FiDollarSign,
};

export function getUserHeaderMeta(pathname = "") {
  const found = USER_HEADER_ROUTE_MAP.find((r) => r.test.test(pathname));
  const iconKey = found?.iconKey || "dashboard";
  const Icon = USER_HEADER_ICON_MAP[iconKey] || TbLayoutGrid;
  return { title: found?.title || "داشبورد", Icon };
}
