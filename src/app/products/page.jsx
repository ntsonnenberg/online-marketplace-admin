import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/config";
import Button from "@/components/Button";

export default async function ProductsPage() {
  const session = await getServerSession(authConfig);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Products</h1>
        <Button color="primary" theme="filled" className="flex gap-2">
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
        </Button>
      </div>
    </div>
  );
}
