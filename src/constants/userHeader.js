import { TbLayoutGrid } from "react-icons/tb";
import { FiDownload, FiHeart, FiLock } from "react-icons/fi";
import { HiOutlineCog } from "react-icons/hi2";
import { FaRegHandshake, FaUser } from "react-icons/fa";
import { MdOutlineAttachMoney, MdOutlineGroups } from "react-icons/md";

// Ordered route matching (most specific first)
export const USER_HEADER_ROUTE_MAP = [
  { test: /^\/panel\/settings\/edit-profile\/edit-password$/, title: "تغییر رمز عبور", iconKey: "lock" },
  { test: /^\/panel\/settings\/edit-profile(\/.*)?$/, title: "تکمیل پروفایل", iconKey: "user" },
  { test: /^\/panel\/settings(\/.*)?$/, title: "تنظیمات", iconKey: "settings" },
  { test: /^\/panel\/downloads$/, title: "دانلودها", iconKey: "download" },
  { test: /^\/panel\/favorites$/, title: "علاقه‌مندی", iconKey: "heart" },
  { test: /^\/panel\/affiliate$/, title: "همکاری در فروش", iconKey: "handshake" },
  { test: /^\/panel\/club$/, title: "باشگاه مشتریان", iconKey: "groups" },
  { test: /^\/panel\/invoices$/, title: "مالی", iconKey: "money" },
  { test: /^\/panel(\/)?$/, title: "داشبورد", iconKey: "dashboard" },
];

export const USER_HEADER_ICON_MAP = {
  dashboard: TbLayoutGrid,
  download: FiDownload,
  heart: FiHeart,
  lock: FiLock,
  settings: HiOutlineCog,
  user: FaUser,
  handshake: FaRegHandshake,
  money: MdOutlineAttachMoney,
  groups: MdOutlineGroups,
};

export function getUserHeaderMeta(pathname = "") {
  const found = USER_HEADER_ROUTE_MAP.find((r) => r.test.test(pathname));
  const iconKey = found?.iconKey || "dashboard";
  const Icon = USER_HEADER_ICON_MAP[iconKey] || TbLayoutGrid;
  return { title: found?.title || "داشبورد", Icon };
}


