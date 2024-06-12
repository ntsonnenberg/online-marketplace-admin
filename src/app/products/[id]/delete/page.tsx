import { deleteProduct, getProduct } from "@/actions/products";
import DeleteResource from "@/components/DeleteResource";

interface Props {
  params: { id: string };
}

export default async function DeleteProductPage({ params }: Props) {
  const product = await getProduct(params.id);

  const handleProductDelete = async () => {
    "use server";
    await deleteProduct(params.id);
  };

  return (
    <div>
      <h1 className="text-center">
        Are you sure you want to delete Product {product?.title}?
      </h1>
      <DeleteResource onDelete={handleProductDelete} to="/products" />
    </div>
  );
}
