export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4, // ⏱️ custom duration
      ease: "easeOut",
    },
  },
};

export const ourSuggestion = [
  { title: "افزونه المنتور", image: "/layout/search/el.png", url: "#" },
  { title: "افزونه دیجیتیس پلاگین", image: "/layout/search/di.png", url: "#" },
  { title: "قالب وود مارت| قالب فروشگاهی", image: "/layout/search/wo.png", url: "#" },
  { title: "افزونه راکت | پلاگین راکت", image: "/layout/search/sa.png", url: "#" },
  {
    title: "افزونه گرویتی فرمز پلاگین فرم ساز",
    image: "/layout/search/gr.png",
    url: "#",
  },
  { title: "قالب دیجی لند", image: "/layout/search/la.png", url: "#" },
];
