import { getCategories } from "@/actions/categories";
import CategoryView from "@/components/CategoryView";
import Link from "next/link";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <div className="flex justify-between">
        <h1>Categories</h1>
        <Link
          href={`/categories/new`}
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
          Add Category
        </Link>
      </div>
      <CategoryView categories={categories} />
    </div>
  );
}
