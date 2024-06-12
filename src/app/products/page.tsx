import Link from "next/link";
import { getProducts } from "@/actions/products";
import ProductView from "@/components/ProductView";
import { getCategory } from "@/actions/categories";

export default async function ProductsPage() {
  let products = await getProducts();

  const productsWithCategory = await Promise.all(
    products.map(async (product) => {
      if (product.category) {
        const category = await getCategory(product.category);
        return { ...product, category: category ? category.name : null };
      }
      return product;
    })
  );

  return (
    <div>
      <div className="flex justify-between">
        <h1>Products</h1>
        <Link
          href={`/products/new`}
          className="btn-primary-filled p-2 flex gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
          Add Product
        </Link>
      </div>
      <ProductView products={productsWithCategory} />
    </div>
  );
}
