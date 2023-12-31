import moment from "moment";
import { AvatarWithFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Article } from "@/types/data";

export default function ArticleCard({ article }: { article: Article }) {
    const { urlToImage, author, publishedAt, url, title, content } = article;

    return (
        <Card className="overflow-hidden">
            <AvatarWithFallback src={urlToImage} className="w-full h-48 rounded-none" />
            <CardHeader className="pb-2.5">
                <div className="flex items-center justify-between">
                    <Badge className="w-max">{author}</Badge>
                    <h6>{moment(publishedAt).format("ll")}</h6>
                </div>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
                <CardDescription>{content}</CardDescription>
            </CardContent>
            <CardFooter>
                <a href={url} target="_blank" className={buttonVariants({ size: "sm", className: "w-full" })}>
                    Reed More
                </a>
            </CardFooter>
        </Card>
    );
}
