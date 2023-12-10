import { useQuery, gql } from "@apollo/client";
import { Category } from "@/types/data";
import Header from "@/components/ui/header";
import { Skeleton } from "@/components/ui/skeleton";
import CategoryCard from "@/components/home/category/category-card";

const GET_CATEGORIES = gql`
    query GetCategories {
        categories {
            id
            name
            image
            total
        }
    }
`;

const Categories = () => {
    const { loading, data } = useQuery(GET_CATEGORIES);

    return (
        <>
            <Header title="Our Product Category" />
            <section className="grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                {loading
                    ? [...Array(4)].map((_, idx) => <Skeleton key={idx} className="h-48 rounded-lg" />)
                    : data?.categories?.map((category: Category) => <CategoryCard key={category?.id} category={category} />)}
            </section>
        </>
    );
};

export default Categories;
