import ProductCard from "@/components/products/product-card";
import Header from "@/components/ui/header";
import Loader from "@/components/ui/loader";
import { Product } from "@/types/data";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_PRODUCTS = gql`
    query GetProducts($id: ID!) {
        category(id: $id) {
            name
            products {
                name
                image
                location
                resale_price
                original_price
                purchase_date
                description
                condition
                seller {
                    name
                    image
                    isVerify
                }
                createdAt
                isBooked
            }
        }
    }
`;

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
