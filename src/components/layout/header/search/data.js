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
  { title: "افزونه المنتور", image: "/search/el.png", url: "#" },
  { title: "افزونه دیجیتیس پلاگین", image: "/search/di.png", url: "#" },
  { title: "قالب وود مارت| قالب فروشگاهی", image: "/search/wo.png", url: "#" },
  { title: "افزونه راکت | پلاگین راکت", image: "/search/sa.png", url: "#" },
  {
    title: "افزونه گرویتی فرمز پلاگین فرم ساز",
    image: "/search/gr.png",
    url: "#",
  },
  { title: "قالب دیجی لند", image: "/search/la.png", url: "#" },
];
