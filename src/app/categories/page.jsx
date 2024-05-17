import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/config";

export default async function CategoriesPage() {
  const session = await getServerSession(authConfig);

  return <div>Categories Page</div>;
}
