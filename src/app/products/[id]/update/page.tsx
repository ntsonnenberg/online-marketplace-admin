import ProductForm from "@/components/ProductForm";
import { getProduct } from "@/actions/products";
import { getCategories } from "@/actions/categories";

interface Props {
  params: { id: string };
}

export default async function UpdateProductPage({ params }: Props) {
  const product = await getProduct(params.id);
  const categories = await getCategories();

  return (
    <div>
      <h1>Edit Product</h1>
      {product && (
        <ProductForm product={product} categoryOptions={categories} />
      )}
    </div>
  );
}
