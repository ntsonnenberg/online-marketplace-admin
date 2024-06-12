import { deleteCategory, getCategory } from "@/actions/categories";
import DeleteResource from "@/components/DeleteResource";

interface Props {
  params: { id: string };
}

export default async function DeleteCategoryPage({ params }: Props) {
  const category = await getCategory(params.id);

  const handleCategoryDelete = async () => {
    "use server";
    await deleteCategory(params.id);
  };

  return (
    <div>
      <h1 className="text-center">
        Are you sure you want to delete Category {category?.name}
      </h1>
      <DeleteResource onDelete={handleCategoryDelete} to="/categories" />
    </div>
  );
}
