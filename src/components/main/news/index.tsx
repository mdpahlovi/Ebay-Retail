import { newsapi } from "@/main";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { baseSwiper } from "@/lib/baseSwiper";
import { Skeleton } from "@/components/ui/skeleton";
import ArticleCard from "./ArticleCard";

const TopNews = () => {
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        setLoading(true);
        newsapi.get(`/top-headlines`, { params: { sources: "bbc-news", pageSize: 6 } }).then((res) => {
            setArticles(res.data.articles);
            setLoading(false);
        });
    }, []);

    const breakpoints = { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } };

    return (
        <section>
            <h1 className="text-center mb-8">Latest News</h1>
            <Swiper {...baseSwiper} breakpoints={breakpoints}>
                {loading
                    ? [...Array(3)].map((_, idx) => (
                          <SwiperSlide key={idx}>
                              <Skeleton className="h-80 rounded-lg" />
                          </SwiperSlide>
                      ))
                    : articles.map((article, idx) => (
                          <SwiperSlide key={idx}>
                              <ArticleCard article={article} />
                          </SwiperSlide>
                      ))}
            </Swiper>
        </section>
    );
};

export default TopNews;
