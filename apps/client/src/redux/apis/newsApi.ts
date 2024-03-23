import axios from "axios";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig } from "axios";
import { Article } from "@/types/data";

type NewsBaseQueryProps = BaseQueryFn<{ url: string; params?: AxiosRequestConfig["params"] }, unknown, unknown>;

const axiosBaseQuery =
    ({ baseUrl }: { baseUrl: string } = { baseUrl: "" }): NewsBaseQueryProps =>
    async ({ url, params }) =>
        await axios({ url: baseUrl + url, method: "GET", params, timeout: 60000 });

export const newApi = createApi({
    reducerPath: "newsApi",
    baseQuery: axiosBaseQuery({ baseUrl: "https://ebay-retail.onrender.com/news" }),
    endpoints: (builder) => ({
        getLatestNews: builder.query<{ articles: Article[]; totalPage: number }, void>({
            query: () => ({ url: "/top-headlines", params: { sources: "bbc-news", pageSize: 6 } }),
        }),
        getNews: builder.query<{ articles: Article[]; totalPage: number }, AxiosRequestConfig["params"]>({
            query: (params: AxiosRequestConfig["params"]) => ({ url: "/top-headlines", params }),
        }),
    }),
});

export const { useGetLatestNewsQuery, useGetNewsQuery } = newApi;
