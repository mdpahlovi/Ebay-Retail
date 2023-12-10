import { Product } from "@/types/data";
import { useQuery, gql } from "@apollo/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { baseSwiper } from "@/lib/baseSwiper";
import { Skeleton } from "@/components/ui/skeleton";
import AdvertiseCard from "./advertise-card";

const GET_ADVERTISE_PRODUCTS = gql`
    query GetAdvertise {
        advertise {
            id
            image
            condition
            name
            isBooked
        }
    }
`;

const Advertise = () => {
    const { loading, data } = useQuery(GET_ADVERTISE_PRODUCTS);
    const breakpoints = { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } };

    return (
        <section>
            <Swiper {...baseSwiper} breakpoints={breakpoints}>
                {loading
                    ? [...Array(3)].map((_, idx) => (
                          <SwiperSlide key={idx}>
                              <Skeleton className="h-80 rounded-lg" />
                          </SwiperSlide>
                      ))
                    : data?.advertise?.map((product: Product) => (
                          <SwiperSlide key={product?.id}>
                              <AdvertiseCard product={product} />
                          </SwiperSlide>
                      ))}
            </Swiper>
        </section>
    );
};

export default Advertise;
