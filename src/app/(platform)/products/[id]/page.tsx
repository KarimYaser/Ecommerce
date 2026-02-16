import ProductDetailsScreen from "@/features/Products/screens/product-details.screen";

type ProductDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetails({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;
  return (
    <>
      <ProductDetailsScreen productId={id} />
    </>
  );
}
