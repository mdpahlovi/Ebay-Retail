import { Product } from "@/types/data";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "@/graphql/queries";
import Loader from "@/components/ui/loader";
import Header from "@/components/ui/header";
import ProductCard from "@/components/products/product-card";

export default function Products() {
    const params = useParams();
    const { loading, data } = useQuery(GET_PRODUCTS, { variables: { id: params?.id } });

    if (loading) return <Loader />;
    return (
        <>
            <Header title={data?.category?.name} last={data?.category?.name} />
            <section className="container section-gap grid grid-cols-1 xl:grid-cols-2 gap-12">
                {data?.category?.products?.map((product: Product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </section>
        </>
    );
}
