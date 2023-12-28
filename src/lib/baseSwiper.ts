import { Autoplay } from "swiper/modules";

export const baseSwiper = {
    slidesPerView: 1,
    spaceBetween: 24,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    modules: [Autoplay],
};
