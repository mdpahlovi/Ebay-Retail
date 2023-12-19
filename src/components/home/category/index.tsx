import { Category } from "@/types/data";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@/graphql/queries";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { baseSwiper } from "@/lib/baseSwiper";
import { useCallback, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CategoryCard from "./category-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Category = () => {
    const { loading, data } = useQuery(GET_CATEGORIES);

    const sliderRef = useRef<SwiperRef | null>(null);
    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);
    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    const breakpoints = { 448: { slidesPerView: 2 }, 640: { slidesPerView: 3 }, 1024: { slidesPerView: 4 }, 1600: { slidesPerView: 5 } };

    return (
        <section>
            <h1 className="text-center mb-8">Categories</h1>
            <Swiper ref={sliderRef} {...baseSwiper} breakpoints={breakpoints}>
                {loading
                    ? [...Array(6)].map((_, idx) => (
                          <SwiperSlide key={idx}>
                              <Skeleton className="h-48 rounded-lg" />
                          </SwiperSlide>
                      ))
                    : data?.categories?.map((category: Category) => (
                          <SwiperSlide key={category?.id}>
                              <CategoryCard category={category} />
                          </SwiperSlide>
                      ))}
            </Swiper>
            <div className="mt-4 flex justify-end gap-4">
                <Button className="rounded-full" size="icon" onClick={handlePrev}>
                    <ChevronLeft size={20} />
                </Button>
                <Button className="rounded-full" size="icon" onClick={handleNext}>
                    <ChevronRight size={20} />
                </Button>
            </div>
        </section>
    );
};

export default Category;
