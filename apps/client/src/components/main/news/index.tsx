import ArticleCard from "./ArticleCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { baseSwiper } from "@/lib/baseSwiper";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetLatestNewsQuery } from "@/redux/apis/newsApi";

const TopNews = () => {
    const { data, isLoading } = useGetLatestNewsQuery();
    const breakpoints = { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } };

    return (
        <section>
            <h1 className="text-center mb-8">Latest News</h1>
            <Swiper {...baseSwiper} breakpoints={breakpoints}>
                {isLoading
                    ? [...Array(3)].map((_, idx) => (
                          <SwiperSlide key={idx}>
                              <Skeleton className="h-80 rounded-lg" />
                          </SwiperSlide>
                      ))
                    : data?.articles.map((article, idx) => (
                          <SwiperSlide key={idx}>
                              <ArticleCard article={article} />
                          </SwiperSlide>
                      ))}
            </Swiper>
        </section>
    );
};

export default TopNews;
