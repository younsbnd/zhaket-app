// Animation configs
export const CARD_ANIMATION = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
    whileHover: { y: -5 }
};

export const IMAGE_ANIMATION = {
    whileHover: { scale: 1.05 },
    transition: { duration: 0.3 }
};

export const CONTENT_ANIMATION = {
    initial: { y: 0 },
    whileHover: { y: -10 },
    transition: { duration: 0.3 }
};
