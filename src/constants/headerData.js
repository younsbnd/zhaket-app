import {
  FaCode,
  FaPuzzlePiece,
  FaGlobe,
  FaWordpress,
  FaPaintBrush,
  FaGraduationCap,
} from "react-icons/fa";
import { SiDatabricks, SiHtml5 } from "react-icons/si";
import { CiDiscount1, CiHeart } from "react-icons/ci";

export const categories = [
  {
    title: "محیوب ترین",
    url: "/",
    icon: <CiHeart />,
    subcategories: [
      { title: "فروشگاهی", url: "" },
      { title: "خبری و مجله‌ای", url: "" },
      { title: "شرکتی", url: "" },
      { title: "شخصی و رزومه", url: "" },
      { title: "آموزشی", url: "" },
      { title: "املاک", url: "" },
      { title: "پزشکی و سلامت", url: "" },
      { title: "چندمنظوره", url: "" },
      { title: "رستوران و کافه", url: "" },
      { title: "ورزشی", url: "" },
      { title: "موزیک و هنری", url: "" },
      { title: "مسافرت و گردشگری", url: "" },
    ],
  },
  {
    title: "قالب وردپرس",
    url: "/",
    icon: <FaPuzzlePiece />,
    subcategories: [
      { title: "افزونه فروشگاه‌ساز", url: "" },
      { title: "افزونه سئو", url: "" },
      { title: "افزونه فرم‌ساز", url: "" },
      { title: "افزونه امنیتی", url: "" },
      { title: "افزونه چندفروشندگی", url: "" },
      { title: "افزونه چت آنلاین", url: "" },
      { title: "افزونه رزرواسیون", url: "" },
      { title: "افزونه درگاه پرداخت", url: "" },
      { title: "افزونه کشینگ", url: "" },
      { title: "افزونه بهینه‌سازی تصاویر", url: "" },
      { title: "افزونه بکاپ و امنیت", url: "" },
      { title: "افزونه شبکه‌های اجتماعی", url: "" },
      { title: "افزونه چندزبانه", url: "" },
      { title: "افزونه فروش دیجیتال", url: "" },
      { title: "افزونه مدیریت کاربران", url: "" },
      { title: "افزونه آمار و گزارش", url: "" },
    ],
  },
  {
    title: "افزونه وردپرس",
    url: "/",
    icon: <SiDatabricks />,
    subcategories: [
      { title: "قالب شرکتی HTML", url: "" },
      { title: "قالب فروشگاهی HTML", url: "" },
      { title: "قالب لندینگ پیج", url: "" },
      { title: "قالب رویداد و کنفرانس", url: "" },
      { title: "قالب شخصی و رزومه", url: "" },
      { title: "قالب بلاگ HTML", url: "" },
      { title: "قالب آموزشی HTML", url: "" },
      { title: "قالب خبری و مجله‌ای", url: "" },
      { title: "قالب نمونه کار و پورتفولیو", url: "" },
      { title: "قالب رستوران و کافه", url: "" },
    ],
  },
  {
    title: "اسکریپت",
    url: "/",
    icon: <FaCode />,
    subcategories: [
      { title: "اسکریپت فروشگاهی", url: "" },
      { title: "اسکریپت آموزشی", url: "" },
      { title: "اسکریپت شبکه اجتماعی", url: "" },
      { title: "اسکریپت مدیریت پروژه", url: "" },
      { title: "اسکریپت رزرو آنلاین", url: "" },
      { title: "اسکریپت چت آنلاین", url: "" },
      { title: "اسکریپت خبری", url: "" },
      { title: "اسکریپت وبلاگ", url: "" },
      { title: "اسکریپت آگهی و نیازمندی", url: "" },
      { title: "اسکریپت مدیریت محتوا (CMS)", url: "" },
    ],
  },
  {
    title: "قالب html",
    url: "/",
    icon: <SiHtml5 />,
    subcategories: [
      { title: "فروشگاهی", url: "" },
      { title: "آموزشی", url: "" },
      { title: "شرکتی", url: "" },
      { title: "خبری", url: "" },
      { title: "شخصی و رزومه", url: "" },
      { title: "رستوران و کافه", url: "" },
      { title: "نمونه کار و پورتفولیو", url: "" },
      { title: "موزیک و هنری", url: "" },
      { title: "رویداد و کنفرانس", url: "" },
      { title: "ورزشی", url: "" },
    ],
  },
  {
    title: "بسته های شگفت انگیز",
    url: "/",
    icon: <CiDiscount1 />,
    subcategories: [
      { title: "کیت رابط کاربری", url: "" },
      { title: "آیکون", url: "" },
      { title: "قالب پاورپوینت", url: "" },
      { title: "موکاپ", url: "" },
      { title: "فونت", url: "" },
      { title: "المان‌های طراحی", url: "" },
      { title: "الگوهای گرافیکی", url: "" },
      { title: "طرح‌های آماده", url: "" },
      { title: "بنر و تبلیغات", url: "" },
      { title: "بک‌گراند و تکسچر", url: "" },
    ],
  },
];
export const academyMenu = [
  {
    title: "دوره طراحی سایت",
    url: "#",
  },
  {
    title: "دوره سئو کاربردی",
    url: "#",
  },
  {
    title: "دوره تولید محتوا",
    url: "#",
  },
  {
    title: "دوره اینستاگرام",
    url: "#",
  },
  {
    title: "دوره آنالیتیکس GA4",
    url: "#",
  },
  {
    title: "بازاریابی برای فروشگاه‌های اینترنتی",
    url: "#",
  },
  {
    title: "سئو بعداز راه‌اندازی سایت",
    url: "#",
  },
  {
    title: "افزایش سرعت (رایگان)",
    url: "#",
  },
];
export const servicesMenu = [
  {
    title: "خدمات طراحی قالب",
    uer: "",
  },
  {
    title: "خدمات توسعه افزونه",
    uer: "",
  },
  {
    title: "خدمات بهینه‌سازی سایت",
    uer: "",
  },
  {
    title: "خدمات امنیت سایت",
    uer: "",
  },
  {
    title: "خدمات سئو",
    uer: "",
  },
  {
    title: "خدمات پشتیبانی و نگهداری",
    uer: "",
  },
  {
    title: "خدمات آموزش و مشاوره",
    uer: "",
  },
];
