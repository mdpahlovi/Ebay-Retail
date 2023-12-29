import axios from "axios";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { Article } from "@/types/data";

const apiKey = import.meta.env.VITE_NEWS_API_KEY;
type NewsBaseQueryProps = BaseQueryFn<{ url: string; params?: AxiosRequestConfig["params"] }, unknown, unknown>;

const axiosBaseQuery =
    ({ baseUrl }: { baseUrl: string } = { baseUrl: "" }): NewsBaseQueryProps =>
    async ({ url, params }) => {
        try {
            const result = await axios({ url: baseUrl + url, method: "GET", params: { ...params, apiKey }, timeout: 60000 });
            return { data: { articles: result.data.articles, totalPage: Math.ceil(result.data.totalResults / 6) } };
        } catch (axiosError) {
            const error = axiosError as AxiosError;
            return { error: { status: error.response?.status, data: error.response?.data || error.message } };
        }
    };

export const newApi = createApi({
    reducerPath: "newsApi",
    baseQuery: axiosBaseQuery({ baseUrl: "https://newsapi.org/v2" }),
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
