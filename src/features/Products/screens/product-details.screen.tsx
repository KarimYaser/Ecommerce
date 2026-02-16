import ProductInfo from "../Components/ProductDetails/ProductInfo";
import ProductGallery from "../Components/ProductDetails/ProductGallery";
import { getProductById } from "../Server/products.action";
import ProductFeatures from "../Components/ProductDetails/ProductFeatures";

export default async function ProductDetailsScreen({
  productId,
}: {
  productId: string;
}) {
  const response = await getProductById(productId);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Product Gallery */}
        <div className="md:col-span-4 self-start">
          <ProductGallery product={response.data} />
        </div>

        {/* Right: Product Info */}
        <div className="md:col-span-8">
          <ProductInfo product={response.data} />
        </div>
      </div>
      <ProductFeatures />
    </div>
  );
}
