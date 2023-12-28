/* eslint-disable @typescript-eslint/no-explicit-any */
import { newsapi } from "@/main";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/ui/header";
import ArticleCard from "@/components/main/news/ArticleCard";
import { PaginationComp } from "@/components/pagination";

export default function NewsPage() {
    const [searchParams] = useSearchParams();
    const [articles, setArticles] = useState([]);
    const [totalResult, setTotalResults] = useState(0);
    const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

    useEffect(() => {
        newsapi.get(`/top-headlines`, { params: { sources: "bbc-news", page, pageSize: 6 } }).then((res: any) => {
            setArticles(res.data.articles);
            setTotalResults(res.data.totalResults);
        });
    }, [page]);

    return (
        <>
            <Header title="Discover & Learn" />
            <section className="space-y-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article, idx) => (
                        <ArticleCard key={idx} article={article} />
                    ))}
                </div>
                <PaginationComp page={page} length={totalResult} />
            </section>
        </>
    );
}
